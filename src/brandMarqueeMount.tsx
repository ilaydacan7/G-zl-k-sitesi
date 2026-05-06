import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BrandMarquee from './components/BrandMarquee'

export function mountBrandMarquee(host: HTMLElement | null) {
  if (!host) return
  createRoot(host).render(
    <StrictMode>
      <BrandMarquee />
    </StrictMode>,
  )
}
