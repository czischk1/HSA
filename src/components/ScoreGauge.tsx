import { useEffect, useState } from 'react'

interface Props {
  score: number
  size?: number
  animate?: boolean
  tierColor?: string
}

export default function ScoreGauge({ score, size = 160, animate = true, tierColor = '#1A5C38' }: Props) {
  const [displayed, setDisplayed] = useState(animate ? 0 : score)

  useEffect(() => {
    if (!animate) { setDisplayed(score); return }
    const start = performance.now()
    const duration = 1200
    const raf = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setDisplayed(Math.round(ease * score))
      if (t < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [score, animate])

  const cx = size / 2
  const cy = size / 2
  const r = (size - 16) / 2
  const circ = 2 * Math.PI * r
  const pct = displayed / 100
  const dash = pct * circ
  const gap = circ - dash

  return (
    <div style={{ width: size, height: size, position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#DDE3EC" strokeWidth={10} />
        {/* Progress */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={tierColor}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${gap}`}
          style={{ transition: 'stroke-dasharray 0.05s linear' }}
        />
      </svg>
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div style={{ fontSize: size * 0.4, fontWeight: 700, color: '#0A1F44', lineHeight: 1, fontFamily: 'Inter, system-ui' }}>
          {displayed}
        </div>
        <div style={{ fontSize: size * 0.1, color: '#8C96A8', fontWeight: 500, marginTop: 2 }}>/ 100</div>
      </div>
    </div>
  )
}
