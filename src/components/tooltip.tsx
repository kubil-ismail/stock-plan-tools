import { Info, CircleHelp } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useEffect, useState } from "react";

type Props = {
  title: string;
  description: string;
};

export function FieldInfo({ title, description }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <div className="flex items-center gap-1">
        <span>{title}</span>

        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="text-neutral-400 hover:text-neutral-600 transition"
              >
                <Info size={14} />
              </button>
            </TooltipTrigger>

            <TooltipContent className="max-w-[240px]">
              <p className="text-[12px] leading-relaxed">{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <span>{title}</span>

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="text-neutral-400 active:scale-95 transition"
          >
            <Info size={14} />
          </button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-[260px] rounded-2xl">
          <div>
            <p className="font-semibold text-[13px] mb-1">{title}</p>

            <p className="text-[12px] text-neutral-500 leading-relaxed">
              {description}
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export const InfoButton = ({
  text,
  orange = false,
}: {
  text: string;
  orange?: boolean;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const iconClass = orange
    ? "text-orange-400 hover:text-orange-600"
    : "text-neutral-400 hover:text-neutral-600";

  if (isDesktop) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button">
            <CircleHelp
              size={14}
              className={`${iconClass} transition-colors`}
            />
          </button>
        </TooltipTrigger>

        <TooltipContent>
          <p className="max-w-[220px] text-xs">{text}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">
          <CircleHelp size={14} className={`${iconClass} transition-colors`} />
        </button>
      </PopoverTrigger>

      <PopoverContent side="top" className="w-[220px] text-xs leading-relaxed">
        {text}
      </PopoverContent>
    </Popover>
  );
};

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = () => setMatches(media.matches);

    listener();

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
