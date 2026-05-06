export type BrandFontClass = 'serif' | 'script' | 'sans' | 'elegant'

export interface Brand {
  name: string
  fontClass: BrandFontClass
}

export const brands: Brand[] = [
  { name: 'Ray-Ban', fontClass: 'sans' },
  { name: 'Prada', fontClass: 'serif' },
  { name: 'Persol', fontClass: 'sans' },
  { name: 'Bottega Veneta', fontClass: 'elegant' },
  { name: 'Olivio & Co', fontClass: 'sans' },
  { name: 'Mess Frames', fontClass: 'sans' },
  { name: 'Miu Miu', fontClass: 'serif' },
  { name: 'Gast', fontClass: 'sans' },
  { name: 'Gucci', fontClass: 'serif' },
  { name: 'Saint Laurent', fontClass: 'elegant' },
  { name: 'Loewe', fontClass: 'serif' },
  { name: 'Prada Linea Rossa', fontClass: 'sans' },
  { name: 'Dolce & Gabbana', fontClass: 'script' },
  { name: 'Matsuda', fontClass: 'elegant' },
  { name: 'Burberry', fontClass: 'serif' },
  { name: 'Off-White', fontClass: 'sans' },
  { name: 'Izipizi', fontClass: 'sans' },
  { name: 'Roshambo Eyewear', fontClass: 'sans' },
  { name: 'Looklight', fontClass: 'sans' },
  { name: 'Babiators', fontClass: 'sans' },
  { name: 'Kietla', fontClass: 'sans' },
  { name: 'Tom Ford', fontClass: 'sans' },
  { name: 'Kuboraum', fontClass: 'sans' },
]
