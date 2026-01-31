/**
 * Retro theme matching the DaisyUI "retro" palette.
 *
 * DaisyUI retro reference:
 *   primary: #ef9995   secondary: #a4cbb4   accent: #ebdc99
 *   neutral: #7d7259   base-100: #e4d8b4    base-200: #d2c59a
 *   base-300: #c6b88a  base-content: #282425
 */

export const colors = {
  // Primary palette — DaisyUI retro values
  primary: '#ef9995', // soft pink/salmon
  primaryContent: '#782621', // dark maroon on primary
  secondary: '#a4cbb4', // soft mint green
  secondaryContent: '#2d5f3f', // dark green on secondary
  accent: '#ebdc99', // warm golden yellow
  accentContent: '#6b4f23', // dark amber on accent

  // Neutrals — mapped from DaisyUI base / neutral
  bg: '#e4d8b4', // base-100: warm cream
  bgAlt: '#d2c59a', // base-200: slightly darker
  card: '#efdfbf', // between base-100 and white, card surface
  surface: '#f5edd8', // lightest surface
  text: '#282425', // base-content: dark brown
  textMuted: '#7d7259', // neutral: warm gray
  textLight: '#a09682', // lighter warm gray

  // Semantic
  border: '#c6b88a', // base-300
  borderStrong: '#b0a478', // darker than base-300
  success: '#16a34a', // DaisyUI success
  error: '#dc2626', // DaisyUI error
  warning: '#d97706', // DaisyUI warning
  info: '#2563eb', // DaisyUI info

  // Fretboard specific
  fretboard: '#c6b88a',
  fretWire: '#7d7259',
  string: '#504030',
  fingerDot: '#282425',
  fingerDotText: '#f5edd8',
  openString: '#16a34a',
  mutedString: '#dc2626',
  nut: '#282425',

  // Scale degree colors (Tailwind *-300 equivalents)
  degree1: '#fca5a5', // red-300
  degree2: '#fdba74', // orange-300
  degree3: '#fde047', // yellow-300
  degree4: '#93c5fd', // blue-300
  degree5: '#86efac', // green-300
  degree6: '#f0abfc', // fuchsia-300
  degree7: '#d4d4d4', // neutral-300
} as const;

export const fonts = {
  mono: 'monospace',
  body: 'System',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 4,
  md: 8,
  lg: 16,
  full: 9999,
} as const;

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 4,
  },
} as const;
