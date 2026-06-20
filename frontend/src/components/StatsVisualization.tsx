'use client';

import React, { FC } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import type {
  ChargebackStats,
  DisputeOutcomeStats,
  ChargebackCase,
} from '@/types/index';

interface StatsVisualizationProps {
  stats: ChargebackStats | null;
  outcomes: DisputeOutcomeStats | null;
  cases?: ChargebackCase[];
  isLoading?: boolean;
}

const COLORS = ['#38BDF8', '#818CF8', '#F97316', '#EC4899'];
const tooltipStyle = {
  contentStyle: {
    backgroundColor: '#111827',
    border: '1px solid #374151',
    borderRadius: '8px',
    color: '#F9FAFB',
  },
  itemStyle: {
    color: '#F9FAFB',
  },
  labelStyle: {
    color: '#F9FAFB',
    fontWeight: 600,
  },
};
const StatsVisualization: FC<StatsVisualizationProps> = ({
  stats,
  outcomes,
  cases,
  isLoading = false,
}) => {
  if (isLoading || !stats || !outcomes) {
    return (
      <div className="glass-card p-6 h-full flex items-center justify-center">
        <div className="text-text-secondary text-sm">
          Loading statistics...
        </div>
      </div>
    );
  }

  const caseStatusData = [
    { name: 'Open', value: stats.open_cases },
    { name: 'Resolved', value: stats.resolved_cases },
  ];

  const outcomesData = [
    {
      name: 'Favorable to Merchant',
      value: outcomes.favorable_to_merchant,
    },
    {
      name: 'Favorable to Customer',
      value: outcomes.favorable_to_customer,
    },
    {
      name: 'Pending',
      value: outcomes.pending,
    },
    {
      name: 'Settlement',
      value: outcomes.settlement,
    },
  ];

  const merchantPerformanceData = [
    { name: 'Won', value: stats.merchant_win_count },
    { name: 'Lost', value: stats.merchant_loss_count },
  ];

  const totalLossAllocation =
    cases?.reduce(
      (sum, item) => sum + item.loss_allocation,
      0
    ) || 0;

  const avgMerchantLiability =
    cases?.length
      ? totalLossAllocation / cases.length
      : 0;

  const lossAllocationData = [
    {
      name: 'Merchant Liability',
      value: Number(avgMerchantLiability.toFixed(1)),
    },
    {
      name: 'Remaining',
      value: Number((100 - avgMerchantLiability).toFixed(1)),
    },
  ];

  const disputeReasonData = [
  {
    name: 'Fraud',
    value: cases?.filter(
      (c) => c.dispute_reason === 'fraud'
    ).length || 0,
  },
  {
    name: 'Item Not Received',
    value: cases?.filter(
      (c) => c.dispute_reason === 'item_not_received'
    ).length || 0,
  },
  {
    name: 'Quality Issue',
    value: cases?.filter(
      (c) => c.dispute_reason === 'quality_issue'
    ).length || 0,
  },
  {
    name: 'Not As Described',
    value: cases?.filter(
      (c) => c.dispute_reason === 'not_as_described'
    ).length || 0,
  },
];

  const totalResolved =
  stats.merchant_win_count +
  stats.merchant_loss_count;

const merchantWinRate =
  totalResolved > 0
    ? (
        (stats.merchant_win_count / totalResolved) *
        100
      ).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      <div className="glass-card p-3">
  <div className="flex flex-wrap gap-2 items-center">
    <span className="text-xs text-text-secondary">
      Data Sources:
    </span>

    <span className="px-2 py-1 text-xs rounded bg-sky-500/10 border border-sky-500 text-sky-400">
      Synthetic Order & Dispute Data
    </span>

    <span className="px-2 py-1 text-xs rounded bg-indigo-500/10 border border-indigo-500 text-indigo-400">
      CFPB
    </span>

    <span className="px-2 py-1 text-xs rounded bg-green-500/10 border border-green-500 text-green-400">
      Federal Reserve Payments Study
    </span>
  </div>
</div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <p className="text-caption text-text-secondary mb-1">
            Total Cases
          </p>
          <p className="text-3xl font-bold text-accent-primary">
            {stats.total_cases}
          </p>
        </div>

        <div className="glass-card p-4">
          <p className="text-caption text-text-secondary mb-1">
            Avg Dispute Amount
          </p>
          <p className="text-2xl font-bold text-accent-secondary">
            ${stats.avg_dispute_amount.toFixed(2)}
          </p>
        </div>

        <div className="glass-card p-4">
          <p className="text-caption text-text-secondary mb-1">
            Total Volume
          </p>
          <p className="text-2xl font-bold text-accent-primary">
            ${stats.total_chargeback_volume.toFixed(0)}
          </p>
        </div>

        <div className="glass-card p-4">
          <p className="text-caption text-text-secondary mb-1">
            Merchant Win Rate
          </p>
          <p className="text-2xl font-bold text-accent-secondary">
  {merchantWinRate}%
</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Case Status Distribution */}
        <div className="glass-card p-4">
          <h4 className="text-caption text-text-secondary mb-4 font-semibold">
            Case Status Distribution
          </h4>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={caseStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                dataKey="value"
              >
                {caseStatusData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

             <Tooltip {...tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Merchant Performance */}
        <div className="glass-card p-4">
          <h4 className="text-caption text-text-secondary mb-4 font-semibold">
            Merchant Performance
          </h4>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={merchantPerformanceData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1F2937"
              />
              <XAxis dataKey="name" stroke="#D1D5DB" />
              <YAxis stroke="#D1D5DB" />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="value" fill="#38BDF8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Loss Allocation */}
<div className="glass-card p-4">
  <h4 className="text-caption text-text-secondary mb-4 font-semibold">
    Loss Allocation
  </h4>

  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie
        data={lossAllocationData}
        cx="50%"
        cy="50%"
        outerRadius={65}
        dataKey="value"
        label={false}
        labelLine={false}
      >
        <Cell fill="#38BDF8" />
        <Cell fill="#818CF8" />
      </Pie>

      <Tooltip {...tooltipStyle} />
    </PieChart>
  </ResponsiveContainer>

  <div className="mt-3 text-sm text-text-secondary space-y-2">
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-sky-400"></span>
    <span>
      Merchant Liability: {avgMerchantLiability.toFixed(1)}%
    </span>
  </div>

  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-indigo-400"></span>
    <span>
      Remaining: {(100 - avgMerchantLiability).toFixed(1)}%
    </span>
  </div>
</div>
</div>
</div>

{/* CFPB + Federal Reserve Visualizations */}
   
      
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* CFPB Complaint Themes */}
        <div className="glass-card p-4">
          <h4 className="text-caption text-text-secondary mb-4 font-semibold">
            CFPB Complaint Themes
          </h4>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { name: 'Fraud', value: 42 },
                { name: 'Billing', value: 31 },
                { name: 'Unauthorized', value: 18 },
                { name: 'Delivery', value: 9 },
              ]}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1F2937"
              />
              <XAxis
                dataKey="name"
                stroke="#D1D5DB"
              />
              <YAxis stroke="#D1D5DB" />
              <Tooltip {...tooltipStyle} />
              <Bar
                dataKey="value"
                fill="#38BDF8"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          <p className="text-xs text-text-secondary mt-3">
            Illustrative complaint categories aligned with CFPB complaint trends.
          </p>
        </div>

        {/* Federal Reserve Payments Study */}
        <div className="glass-card p-4">
          <h4 className="text-caption text-text-secondary mb-4 font-semibold">
            Payment Rail Context
          </h4>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Card Payments', value: 72 },
                  { name: 'ACH', value: 18 },
                  { name: 'Wire', value: 10 },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                <Cell fill="#38BDF8" />
                <Cell fill="#818CF8" />
                <Cell fill="#F97316" />
              </Pie>

              <Tooltip {...tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-3 text-sm text-text-secondary space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-400"></span>
              <span>Card Payments (72%)</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-400"></span>
              <span>ACH (18%)</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-400"></span>
              <span>Wire (10%)</span>
            </div>
          </div>

          <p className="text-xs text-text-secondary mt-3">
            Illustrative payment mix inspired by Federal Reserve Payments Study reporting.
          </p>
        </div>

      </div> 

            {/* Outcomes */}
      <div className="glass-card p-4">
        <h4 className="text-caption text-text-secondary mb-4 font-semibold">
          Dispute Outcomes
        </h4>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={outcomesData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1F2937"
            />
            <XAxis
              dataKey="name"
              stroke="#D1D5DB"
              angle={-45}
              textAnchor="end"
              height={130}
            />
            <YAxis stroke="#D1D5DB" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0B1117',
                border: '1px solid #1F2937',
              }}
            />
            <Bar dataKey="value" fill="#818CF8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

<div className="glass-card p-4">
  <h4 className="text-caption text-text-secondary mb-4 font-semibold">
    Dispute Reason Distribution
  </h4>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={disputeReasonData}
      layout="vertical"
    >
      <CartesianGrid
        strokeDasharray="3 3"
        stroke="#1F2937"
      />

      <XAxis
        type="number"
        stroke="#D1D5DB"
      />

      <YAxis
        type="category"
        dataKey="name"
        stroke="#D1D5DB"
        width={120}
      />

      <Tooltip {...tooltipStyle} />

      <Bar
        dataKey="value"
        fill="#F97316"
        radius={[0, 4, 4, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
</div>



      
      
    </div>
    
  );
};

export default StatsVisualization;