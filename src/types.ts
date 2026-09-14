export interface TORScore {
  timeline: number; // ระยะเวลา (0-10)
  expertise: number; // ความเชี่ยวชาญของบริษัทหรือทีมงาน (0-10)
  scope: number; // ขอบเขต (0-10)
  technical: number; // เทคนิคที่นำมาใช้ (0-10)
  price: number; // ราคา (0-10)
}

export interface TORScoreRationales {
  timeline: string;
  expertise: string;
  scope: string;
  technical: string;
  price: string;
}

export interface CompanyExpert {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  educationOrCert: string;
  responsibility: string;
  keyProjects?: string[];
  licenseNumber?: string;
  phone?: string;
  email?: string;
}

export interface TORDocument {
  id: string;
  code: string;
  title: string;
  submitter: string;
  budget: string;
  rawBudgetNumber: number;
  duration: string;
  durationDays: number;
  scope: string;
  hardware: string[];
  software: string[];
  deliveryAndAcceptance: string;
  warrantyAndSla: string;
  qualifications: string;
  experts?: CompanyExpert[];
  strengths: string[];
  weaknesses: string[];
  scores: TORScore;
  scoreRationales: TORScoreRationales;
  rawContent?: string;
  sourceType: 'preset' | 'upload' | 'drive' | 'proposal';
  fileName?: string;
  driveUrl?: string;
  driveFolder?: string;
  driveFileId?: string;
  fileSize?: string;
  taxId?: string;
  contactPerson?: string;
  contactPhone?: string;
  hasBarrierGate?: boolean;
  architectureType?: 'edge_ai' | 'central_server' | 'hybrid';
  warrantyYears?: number;
  contactEmail?: string;
  submittedAt?: string;
}

export interface TORFilterOptions {
  search: string;
  budgetRange: 'all' | 'under1m' | '1mTo2m' | 'above2m';
  duration: 'all' | '60' | '90' | '120';
  architecture: 'all' | 'edge_ai' | 'central_server' | 'hybrid';
  barrierGate: 'all' | 'with_barrier' | 'without_barrier';
  warranty: 'all' | '2' | '3' | '5';
  minScore: number; // 0 to 10
  sourceType: 'all' | 'preset' | 'upload' | 'drive' | 'proposal';
}

export interface VendorProposalInput {
  title: string;
  code?: string;
  vendorName: string;
  taxId?: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  proposedPrice: number;
  durationDays: number;
  scopeDescription: string;
  barrierGateIncluded: boolean;
  architecture: 'edge_ai' | 'central_server' | 'hybrid';
  hardwareItems: string[];
  softwareFeatures: string[];
  deliveryMilestones: string;
  warrantyYears: number;
  slaResponseHours: number;
  pmIntervalMonths: number;
  qualificationsSummary: string;
  pastProjectValue?: string;
  experts?: CompanyExpert[];
  attachmentData?: string;
  attachmentName?: string;
}

export interface ComparisonAnalysisResult {
  overview: string;
  similarities: {
    category: string;
    description: string;
  }[];
  differences: {
    category: string;
    details: Record<string, string>;
  }[];
  procurementNotice: string[];
  officialRecommendations: {
    targetCase: string;
    suggestedTOR: string;
    justification: string;
    risksAndMitigation: string;
  }[];
  draftOfficialMemo: {
    subject: string;
    to: string;
    background: string;
    factFindings: string;
    legalConsiderations: string;
    proposal: string;
  };
}
