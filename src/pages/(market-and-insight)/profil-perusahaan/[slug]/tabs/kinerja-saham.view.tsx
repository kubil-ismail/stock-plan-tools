/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

import { GlassCard } from "@/components/glassCard";
import { StockDetailResponse } from "@/types/stocks";
import MetricCard from "@/components/metricCard";

import { formatBigNumber, formatDecimal, generateInsight } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import clsx from "clsx";

interface Props {
  selectedCompany: StockDetailResponse;
}

export default function Kinerja_saham_view(props: Props) {
  const { selectedCompany } = props;

  return (
    <GlassCard>
      <h3 className="text-[18px] md:text-[24px] font-semibold text-foreground mb-1 flex items-center gap-2">
        Kinerja Saham {selectedCompany?.company_name}
      </h3>
      <p className="text-[14px] text-muted-foreground mb-6">
        Fundamental dan Performa perusahaan
      </p>

      <Section title="Rangkuman">
        {(() => {
          const insight = generateInsight({
            industry: selectedCompany?.industry?.name,
            subIndustry: selectedCompany?.sub_industry?.name,
            sector: selectedCompany?.sector?.name,
            subSector: selectedCompany?.sub_sector?.name,
            listing_board: selectedCompany?.listing_board,

            marketCap: formatDecimal(selectedCompany?.technical?.mkt_cap),
            revenue: formatDecimal(selectedCompany?.technical?.total_rev),

            per: formatDecimal(selectedCompany?.technical?.per),
            pbv: formatDecimal(selectedCompany?.technical?.pbv),

            roe: formatDecimal(selectedCompany?.technical?.roe),
            roa: formatDecimal(selectedCompany?.technical?.roa),
            der: formatDecimal(selectedCompany?.technical?.der),
            npm: formatDecimal(selectedCompany?.technical?.npm),

            ytd: formatDecimal(selectedCompany?.technical?.ytd?.value),
            chg52w: formatDecimal(
              selectedCompany?.technical?._52_wk_chg?.value,
            ),

            mtd: formatDecimal(selectedCompany?.technical?.mtd?.value),

            chg4w: formatDecimal(selectedCompany?.technical?._4_wk_chg?.value),

            chg13w: formatDecimal(
              selectedCompany?.technical?._13_wk_chg?.value,
            ),

            chg26w: formatDecimal(
              selectedCompany?.technical?._26_wk_chg?.value,
            ),
          });

          return (
            <div
              className={clsx(
                "rounded-2xl border p-5",
                "bg-gradient-to-br from-white to-zinc-50",
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={clsx(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border",
                    insight.signal,
                    insight.signal.color,
                  )}
                >
                  <Sparkles className={clsx("h-5 w-5", insight.signal.iconColor)} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-zinc-900">
                      Insight Otomatis
                    </p>

                    <div
                      className={clsx(
                        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                        insight.signal.color,
                      )}
                    >
                      <div
                        className={clsx("h-1.5 w-1.5 rounded-full", insight.signal.dot)}
                      />

                      {insight.signal.label}
                    </div>

                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500 border border-zinc-200">
                      Beta
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-zinc-700">
                    {insight.summary}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </Section>

      <Section title="Fundamental">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <MetricCard
            featured
            label="Market Cap"
            value={formatBigNumber(
              formatDecimal(selectedCompany.technical.mkt_cap),
            )}
            disableArrow
            sector={selectedCompany?.sector.name}
            industry={selectedCompany?.industry.name}
          />

          <MetricCard
            featured
            label="Total Revenue"
            value={formatBigNumber(
              formatDecimal(selectedCompany.technical.total_rev),
            )}
            disableArrow
            sector={selectedCompany?.sector.name}
            industry={selectedCompany?.industry.name}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <MetricCard
            label="PER"
            value={formatDecimal(selectedCompany.technical.per)}
            disableArrow
            sector={selectedCompany?.sector.name}
            industry={selectedCompany?.industry.name}
          />

          <MetricCard
            label="PBV"
            value={formatDecimal(selectedCompany.technical.pbv)}
            disableArrow
            sector={selectedCompany?.sector.name}
            industry={selectedCompany?.industry.name}
          />

          <MetricCard
            label="ROE %"
            value={formatDecimal(selectedCompany.technical.roe)}
            disableArrow
            sector={selectedCompany?.sector.name}
            industry={selectedCompany?.industry.name}
          />

          <MetricCard
            label="ROA %"
            value={formatDecimal(selectedCompany.technical.roa)}
            disableArrow
            sector={selectedCompany?.sector.name}
            industry={selectedCompany?.industry.name}
          />

          <MetricCard
            label="DER"
            value={formatDecimal(selectedCompany.technical.der)}
            disableArrow
            sector={selectedCompany?.sector.name}
            industry={selectedCompany?.industry.name}
          />
        </div>
      </Section>

      <Section title="Performa">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <MetricCard
            label="4W Change"
            value={formatDecimal(
              selectedCompany?.technical?._4_wk_chg?.value,
              selectedCompany?.technical?._4_wk_chg?.direction,
            )}
            percentage
          />

          <MetricCard
            label="13W Change"
            value={formatDecimal(
              selectedCompany?.technical?._13_wk_chg?.value,
              selectedCompany?.technical?._13_wk_chg?.direction,
            )}
            percentage
          />

          <MetricCard
            label="26W Change"
            value={formatDecimal(
              selectedCompany?.technical?._26_wk_chg?.value,
              selectedCompany?.technical?._26_wk_chg?.direction,
            )}
            percentage
          />

          <MetricCard
            label="52W Change"
            value={formatDecimal(
              selectedCompany?.technical?._52_wk_chg?.value,
              selectedCompany?.technical?._52_wk_chg?.direction,
            )}
            percentage
          />

          <MetricCard
            label="MTD"
            value={formatDecimal(
              selectedCompany?.technical?.mtd?.value,
              selectedCompany?.technical?.mtd?.direction,
            )}
            percentage
          />

          <MetricCard
            label="YTD"
            value={formatDecimal(
              selectedCompany?.technical?.ytd?.value,
              selectedCompany?.technical?.ytd?.direction,
            )}
            percentage
          />
        </div>
      </Section>
    </GlassCard>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 last:mb-0">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-zinc-500" />

        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          {title}
        </h4>
      </div>

      {children}
    </section>
  );
}
