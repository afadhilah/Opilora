import React from 'react';
import { AlertCard } from '@/components/cards/AlertCard';
import type { EscalationAlert } from '@/types/escalation.types';

interface AlertTimelineProps {
  alerts: EscalationAlert[];
}

export function AlertTimeline({ alerts }: AlertTimelineProps) {
  return (
    <div className="space-y-2">
      {alerts.map((alert) => (
        <AlertCard
          key={alert.id}
          title={alert.title}
          description={alert.description}
          riskLevel={alert.riskLevel}
          timestamp={alert.timestamp}
          topic={alert.topic}
          isResolved={alert.isResolved}
        />
      ))}
    </div>
  );
}
