import React from "react";
import { Card } from "./ui/card";
import { ArrowRight } from "lucide-react";

export interface FunnelStepData {
  step_order: number;
  name: string; 
  total_users: number;
  percentage: number; 
  next_step_percentage: number | null;
}

interface ConversionFunnelChartProps {
  funnelSteps?: FunnelStepData[] | null;
  title?: string;
  subtitle?: string;
}

const humanize = (s: string) =>
  s.replace(/_/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase());

const INLINE_COLORS = {
  high: { bg: "#10B981", text: "#065F46", shade: "#ECFDF5" }, // emerald
  mid: { bg: "#4F46E5", text: "#312E81", shade: "#EEF2FF" },  // indigo
  low: { bg: "#D97706", text: "#92400E", shade: "#FFFBEB" },   // amber
  verylow: { bg: "#F43F5E", text: "#881337", shade: "#FFF1F2" }, // rose
};

const colorForPercent = (p: number) => {
  if (p >= 75) return INLINE_COLORS.high;
  if (p >= 50) return INLINE_COLORS.mid;
  if (p >= 25) return INLINE_COLORS.low;
  return INLINE_COLORS.verylow;
};

export function ConversionFunnelChart({
  funnelSteps,
  title = "Conversion Funnel",
  subtitle = "User journey from view to purchase · Last 7 days",
}: ConversionFunnelChartProps) {
  const steps = (funnelSteps ?? []).slice().sort((a, b) => a.step_order - b.step_order);

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-slate-900">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>

      <div className="space-y-3">
        {steps.length === 0 ? (
          <p className="text-sm text-slate-500">No funnel data available</p>
        ) : (
          steps.map((step, i) => {
            const users = step.total_users ?? 0;
            const pct = typeof step.percentage === "number" ? step.percentage : 0;

            const nextPct =
              typeof step.next_step_percentage === "number"
                ? step.next_step_percentage
                : steps[i + 1]
                ? steps[i + 1].total_users && users
                  ? +((steps[i + 1].total_users / users) * 100).toFixed(2)
                  : null
                : null;

            const barColor = colorForPercent(pct);

            return (
              <div key={step.step_order} className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-700">{humanize(step.name)}</span>
                        {i < steps.length - 1 && (
                          <span className="text-xs text-slate-500">
                            {nextPct !== null ? `(${nextPct}% → next)` : "(— → next)"}
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-slate-900">{users.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">{pct}%</p>
                      </div>
                    </div>

                    <div className="h-12 bg-slate-100 rounded-lg overflow-hidden relative">
                      {/* Use inline style for background color so Tailwind purge does not affect it */}
                      <div
                        style={{
                          width: `${Math.max(0, Math.min(100, pct))}%`,
                          backgroundColor: barColor.bg,
                        }}
                        className="h-full flex items-center justify-center text-white transition-all"
                      >
                        {pct > 20 && (
                          <span className="text-xs" style={{ color: "#ffffff" }}>
                            {pct}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <div className="flex justify-center my-2">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
