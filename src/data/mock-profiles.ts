export interface FactorScores {
  behavioral_score: number
  credential_score: number
  employment_score: number
  fraud_score: number
  interview_score: number
  learning_score: number
  reference_score: number
  agent_score: number
}

export interface EmploymentRecord {
  id: string
  employer_name: string
  job_title: string
  start_date: string
  end_date: string | null
  is_current: boolean
  verified: boolean
  verified_by?: string
}

export interface EducationRecord {
  id: string
  institution: string
  degree_type: string
  field_of_study: string
  year_completed: number
  verified: boolean
}

export interface AgentDeclaration {
  id: string
  profile_id: string
  agent_name: string
  agent_type: 'productivity' | 'data_analysis' | 'communication' | 'research' | 'code' | 'other'
  description: string
  tools: string[]
  governance: 'employer_visible' | 'private' | 'negotiated'
  created_at: string
  manifest_hash?: string
}

export interface VerificationRecord {
  factor: keyof FactorScores
  display_label: string
  status: 'verified' | 'pending' | 'not_started' | 'failed'
  verified_by?: string
  verified_date?: string
}

export interface HumanStackProfile {
  id: string
  created_at: string
  updated_at: string
  user_id: string
  full_name: string
  professional_title: string
  linkedin_url: string
  location: string
  years_experience: number
  composite_score: number
  verification_tier: 'class_a' | 'class_b' | 'class_c' | 'pending'
  employment_history: EmploymentRecord[]
  education: EducationRecord[]
  factor_scores: FactorScores
  agent_stack: AgentDeclaration[]
  verification_records: VerificationRecord[]
  blockchain_record_id: string
  is_public: boolean
  industry: string
  industry_percentile: number
}

export const mockIndividualProfile: HumanStackProfile = {
  id: 'prof-001',
  created_at: '2025-09-12T10:00:00Z',
  updated_at: '2026-06-01T14:30:00Z',
  user_id: 'user-001',
  full_name: 'Marcus Chen',
  professional_title: 'Senior Product Manager',
  linkedin_url: 'https://linkedin.com/in/marcuschen',
  location: 'San Francisco, CA',
  years_experience: 12,
  composite_score: 84,
  verification_tier: 'class_b',
  industry: 'Technology',
  industry_percentile: 12,
  blockchain_record_id: '0x4a3f...b91c',
  is_public: true,
  factor_scores: {
    behavioral_score: 91,
    credential_score: 78,
    employment_score: 88,
    fraud_score: 100,
    interview_score: 82,
    learning_score: 70,
    reference_score: 75,
    agent_score: 75,
  },
  employment_history: [
    {
      id: 'emp-001',
      employer_name: 'Stripe',
      job_title: 'Senior Product Manager',
      start_date: '2022-03',
      end_date: null,
      is_current: true,
      verified: true,
      verified_by: 'Stripe HR',
    },
    {
      id: 'emp-002',
      employer_name: 'Airbnb',
      job_title: 'Product Manager',
      start_date: '2019-06',
      end_date: '2022-02',
      is_current: false,
      verified: true,
      verified_by: 'Airbnb HR',
    },
    {
      id: 'emp-003',
      employer_name: 'Salesforce',
      job_title: 'Associate Product Manager',
      start_date: '2017-01',
      end_date: '2019-05',
      is_current: false,
      verified: false,
    },
    {
      id: 'emp-004',
      employer_name: 'TechCorp Solutions',
      job_title: 'Product Analyst',
      start_date: '2014-06',
      end_date: '2016-12',
      is_current: false,
      verified: false,
    },
  ],
  education: [
    {
      id: 'edu-001',
      institution: 'UC Berkeley',
      degree_type: 'Bachelor of Science',
      field_of_study: 'Computer Science',
      year_completed: 2014,
      verified: true,
    },
    {
      id: 'edu-002',
      institution: 'Stanford GSB',
      degree_type: 'MBA',
      field_of_study: 'Business Administration',
      year_completed: 2019,
      verified: false,
    },
  ],
  agent_stack: [
    {
      id: 'agent-001',
      profile_id: 'prof-001',
      agent_name: 'StrategyGPT',
      agent_type: 'research',
      description: 'Conducts competitive research and synthesizes market intelligence into strategic briefs.',
      tools: ['Claude', 'Perplexity', 'Notion'],
      governance: 'employer_visible',
      created_at: '2026-01-10T09:00:00Z',
      manifest_hash: '0xf3a1...d42e',
    },
    {
      id: 'agent-002',
      profile_id: 'prof-001',
      agent_name: 'DataPulse',
      agent_type: 'data_analysis',
      description: 'Automated analytics pipeline — pulls Mixpanel/Amplitude data and generates weekly product health reports.',
      tools: ['Python', 'Mixpanel', 'Amplitude', 'Notion'],
      governance: 'employer_visible',
      created_at: '2026-02-05T11:00:00Z',
      manifest_hash: '0xc7b2...19fa',
    },
    {
      id: 'agent-003',
      profile_id: 'prof-001',
      agent_name: 'MeetingMind',
      agent_type: 'productivity',
      description: 'Joins calls, transcribes, extracts action items, and files summaries to Notion automatically.',
      tools: ['Fireflies.ai', 'Notion', 'Slack'],
      governance: 'negotiated',
      created_at: '2026-03-14T15:00:00Z',
    },
  ],
  verification_records: [
    { factor: 'behavioral_score',  display_label: 'Behavioral Assessment',  status: 'verified',     verified_by: 'Caliper Profile',          verified_date: '2026-04-10' },
    { factor: 'credential_score',  display_label: 'Credentials & Education', status: 'pending',      verified_by: 'National Student Clearinghouse' },
    { factor: 'employment_score',  display_label: 'Employment History',      status: 'verified',     verified_by: 'Talent Verify',             verified_date: '2026-04-12' },
    { factor: 'fraud_score',       display_label: 'Identity & Fraud Check',  status: 'verified',     verified_by: 'ROPES',                     verified_date: '2026-04-08' },
    { factor: 'interview_score',   display_label: 'AI Interview',            status: 'verified',     verified_by: 'Human Stack AI Engine',     verified_date: '2026-04-09' },
    { factor: 'learning_score',    display_label: 'Continuous Learning',     status: 'not_started' },
    { factor: 'reference_score',   display_label: 'Reference Quality',       status: 'pending',      verified_by: 'Reference Check Pro' },
    { factor: 'agent_score',       display_label: 'Agent Stack',             status: 'verified',     verified_by: 'Human Stack AI Engine',     verified_date: '2026-04-11' },
  ],
}

export const FACTOR_META: Record<keyof FactorScores, { label: string; color: string }> = {
  behavioral_score:  { label: 'Behavioral Assessment',   color: '#2E6DA4' },
  credential_score:  { label: 'Credentials & Education', color: '#1A5C38' },
  employment_score:  { label: 'Employment History',       color: '#1A5C38' },
  fraud_score:       { label: 'Identity & Fraud Check',   color: '#1A5C38' },
  interview_score:   { label: 'AI Interview',             color: '#2E6DA4' },
  learning_score:    { label: 'Continuous Learning',      color: '#E67E22' },
  reference_score:   { label: 'Reference Quality',        color: '#1A5C38' },
  agent_score:       { label: 'Agent Stack',              color: '#0A1F44' },
}
