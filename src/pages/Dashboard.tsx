import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, User, Bot, FileText, ShieldCheck,
  Bell, ChevronRight, ExternalLink, RefreshCw, Clock,
  CheckCircle2, XCircle, AlertCircle,
} from 'lucide-react'
import ScoreGauge from '../components/ScoreGauge'
import VerificationTierBadge from '../components/VerificationTierBadge'
import FactorBar from '../components/FactorBar'
import AgentCard from '../components/AgentCard'
import { mockIndividualProfile, FACTOR_META } from '../data/mock-profiles'
import type { FactorScores } from '../data/mock-profiles'

const NAV_ITEMS = [
  { label: 'Dashboard',     icon: LayoutDashboard, path: '/dashboard' },
  { label: 'My Profile',    icon: User,             path: '/dashboard/profile' },
  { label: 'Agent Stack',   icon: Bot,              path: '/dashboard/agents' },
  { label: 'Agreements',    icon: FileText,         path: '/dashboard/agreements' },
  { label: 'Verifications', icon: ShieldCheck,      path: '/dashboard/verifications' },
]

const STATUS_ICON: Record<string, JSX.Element> = {
  verified:    <CheckCircle2 size={16} color="#1A5C38" />,
  pending:     <RefreshCw   size={16} color="#E67E22" className="animate-spin-pending" />,
  not_started: <AlertCircle size={16} color="#8C96A8" />,
  failed:      <XCircle     size={16} color="#C0392B" />,
}

