interface Props {
  tier: 'class_a' | 'class_b' | 'class_c' | 'pending' | 'failed'
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
}

const TIER_CONFIG = {
  class_a: {
    label: 'PLATINUM VERIFIED',
    bg: '#0A1F44',
    color: '#C8A84B',
    border: '2px solid #C8A84B',
  },
  class_b: {
    label: 'VERIFIED',
    bg: '#1A5C38',
    color: '#FFFFFF',
    border: 'none',
  },
  class_c: {
    label: 'DECLARED',
    bg: '#E67E22',
    color: '#FFFFFF',
    border: 'none',
  },
  pending: {
    label: 'PENDING',
    bg: '#F4F6F9',
    color: '#8C96A8',
    border: '1px solid #DDE3EC',
  },
  failed: {
    label: 'FAILED',
    bg: '#FDECEA',
    color: '#C0392B',
    border: '1px solid #C0392B',
  },
}

const SIZE = {
  sm: { fontSize: '10px', padding: '2px 8px' },
  md: { fontSize: '11px', padding: '4px 12px' },
  lg: { fontSize: '12px', padding: '6px 16px' },
}

export default function VerificationTierBadge({ tier, size = 'md', animate = false }: Props) {
  const cfg = TIER_CONFIG[tier]
  const sz = SIZE[size]
  return (
    <span
      className={animate ? 'animate-badge-drop inline-block' : 'inline-block'}
      style={{
        background: cfg.bg,
        color: cfg.color,
        border: cfg.border,
        borderRadius: '999px',
        fontWeight: 700,
        letterSpacing: '0.06em',
        fontSize: sz.fontSize,
        padding: sz.padding,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {cfg.label}
    </span>
  )
}
