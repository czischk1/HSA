import { useNavigate } from 'react-router-dom'
import { Shield, FileText, Users, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react'
import ScoreGauge from '../components/ScoreGauge'
import VerificationTierBadge from '../components/VerificationTierBadge'

export default function LandingPage() {
  const nav = useNavigate()

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C' }}>
      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 64, background: '#0A1F44',
        display: 'flex', alignItems: 'center',
        padding: '0 24px',
        boxShadow: '0 2px 12px rgba(10,31,68,0.3)',
      }}>
        <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em', flex: 1 }}>
            Human Stack AI
          </span>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {['How It Works', 'For Employers', 'Pricing'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}
                 onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
              >{l}</a>
            ))}
            <button style={{
              border: '1px solid rgba(255,255,255,0.5)', background: 'transparent',
              color: '#fff', borderRadius: 8, padding: '7px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>Sign In</button>
            <button
              onClick={() => nav('/dashboard')}
              style={{
                background: '#1A5C38', color: '#fff', border: 'none',
                borderRadius: 8, padding: '8px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}
            >Get Verified</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 60% 40%, #0d2a5c 0%, #0A1F44 55%, #071530 100%)',
        display: 'flex', alignItems: 'center',
        paddingTop: 64,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* dot grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.12,
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', gap: 64, alignItems: 'center' }}>
          {/* left */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 20 }}>
              <VerificationTierBadge tier="class_a" size="md" />
            </div>
            <h1 style={{
              color: '#fff', fontSize: 56, fontWeight: 700, lineHeight: 1.1,
              margin: '0 0 20px', letterSpacing: '-0.02em',
            }}>
              Your Career.<br />Your Team.<br />
              <span style={{ color: '#C8A84B' }}>Verified.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, lineHeight: 1.6, maxWidth: 480, margin: '0 0 36px' }}>
              The professional identity layer built for the age of AI — behavioral scores, verified credentials, fraud detection, and your declared AI team. One portable score.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button
                onClick={() => nav('/dashboard')}
                style={{
                  background: '#1A5C38', color: '#fff', border: 'none',
                  borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                Create Your Profile <ArrowRight size={18} />
              </button>
              <a href="#how-it-works" style={{
                color: 'rgba(255,255,255,0.8)', fontSize: 15, textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 6, padding: '14px 0',
              }}>
                See How It Works <ChevronRight size={16} />
              </a>
            </div>
          </div>
          {/* right — hero visual */}
          <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 24,
              padding: '36px 40px',
              textAlign: 'center',
            }}>
              <ScoreGauge score={84} size={200} tierColor="#1A5C38" />
              <div style={{ marginTop: 16 }}>
                <VerificationTierBadge tier="class_b" size="lg" animate />
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 10 }}>
                Top 12% of Technology profiles
              </div>
            </div>
            {/* mini factor bars */}
            <div style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 16, padding: '20px 24px', width: '100%',
            }}>
              {[
                { label: 'Behavioral',   val: 91, color: '#2E6DA4' },
                { label: 'Credentials', val: 78, color: '#1A5C38' },
                { label: 'Employment',  val: 88, color: '#1A5C38' },
                { label: 'AI Interview',val: 82, color: '#2E6DA4' },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{f.label}</span>
                    <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>{f.val}</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 999 }}>
                    <div style={{ height: '100%', width: `${f.val}%`, background: f.color, borderRadius: 999 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM STATEMENT */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0A1F44', textAlign: 'center', marginBottom: 16 }}>
            Hiring is broken. We fixed it.
          </h2>
          <p style={{ textAlign: 'center', color: '#8C96A8', fontSize: 16, maxWidth: 560, margin: '0 auto 56px' }}>
            Three systemic failures at the heart of modern recruitment.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              {
                icon: <Shield size={32} color="#C0392B" />,
                headline: '60% of candidates are some form of fraud',
                body: 'Identity theft, credential falsification, bait-and-switch contractors. Current screening tools miss the majority of it.',
                accent: '#C0392B',
              },
              {
                icon: <FileText size={32} color="#E67E22" />,
                headline: 'The resume is 200 years old',
                body: 'Self-reported. Unverifiable. Cannot capture what a professional actually does with AI, or how they perform under pressure.',
                accent: '#E67E22',
              },
              {
                icon: <Users size={32} color="#2E6DA4" />,
                headline: 'The AI team is invisible to employers',
                body: 'Every professional already runs AI agents. No employer systems account for this. No governance exists. That changes now.',
                accent: '#2E6DA4',
              },
            ].map(col => (
              <div key={col.headline} style={{
                background: '#F4F6F9', borderRadius: 16, padding: '32px',
                borderTop: `4px solid ${col.accent}`,
              }}>
                <div style={{ marginBottom: 16 }}>{col.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0A1F44', marginBottom: 12 }}>{col.headline}</h3>
                <p style={{ fontSize: 15, color: '#3D4A5C', lineHeight: 1.6, margin: 0 }}>{col.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ background: '#F4F6F9', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0A1F44', textAlign: 'center', marginBottom: 8 }}>
            How It Works
          </h2>
          <p style={{ textAlign: 'center', color: '#8C96A8', fontSize: 16, marginBottom: 56 }}>Four steps to your verified professional identity.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { num: '01', title: 'Declare',  body: 'Enter your employment history, education, certifications, and the AI agents you use professionally.' },
              { num: '02', title: 'Assess',   body: 'Complete behavioral and cognitive assessments. Add your AI interview scored for clarity, reasoning, and domain depth.' },
              { num: '03', title: 'Verify',   body: 'Our agents verify credentials at the source — employers, registrars, issuing bodies. Every event blockchain-logged.' },
              { num: '04', title: 'Score',    body: 'Receive your Human Stack AI score. Declare your AI team. Earn your tier. Share with any employer, worldwide.' },
            ].map((step, i) => (
              <div key={step.num} style={{ position: 'relative' }}>
                {i < 3 && (
                  <div style={{
                    position: 'absolute', top: 20, right: -12, zIndex: 1,
                    color: '#DDE3EC', fontSize: 20,
                  }}>→</div>
                )}
                <div style={{
                  background: '#fff', borderRadius: 16, padding: '28px 24px',
                  border: '1px solid #DDE3EC', height: '100%',
                }}>
                  <div style={{
                    width: 40, height: 40, background: '#0A1F44', borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#C8A84B', fontWeight: 700, fontSize: 14, marginBottom: 16,
                  }}>{step.num}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0A1F44', marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: '#3D4A5C', lineHeight: 1.6, margin: 0 }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR EMPLOYERS */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1A5C38', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              For Employers
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0A1F44', marginBottom: 20, lineHeight: 1.2 }}>
              Hire the human and their AI team.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
              {[
                'Verified scores, not self-reported claims',
                'Fraud cleared before the first interview',
                'See every candidate\'s declared AI stack',
                'Predictive role-fit scoring, not just keyword matching',
                'Blockchain-verified credential chain of custody',
                'Data Boundary Agreements govern AI agent access',
              ].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle size={18} color="#1A5C38" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 15, color: '#3D4A5C' }}>{f}</span>
                </div>
              ))}
            </div>
            <button style={{
              background: '#1A5C38', color: '#fff', border: 'none',
              borderRadius: 8, padding: '13px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}>
              Hire Your First Human Stack
            </button>
          </div>
          {/* mock employer card */}
          <div style={{ background: '#F4F6F9', borderRadius: 20, padding: 32, border: '1px solid #DDE3EC' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#8C96A8', marginBottom: 20 }}>CANDIDATE SEARCH</div>
            {[
              { name: 'Sarah K.', title: 'VP of Engineering', score: 92, tier: 'class_a' as const },
              { name: 'Marcus C.', title: 'Senior PM', score: 84, tier: 'class_b' as const },
              { name: 'Priya S.', title: 'Data Scientist', score: 77, tier: 'class_b' as const },
            ].map(c => (
              <div key={c.name} style={{
                background: '#fff', borderRadius: 12, padding: '16px 18px', marginBottom: 12,
                border: '1px solid #DDE3EC', display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 999, background: '#0A1F44',
                  color: '#C8A84B', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 15, flexShrink: 0,
                }}>{c.name.split(' ').map(w => w[0]).join('')}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#0A1F44', fontSize: 14 }}>{c.name}</div>
                  <div style={{ color: '#8C96A8', fontSize: 12 }}>{c.title}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#0A1F44', lineHeight: 1 }}>{c.score}</div>
                  <VerificationTierBadge tier={c.tier} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0A1F44', padding: '48px 24px 24px', color: 'rgba(255,255,255,0.6)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Human Stack AI</div>
              <div style={{ fontSize: 13, lineHeight: 1.6 }}>Built by Fulcrum AI Labs</div>
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Platform</div>
              {['Product', 'For Employers', 'Pricing', 'Blog', 'Docs'].map(l => (
                <div key={l}><a href="#" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, textDecoration: 'none', display: 'block', marginBottom: 8 }}>{l}</a></div>
              ))}
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Contact</div>
              <div style={{ fontSize: 13 }}>humanstackai.com</div>
              <div style={{ fontSize: 13 }}>jeff@humanstackai.com</div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20, fontSize: 12, textAlign: 'center' }}>
            Human Stack AI is a Fulcrum AI Labs platform. Talladym algorithm concept by Dan Reynolds / Talon Professional Services.
          </div>
        </div>
      </footer>
    </div>
  )
}