const STATUS_LABEL: Record<string, string> = {
  verified:    'Verified',
  pending:     'Pending',
  not_started: 'Not Started',
  failed:      'Failed',
}

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('/dashboard')
  const nav = useNavigate()
  const profile = mockIndividualProfile

  const factorKeys = Object.keys(FACTOR_META) as (keyof FactorScores)[]

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* SIDEBAR */}
      <aside style={{
        width: 260, flexShrink: 0,
        background: '#0A1F44',
        display: 'flex', flexDirection: 'column',
        height: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 50,
      }}>
        {/* logo */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => nav('/')}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
          >
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>Human Stack AI</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 2 }}>Individual Dashboard</div>
          </button>
        </div>

        {/* nav */}
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
          {NAV_ITEMS.map(item => {
            const active = activeNav === item.path
            return (
              <button
                key={item.path}
                onClick={() => setActiveNav(item.path)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: active ? '#fff' : 'rgba(255,255,255,0.55)',
                  fontSize: 14, fontWeight: active ? 600 : 400,
                  marginBottom: 2, textAlign: 'left',
                  transition: 'background 0.15s, color 0.15s',
                }}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* user footer */}
        <div style={{
          padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 999, background: '#1A5C38',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0,
          }}>
            {profile.full_name.split(' ').map(w => w[0]).join('')}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {profile.full_name}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>{profile.professional_title}</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ marginLeft: 260, flex: 1, overflowY: 'auto', background: '#F4F6F9' }}>
        {/* TOP BAR */}
        <div style={{
          background: '#fff', height: 56, display: 'flex', alignItems: 'center',
          padding: '0 24px', borderBottom: '1px solid #DDE3EC',
          position: 'sticky', top: 0, zIndex: 40,
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, color: '#8C96A8', fontSize: 13 }}>
            <span>Dashboard</span>
            <ChevronRight size={14} />
            <span style={{ color: '#3D4A5C', fontWeight: 500 }}>Overview</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8C96A8', padding: 4 }}>
              <Bell size={18} />
            </button>
            <div style={{
              width: 32, height: 32, borderRadius: 999, background: '#0A1F44',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#C8A84B', fontWeight: 700, fontSize: 12,
            }}>
              {profile.full_name.split(' ').map(w => w[0]).join('')}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>

          {/* SECTION 1: SCORE HERO */}
          <div style={{
            background: 'linear-gradient(135deg, #0A1F44 0%, #0d2a5c 100%)',
            borderRadius: 16, padding: '32px 40px', marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 48,
          }}>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <ScoreGauge score={profile.composite_score} size={160} tierColor="#1A5C38" animate />
              <div style={{ marginTop: 14 }}>
                <VerificationTierBadge tier={profile.verification_tier} size="md" animate />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, margin: '0 0 8px', lineHeight: 1.2 }}>
                {profile.full_name}
              </h1>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, marginBottom: 4 }}>
                {profile.professional_title} · {profile.location}
              </div>
              <div style={{ color: '#C8A84B', fontSize: 14, fontWeight: 600, marginBottom: 20 }}>
                Top {profile.industry_percentile}% of {profile.industry} profiles
              </div>
              <div style={{ display: 'flex', gap: 32 }}>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Experience</div>
                  <div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>{profile.years_experience} years</div>
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Chain Record</div>
                  <div style={{ color: '#C8A84B', fontSize: 13, fontFamily: 'JetBrains Mono, monospace' }}>{profile.blockchain_record_id}</div>
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Last Updated</div>
                  <div style={{ color: '#fff', fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Clock size={12} />
                    {new Date(profile.updated_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ flexShrink: 0 }}>
              <button style={{
                background: '#1A5C38', color: '#fff', border: 'none',
                borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10,
              }}>
                <ExternalLink size={14} /> Share Profile
              </button>
              <button style={{
                background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>
                Edit Profile
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>

            {/* SECTION 2: FACTOR SCORE BREAKDOWN */}
            <div style={{ background: '#fff', borderRadius: 16, padding: '24px', border: '1px solid #DDE3EC' }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0A1F44', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                Score Breakdown
              </h2>
              {factorKeys.map((key, i) => {
                const ver = profile.verification_records.find(v => v.factor === key)
                return (
                  <FactorBar
                    key={key}
                    factor={key}
                    score={profile.factor_scores[key]}
                    verStatus={ver?.status}
                    delay={i * 60}
                    showLabel
                  />
                )
              })}
            </div>

            {/* SECTION 3: AGENT STACK PREVIEW */}
            <div style={{ background: '#fff', borderRadius: 16, padding: '24px', border: '1px solid #DDE3EC', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0A1F44', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Bot size={18} /> Your AI Team
                </h2>
                <button style={{
                  background: 'none', border: 'none', color: '#2E6DA4', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  Manage Stack <ChevronRight size={14} />
                </button>
              </div>
              {profile.agent_stack.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 32 }}>
                  <Bot size={40} color="#DDE3EC" style={{ marginBottom: 12 }} />
                  <div style={{ color: '#8C96A8', fontSize: 14, lineHeight: 1.6 }}>
                    You have not declared your AI team yet.<br />Employers want to see this.
                  </div>
                  <button style={{
                    marginTop: 16, background: '#0A1F44', color: '#fff', border: 'none',
                    borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}>Declare Your Agents</button>
                </div>
              ) : (
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  {profile.agent_stack.map(agent => (
                    <AgentCard key={agent.id} agent={agent} viewMode="full" />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SECTION 4: VERIFICATION STATUS TABLE */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '24px', border: '1px solid #DDE3EC' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0A1F44', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ShieldCheck size={18} /> Verification Status
              </h2>
              <div style={{ fontSize: 13, color: '#8C96A8' }}>
                {profile.verification_records.filter(r => r.status === 'verified').length} of {profile.verification_records.length} factors verified
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #DDE3EC' }}>
                  {['Factor', 'Status', 'Verified By', 'Date', 'Action'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, fontWeight: 600, color: '#8C96A8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {profile.verification_records.map((rec, i) => (
                  <tr key={rec.factor} style={{ borderBottom: i < profile.verification_records.length - 1 ? '1px solid #EBF0F7' : 'none' }}>
                    <td style={{ padding: '12px 12px', fontSize: 14, color: '#3D4A5C', fontWeight: 500 }}>
                      {rec.display_label}
                    </td>
                    <td style={{ padding: '12px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {STATUS_ICON[rec.status]}
                        <span style={{ fontSize: 13, color: rec.status === 'verified' ? '#1A5C38' : rec.status === 'failed' ? '#C0392B' : rec.status === 'pending' ? '#E67E22' : '#8C96A8', fontWeight: 500 }}>
                          {STATUS_LABEL[rec.status]}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 12px', fontSize: 13, color: '#3D4A5C' }}>
                      {rec.verified_by || '—'}
                    </td>
                    <td style={{ padding: '12px 12px', fontSize: 13, color: '#8C96A8' }}>
                      {rec.verified_date ? new Date(rec.verified_date).toLocaleDateString() : '—'}
                    </td>
                    <td style={{ padding: '12px 12px' }}>
                      {rec.status === 'not_started' && (
                        <button style={{
                          background: '#0A1F44', color: '#fff', border: 'none',
                          borderRadius: 6, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        }}>
                          Request Verification
                        </button>
                      )}
                      {rec.status === 'verified' && (
                        <span style={{ fontSize: 12, color: '#8C96A8' }}>✓ Complete</span>
                      )}
                      {rec.status === 'pending' && (
                        <span style={{ fontSize: 12, color: '#E67E22', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <RefreshCw size={12} className="animate-spin-pending" /> In progress
                        </span>
                      )}
                      {rec.status === 'failed' && (
                        <button style={{
                          background: '#FDECEA', color: '#C0392B', border: '1px solid #C0392B',
                          borderRadius: 6, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        }}>
                          Re-verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  )
}
