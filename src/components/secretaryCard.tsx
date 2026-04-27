import { Mail, Phone } from "lucide-react";

interface Props {
  secretary: {
    name: string;
    email: string;
    phone: string;
  };
}

function SecretaryCard(props: Props) {
  const { secretary } = props;

  return (
    <div className="bg-muted/40 rounded-xl p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
        <span className="text-[14px] font-bold text-primary">
          {secretary?.name
            ?.split(" ")
            ?.map((n) => n[0])
            ?.join("")
            ?.substring(0, 2)}
        </span>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <p className="text-[14px] font-semibold text-foreground mb-0.5 capitalize">
            {secretary?.name.toLowerCase()}
          </p>
        </div>

        <div className="flex gap-1 mb-1">
          <Mail className="text-muted-foreground" size={13} />
          <a
            className="text-[13px] text-muted-foreground"
            href={`mailto:${secretary?.email}`}
          >
            {secretary?.email}
          </a>
        </div>

        <div className="flex gap-1">
          <Phone className="text-muted-foreground" size={13} />
          <p className="text-[12px] text-muted-foreground">
            {secretary?.phone}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SecretaryCard;
