export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface EscalationAlert {
  id: string;
  title: string;
  description: string;
  riskLevel: RiskLevel;
  riskScore: number;
  timestamp: string;
  factors: EscalationFactor[];
  topic: string;
  isResolved: boolean;
}

export interface EscalationFactor {
  name: string;
  value: number;
  weight: number;
  label: string;
}

export interface EscalationPrediction {
  timestamp: string;
  predictedScore: number;
  confidence: number;
  actualScore?: number;
}
