import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Modal, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ChordDiagram } from './ChordDiagram';
import type { ChordData } from '../data/chords';
import { colors, spacing, radii } from '../theme';

type Props = {
  chord: ChordData;
  width?: number;
  compact?: boolean;
  numeral?: string;
  degreeColor?: string;
};

export function ZoomableChordDiagram({ chord, width, compact, numeral, degreeColor }: Props) {
  const [visible, setVisible] = useState(false);
  const scale = useSharedValue(0);
  const { width: screenWidth } = useWindowDimensions();
  const zoomedWidth = Math.round(screenWidth * 0.6);

  const show = useCallback(() => {
    setVisible(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    scale.value = withTiming(1, { duration: 150, easing: Easing.out(Easing.quad) });
  }, [scale]);

  const hide = useCallback(() => {
    scale.value = withTiming(0, { duration: 100 }, (finished) => {
      if (finished) runOnJS(setVisible)(false);
    });
  }, [scale]);

  const longPress = Gesture.LongPress()
    .minDuration(300)
    .onStart(() => {
      runOnJS(show)();
    })
    .onEnd(() => {
      runOnJS(hide)();
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  return (
    <>
      <GestureDetector gesture={longPress}>
        <View>
          <ChordDiagram chord={chord} width={width} compact={compact} />
        </View>
      </GestureDetector>

      <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
        <Pressable style={styles.backdrop} onPress={hide}>
          <Animated.View style={[styles.zoomedContainer, animatedStyle]}>
            <ChordDiagram chord={chord} width={zoomedWidth} compact={false} />
            {degreeColor && (
              <View style={[styles.degreeBar, { backgroundColor: degreeColor }]} />
            )}
            {numeral && <Text style={styles.numeral}>{numeral}</Text>}
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomedContainer: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: 'center',
  },
  degreeBar: {
    height: 4,
    borderRadius: 2,
    alignSelf: 'stretch',
    marginTop: spacing.sm,
  },
  numeral: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textMuted,
    fontFamily: 'monospace',
    marginTop: spacing.sm,
  },
});
