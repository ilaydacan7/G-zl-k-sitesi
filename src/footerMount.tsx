import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Footer, type FooterNewsletterIds } from './Footer'

export function mountSiteFooter(host: HTMLElement | null, newsletterIds: FooterNewsletterIds) {
  if (!host) return
  createRoot(host).render(
    <StrictMode>
      <Footer newsletterIds={newsletterIds} />
    </StrictMode>,
  )
}
