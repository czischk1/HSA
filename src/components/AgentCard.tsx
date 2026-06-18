import type { AgentDeclaration } from '../data/mock-profiles'

interface Props {
  agent: AgentDeclaration
  viewMode?: 'full' | 'compact'
}

const TYPE_COLORS: Record<string, string> = {
  productivity:   '#2E6DA4',
  data_analysis:  '#1A5C38',
  communication:  '#E67E22',
  research:       '#0A1F44',
  code:           '#C8A84B',
  other:          '#8C96A8',
}

const GOV_LABELS: Record<string, string> = {
  employer_visible: 'Employer Visible',
  private: 'Private',
  negotiated: 'Negotiated',
}

export default function AgentCard({ agent, viewMode = 'full' }: Props) {
  const typeColor = TYPE_COLORS[agent.agent_type] || '#8C96A8'
  const initials = agent.agent_name.slice(0, 2).toUpperCase()

  if (viewMode === 'compact') {
    return (
      <div style={{
        background: '#F4F6F9',
        border: '1px solid #DDE3EC',
        borderRadius: 8,
        padding: '12px 14px',
        minWidth: 160,
        maxWidth: 200,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: typeColor, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700,
          }}>{initials}</div>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#0A1F44' }}>{agent.agent_name}</span>
        </div>
        <span style={{
          fontSize: 10, fontWeight: 700, background: typeColor, color: '#fff',
          borderRadius: 999, padding: '2px 8px', textTransform: 'uppercase', letterSpacing: '0.05em',
        }}>{agent.agent_type.replace('_', ' ')}</span>
      </div>
    )
  }

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #DDE3EC',
      borderRadius: 12,
      padding: '16px',
      marginBottom: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: typeColor, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, flexShrink: 0,
        }}>{initials}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#0A1F44' }}>{agent.agent_name}</span>
            <span style={{
              fontSize: 10, fontWeight: 700, background: typeColor, color: '#fff',
              borderRadius: 999, padding: '2px 8px', textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>{agent.agent_type.replace('_', ' ')}</span>
            <span style={{
              fontSize: 10, fontWeight: 600, background: '#EBF0F7', color: '#8C96A8',
              borderRadius: 999, padding: '2px 8px',
            }}>{GOV_LABELS[agent.governance]}</span>
          </div>
          <p style={{ fontSize: 13, color: '#3D4A5C', margin: 0, lineHeight: 1.5 }}>{agent.description}</p>
        </div>
      </div>
      {agent.tools.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingLeft: 52 }}>
          {agent.tools.map(t => (
            <span key={t} style={{
              fontSize: 11, background: '#F4F6F9', color: '#3D4A5C',
              border: '1px solid #DDE3EC', borderRadius: 4, padding: '2px 7px',
            }}>{t}</span>
          ))}
        </div>
      )}
      {agent.manifest_hash && (
        <div style={{ paddingLeft: 52, marginTop: 8 }}>
          <span style={{ fontSize: 11, color: '#8C96A8', fontFamily: 'JetBrains Mono, monospace' }}>
            ⛓ {agent.manifest_hash}
          </span>
        </div>
      )}
    </div>
  )
}
