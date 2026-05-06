import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FaceShapeGuide from './components/FaceShapeGuide'

export function mountFaceShapeGuide(host: HTMLElement | null) {
  if (!host) return
  createRoot(host).render(
    <StrictMode>
      <FaceShapeGuide />
    </StrictMode>,
  )
}
