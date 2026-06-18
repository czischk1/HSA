import { useEffect, useRef, useState } from 'react'
import { FACTOR_META } from '../data/mock-profiles'
import type { FactorScores } from '../data/mock-profiles'
import VerificationTierBadge from './VerificationTierBadge'

interface VerStatus {
  status: 'verified' | 'pending' | 'not_started' | 'failed'
}

interface Props {
  factor: keyof FactorScores
  score: number
  verStatus?: VerStatus['status']
  delay?: number
  showLabel?: boolean
}

const STATUS_BADGE: Record<string, 'class_b' | 'class_c' | 'pending' | 'failed'> = {
  verified: 'class_b',
  pending: 'pending',
  not_started: 'class_c',
  failed: 'failed',
}

export default function FactorBar({ factor, score, verStatus, delay = 0, showLabel = true }: Props) {
  const meta = FACTOR_META[factor]
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), 100 + delay)
    return () => clearTimeout(timer)
  }, [score, delay])

  const fraudColor = factor === 'fraud_score' && verStatus === 'failed' ? '#C0392B' : meta.color

  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        {showLabel && (
          <span style={{ fontSize: 14, color: '#3D4A5C', fontWeight: 500 }}>{meta.label}</span>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
          {verStatus && (
            <VerificationTierBadge tier={STATUS_BADGE[verStatus] || 'pending'} size="sm" />
          )}
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0A1F44', minWidth: 28, textAlign: 'right' }}>{score}</span>
        </div>
      </div>
      <div style={{ height: 8, background: '#EBF0F7', borderRadius: 999, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${width}%`,
            background: fraudColor,
            borderRadius: 999,
            transition: `width 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}
