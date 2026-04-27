import { Building2 } from "lucide-react";

interface Props {
  item: { name: string; type: string; percentage: string; asset: string };
}

function SubsidiarieCard(props: Props) {
  const { item } = props;

  return (
    <div className="bg-muted/40 rounded-xl p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
        <span className="text-[14px] font-bold text-primary">
          <Building2 className="w-5 h-5 text-primary" />
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
          <span className="font-medium">Asset Total:</span> {item?.asset} (
          {item?.percentage})
        </p>
      </div>
    </div>
  );
}

export default SubsidiarieCard;
