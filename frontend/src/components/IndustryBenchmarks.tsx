'use client';

import React from 'react';
import { Database, TrendingUp } from 'lucide-react';

export default function IndustryBenchmarks() {
  return (
    <div className="glass-card p-4">
      <h4 className="text-caption text-text-secondary mb-4 font-semibold">
        Industry Benchmarks
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CFPB */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-accent-primary" />
            <span className="font-semibold text-text-primary">
              CFPB Complaint Trends
            </span>
          </div>

          <p className="text-sm text-text-secondary">
            Consumer complaints are commonly concentrated around fraud,
            billing disputes, unauthorized transactions, and delivery
            issues.
          </p>

          <div className="mt-3 text-accent-primary text-sm">
            Source: CFPB Consumer Complaint Database
          </div>
        </div>

        {/* Federal Reserve */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-accent-secondary" />
            <span className="font-semibold text-text-primary">
              Federal Reserve Payments Study
            </span>
          </div>

          <p className="text-sm text-text-secondary">
            Card payment volumes continue to dominate retail electronic
            payments, making dispute management an operational priority
            for merchants.
          </p>

          <div className="mt-3 text-accent-secondary text-sm">
            Source: Federal Reserve Payments Study
          </div>
        </div>
      </div>
    </div>
  );
}