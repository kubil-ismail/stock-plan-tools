import Link from "next/link";
import ManagementCard from "@/components/managementCard";
import SecretaryCard from "@/components/secretaryCard";
import ShareholderCard from "@/components/shareholderCard";
import SubsidiarieCard from "@/components/subsidiarieCard";
import {
  StockDetailResponse,
  StockManagement,
  StockDirectors,
} from "@/types/stocks";
import { GlassCard } from "@/components/glassCard";
import { formatUrl, normalizeSlug, parseNumber, slugify, sortManagement } from "@/lib/utils";
import { format } from "date-fns";

interface Props {
  selectedCompany: StockDetailResponse;
}

function Profil_perusahaan_view(props: Props) {
  const { selectedCompany } = props;

  const ceo = selectedCompany?.directors.find(
    (item: StockDirectors) =>
      item.position.toUpperCase() === "PRESIDEN DIREKTUR" ||
      item.position.toUpperCase() === "DIREKTUR UTAMA"
  );

  const secretary = selectedCompany?.corporate_secretary;

  const managements = sortManagement([
    ...(selectedCompany?.directors ?? []),
    ...(selectedCompany?.commissioners ?? []),
    ...(selectedCompany?.audit_committee ?? []),
  ]);

  const shareholders =
    selectedCompany?.shareholders
      .slice()
      .sort((a, b) => parseNumber(b.shares) - parseNumber(a.shares)) ?? [];

  const subsidiaries =
    selectedCompany?.subsidiaries
      .slice()
      .sort((a, b) => parseNumber(b.total_assets) - parseNumber(a.total_assets)) ?? [];

  return (
    <GlassCard>
      <h3 className="text-[18px] md:text-[24px] font-semibold text-foreground mb-1 flex items-center gap-2">
        Tentang {selectedCompany?.company_name}
      </h3>
      <p className="text-[14px] text-muted-foreground mb-6">
        Profil dan manajemen perusahaan
      </p>

      <section className="my-10">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <h4 className="text-[16px] font-semibold text-foreground mb-1">
              Sektor
            </h4>

            <a
              href={`/profil-perusahaan?search=${selectedCompany?.sector?.name}`}
              className="text-[14px] text-muted-foreground leading-relaxed! mb-4 mt-0 block underline"
            >
              {selectedCompany?.sector?.name}
            </a>

            <h4 className="text-[16px] font-semibold text-foreground mb-1">
              Website
            </h4>
            <a
              href={formatUrl(selectedCompany?.website)}
              target="_blank"
              className="text-[14px] text-muted-foreground leading-relaxed! mb-4 mt-0 block underline"
            >
              {selectedCompany?.website}
            </a>

            <h4 className="text-[16px] font-semibold text-foreground mb-1">
              Tanggal IPO
            </h4>
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              {format(
                selectedCompany?.listing_date ?? new Date(),
                "d MMMM yyyy"
              )}
            </p>
          </div>

          <div>
            <h4 className="text-[16px] font-semibold text-foreground mb-1">
              Industri
            </h4>
            <a
              href={`/profil-perusahaan?search=${selectedCompany?.industry?.name}`}
              className="text-[14px] text-muted-foreground leading-relaxed! mb-4 mt-0 block underline"
            >
              {selectedCompany?.industry?.name}
            </a>

            <h4 className="text-[16px] font-semibold text-foreground mb-1">
              NPWP
            </h4>
            <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
              {selectedCompany?.tax_id}
            </p>

            <h4 className="text-[16px] font-semibold text-foreground mb-1 capitalize">
              {ceo?.position?.toLowerCase()}
            </h4>
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              {ceo?.name}
            </p>
          </div>

          <div>
            <h4 className="text-[16px] font-semibold text-foreground mb-1">
              Papan
            </h4>
            <a
              href={`/profil-perusahaan?search=${selectedCompany?.listing_board}`}
              className="text-[14px] text-muted-foreground leading-relaxed! mb-4 mt-0 block underline"
            >
              {selectedCompany?.listing_board}
            </a>

            <h4 className="text-[16px] font-semibold text-foreground mb-1">
              Kantor Utama
            </h4>
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              {selectedCompany?.office_address}
            </p>
          </div>
        </div>

        <h4 className="text-[16px] font-semibold text-foreground mb-1">
          Bisnis Utama
        </h4>
        <p className="text-[14px] text-muted-foreground leading-relaxed">
          {selectedCompany?.business_field?.raw_business}
        </p>
      </section>

      {/* Sekertaris Perusahaan */}
      <section className="my-10">
        <h4 className="text-[16px] font-semibold text-foreground mb-2">
          Sekertaris Perusahaan
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <SecretaryCard secretary={secretary!} />
        </div>
      </section>

      <section className="my-10">
        <h4 className="text-[16px] font-semibold text-foreground mb-2">
          Manajemen Perusahaan
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mb-6">
          {managements?.map((item, key) => (
            <Link
              href={`/kepemilikan-saham/${normalizeSlug(item.name)}`}
              key={key}
            >
              <ManagementCard item={item} />
            </Link>
          ))}
        </div>
      </section>

      <section className="my-10">
        <h4 className="text-[16px] font-semibold text-foreground mb-2">
          Pemegang Saham
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mb-6">
          {shareholders?.map((item, key) => (
            <Link
              href={`/kepemilikan-saham/${normalizeSlug(item.name)}`}
              key={key}
            >
              <ShareholderCard item={item} />
            </Link>
          ))}
        </div>
      </section>

      <section className="my-10">
        <h4 className="text-[16px] font-semibold text-foreground mb-2">
          Anak Perusahaan
        </h4>

        {!subsidiaries ||
        subsidiaries.length === 0 ||
        (subsidiaries.length === 1 &&
          subsidiaries[0]?.name === "Data anak perusahaan tidak ditemukan") ? (
          <div className="border border-dashed rounded-xl p-6 text-center text-sm text-muted-foreground">
            Tidak ada data anak perusahaan
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {subsidiaries.map((item, key) => (
              <SubsidiarieCard item={item} key={key} />
            ))}
          </div>
        )}
      </section>
    </GlassCard>
  );
}

export default Profil_perusahaan_view;
