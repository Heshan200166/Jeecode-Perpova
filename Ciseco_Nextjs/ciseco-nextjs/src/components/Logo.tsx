import { Link } from '@/components/Link'
import React from 'react'

export interface LogoProps extends React.ComponentPropsWithoutRef<'svg'> {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className = 'shrink-0', ...props }) => {
  return (
    <Link href="/" className={`flex items-center gap-1 text-neutral-950 dark:text-neutral-50 ${className}`}>
      <span style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1, color: '#FF6B9D' }}>Jee</span>
      <span style={{ fontSize: '1.75rem', fontWeight: 400, fontStyle: 'italic', fontFamily: 'Georgia, "Times New Roman", serif', color: '#FF6B9D', letterSpacing: '0.01em', lineHeight: 1 }}>Code</span>
    </Link>
  )
}

export default Logo
