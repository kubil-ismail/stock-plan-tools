import { ChevronRight } from "lucide-react";

interface Props {
  item: { name: string; type: string; position: string };
}

function formatPosition(type?: string, position?: string) {
  if (!type && !position) return "-";

  // case: Komite
  if (type === "KOMITE AUDIT") {
    return `Komite Audit ${capitalize(position)}`;
  }

  // case: Sekretaris
  if (type === "SEKRETARIS PERUSAHAAN") {
    return "Sekretaris Perusahaan";
  }

  // case: Direksi / Komisaris
  if (type === position) {
    return capitalize(position);
  }

  return capitalize(position);
}

function capitalize(text?: string) {
  if (!text) return "";

  return text
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function ManagementCard(props: Props) {
  const { item } = props;

  return (
    <div className="group bg-muted/40 hover:bg-muted/70 transition-all duration-300 rounded-xl p-4 flex items-start justify-between gap-3 border border-transparent hover:border-border cursor-pointer hover:shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
          <span className="text-[14px] font-bold text-primary">
            {item?.name
              ?.split(" ")
              ?.map((n) => n[0])
              ?.join("")
              ?.substring(0, 2)}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <p className="text-[14px] font-semibold text-foreground mb-0.5 capitalize transition-colors duration-300 group-hover:text-primary">
              {item?.name.toLocaleLowerCase()}
            </p>
          </div>

          <p className="text-[12px] text-muted-foreground">
            {formatPosition(item.type, item.position)}
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
