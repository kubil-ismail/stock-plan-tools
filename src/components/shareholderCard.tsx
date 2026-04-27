import { Building2, User, Users, Landmark } from "lucide-react";

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
  item: { type: string; name: string; percentage: string; total: string };
}) {
  const { item } = props;

  return (
    <div className="bg-muted/40 rounded-xl p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
        <span className="text-[14px] font-bold text-primary">
          {getShareholderIcon(item.type)}
        </span>
      </div>
      <div>
        <div className="flex items-center gap-3">
          <p className="text-[14px] font-semibold text-foreground mb-0.5">
            {item?.name}
          </p>
        </div>

        <p className="text-[12px] text-muted-foreground">
          <span className="font-medium">Jenis:</span> {item?.type}
        </p>

        <p className="text-[12px] text-muted-foreground">
          <span className="font-medium">Jumlah:</span> {item?.total} (
          {item?.percentage})
        </p>
      </div>
    </div>
  );
}
