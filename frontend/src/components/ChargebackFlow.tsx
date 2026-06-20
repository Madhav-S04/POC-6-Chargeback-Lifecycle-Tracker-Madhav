'use client';

import React from 'react';
import {
  User,
  Building2,
  CreditCard,
  Landmark,
  Store,
  FileCheck,
  ArrowRight,
} from 'lucide-react';

const stages = [
  {
    title: 'Customer',
    icon: User,
    desc: 'Dispute Initiated',
  },
  {
    title: 'Issuing Bank',
    icon: Building2,
    desc: 'Investigation',
  },
  {
    title: 'Card Network',
    icon: CreditCard,
    desc: 'Rule Enforcement',
  },
  {
    title: 'Acquirer',
    icon: Landmark,
    desc: 'Merchant Support',
  },
  {
    title: 'Merchant',
    icon: Store,
    desc: 'Evidence Submission',
  },
  {
    title: 'Representment',
    icon: FileCheck,
    desc: 'Final Decision',
  },
];

export default function ChargebackFlow() {
  return (
    <div className="glass-card p-4">
      <h4 className="text-caption text-text-secondary mb-6 font-semibold">
        Chargeback Control Flow
      </h4>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {stages.map((stage, index) => {
          const Icon = stage.icon;

          return (
            <React.Fragment key={stage.title}>
              <div className="flex flex-col items-center text-center min-w-[110px]">
                <div className="w-12 h-12 rounded-full border border-border bg-surface flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent-primary" />
                </div>

                <div className="mt-2 text-sm font-semibold text-text-primary">
                  {stage.title}
                </div>

                <div className="text-xs text-text-secondary">
                  {stage.desc}
                </div>
              </div>

              {index < stages.length - 1 && (
                <ArrowRight className="w-5 h-5 text-accent-secondary" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-text-secondary">
        Shows the dispute ownership path from customer complaint through
        representment and final liability assignment.
      </p>
    </div>
  );
}