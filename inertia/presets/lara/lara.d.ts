// Assuming `lara` exports a function named `createLara` and a constant named `LARA_CONSTANT`
declare module '@/presets/lara' {
  export function createLara(options: any): any
  export const LARA_CONSTANT: string
}
