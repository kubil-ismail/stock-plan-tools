import { formatRupiah } from "@/lib/utils";
import { Building2, ChevronRight, Landmark, User, Users } from "lucide-react";

function getShareholderIcon(type?: string) {
  switch (type) {
    case "Lebih dari 5%":
      return <Building2 className="w-5 h-5 text-primary" />;

    case "Direksi":
    case "Komisaris":
      return <User className="w-5 h-5 text-primary" />;

    case "Masyarakat Non Warkat":
    case "Masyarakat Warkat":
      return <Users className="w-5 h-5 text-primary" />;

    case "Saham Treasury":
      return <Landmark className="w-5 h-5 text-primary" />;

    default:
      return <User className="w-5 h-5 text-primary" />;
  }
}

export default function ShareholderCard(props: {
  item: {
    type: string;
    name: string;
    percentage: string | number;
    shares: string | number;
  };
}) {
  const { item } = props;

  const percentage =
    typeof item?.percentage === "number"
      ? `${item?.percentage}%`
      : item?.percentage;

  return (
    <div className="group bg-muted/40 hover:bg-muted/70 transition-all duration-300 rounded-xl p-4 flex items-start justify-between gap-3 border border-transparent hover:border-border cursor-pointer hover:shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
          {getShareholderIcon(item.type)}
        </div>

        <div>
          <div className="flex min-w-0">
            <p
              className={`font-semibold text-foreground mb-0.5 capitalize transition-all duration-300 group-hover:text-primary leading-snug break-words ${
                item?.name?.length > 40 ? "text-[13px]" : "text-[14px]"
              }`}
            >
              {item?.name}
            </p>
          </div>

          <p className="text-[12px] text-muted-foreground">
            <span className="font-medium">Jenis:</span> {item?.type}
          </p>

          <p className="text-[12px] text-muted-foreground">
            <span className="font-medium">Jumlah:</span>{" "}
            {formatRupiah(item?.shares, { prefix: false })} ({percentage})
          </p>
        </div>
      </div>

      <ChevronRight
        size={18}
        className="text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
      />
    </div>
  );
}
