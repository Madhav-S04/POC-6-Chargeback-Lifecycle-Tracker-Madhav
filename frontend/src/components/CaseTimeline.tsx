'use client';

import React, { FC, useEffect, useState } from 'react';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
} from 'lucide-react';

import type {
  ChargebackCase,
  TimelineEvent,
} from '@/types';

import { api } from '@/lib/api';

interface CaseTimelineProps {
  case: ChargebackCase;
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'Pending';

  return new Date(dateString).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );
};

const getEventIcon = (eventType: string) => {
  switch (eventType) {
    case 'opened':
      return AlertCircle;

    case 'response_submitted':
      return CheckCircle;

    case 'bank_review':
      return FileText;

    case 'resolved':
      return Clock;

    default:
      return Clock;
  }
};

const getEventTitle = (eventType: string) => {
  switch (eventType) {
    case 'opened':
      return 'Dispute Opened';

    case 'response_submitted':
      return 'Merchant Response';

    case 'bank_review':
      return 'Bank Review';

    case 'resolved':
      return 'Resolution';

    default:
      return eventType;
  }
};

const getStageColor = (status: string) => {
  switch (status) {
    case 'opened':
      return 'bg-red-500/20 text-red-400';

    case 'under_review':
      return 'bg-yellow-500/20 text-yellow-400';

    case 'merchant_response':
      return 'bg-blue-500/20 text-blue-400';

    case 'resolved':
      return 'bg-green-500/20 text-green-400';

    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

const CaseTimeline: FC<CaseTimelineProps> = ({
  case: chargebackCase,
}) => {
  const [timeline, setTimeline] = useState<
    TimelineEvent[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        setLoading(true);

        const data =
          await api.getCaseTimeline(
            chargebackCase.id
          );

        setTimeline(data || []);
      } catch (err) {
        console.error(
          'Timeline fetch failed',
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [chargebackCase.id]);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
  <h3 className="text-title text-text-primary">
    Case Timeline
  </h3>

  <span
    className={`px-3 py-1 rounded text-xs font-semibold ${getStageColor(
      chargebackCase.case_status
    )}`}
  >
    {chargebackCase.case_status
      .replace(/_/g, ' ')
      .toUpperCase()}
  </span>
</div>

      {loading ? (
        <div className="text-text-secondary">
          Loading timeline...
        </div>
      ) : (
        <div className="space-y-4">
          {timeline.map((event, index) => {
            const Icon = getEventIcon(
              event.event_type
            );

            return (
              <div
                key={index}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-accent-primary/20 border border-accent-primary flex items-center justify-center">
                    <Icon className="w-4 h-4 text-accent-primary" />
                  </div>

                  {index <
                    timeline.length - 1 && (
                    <div className="w-0.5 h-12 bg-gradient-to-b from-accent-primary to-transparent mt-2" />
                  )}
                </div>

                <div className="pb-4 flex-1">
                  <p className="text-caption text-text-secondary">
                    {formatDate(
                      event.timestamp
                    )}
                  </p>

                  <h4 className="text-body font-semibold text-text-primary mt-1">
                    {getEventTitle(
                      event.event_type
                    )}
                  </h4>

                  <p className="text-caption text-text-secondary mt-1">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Evidence */}
      {chargebackCase
        .merchant_response_evidence
        .length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-body font-semibold text-text-primary mb-3">
            Merchant Evidence
          </h4>

          <ul className="space-y-2">
            {chargebackCase.merchant_response_evidence.map(
              (
                evidence,
                idx
              ) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-caption text-text-secondary"
                >
                  <CheckCircle className="w-4 h-4 text-accent-primary flex-shrink-0" />
                  {evidence}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Root Cause Tags */}
      <div className="mt-6">
        <h4 className="text-body font-semibold text-text-primary mb-3">
          Root Cause Analysis
        </h4>

        <div className="flex flex-wrap gap-2">
          {chargebackCase.root_cause_tags.map(
            (tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-accent-secondary/10 border border-accent-secondary text-caption text-accent-secondary rounded"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseTimeline;