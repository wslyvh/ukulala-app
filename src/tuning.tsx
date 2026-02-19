import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Tuning } from './storage';
import { loadTuning, saveTuning } from './storage';
import { getAllVoicings, applyVoicing } from './data/chords';
import type { ChordData } from './data/chords';
import { standardChords } from './data/standard';
import { baritoneChords } from './data/baritone';

type TuningContextValue = {
  tuning: Tuning;
  setTuning: (t: Tuning) => void;
  isLoaded: boolean;
  hasChosen: boolean;
};

const TuningContext = createContext<TuningContextValue>({
  tuning: 'standard',
  setTuning: () => {},
  isLoaded: false,
  hasChosen: false,
});

export function TuningProvider({ children }: { children: React.ReactNode }) {
  const [tuning, setTuningState] = useState<Tuning>('standard');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    loadTuning().then((stored) => {
      if (stored) {
        setTuningState(stored);
        setHasChosen(true);
      }
      setIsLoaded(true);
    });
  }, []);

  const setTuning = useCallback((t: Tuning) => {
    setTuningState(t);
    setHasChosen(true);
    saveTuning(t);
  }, []);

  const value = useMemo(() => ({ tuning, setTuning, isLoaded, hasChosen }), [tuning, setTuning, isLoaded, hasChosen]);

  return <TuningContext.Provider value={value}>{children}</TuningContext.Provider>;
}

export function useTuning() {
  return useContext(TuningContext);
}

export function useChordLookup() {
  const { tuning } = useTuning();
  return useMemo(() => {
    const dataset = tuning === 'baritone' ? baritoneChords : standardChords;
    return {
      chords: dataset,
      findChord: (name: string): ChordData | undefined => dataset.find((c) => c.name === name),
      getAllVoicings,
      applyVoicing,
    };
  }, [tuning]);
}
