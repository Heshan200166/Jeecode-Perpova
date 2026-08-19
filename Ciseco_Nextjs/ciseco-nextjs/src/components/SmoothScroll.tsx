'use client'

import { ReactLenis } from 'lenis/react'
import { FC, ReactNode } from 'react'

interface SmoothScrollProps {
  children: ReactNode
}

const SmoothScroll: FC<SmoothScrollProps> = ({ children }) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}

export default SmoothScroll
