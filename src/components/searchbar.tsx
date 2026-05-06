"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronRight, Search, SearchIcon } from "lucide-react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { cn } from "@/lib/utils";
import company from "@/data/company.json";
import { StockDetail } from "@/types/stocks";
import CompanyLogo from "./companyLogo";
import { useRouter } from "next/navigation";

function Searchbar() {
  const router = useRouter();
  const _company: StockDetail[] = (company as { data: StockDetail[] }).data;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase();

    return _company.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.ticker.toLowerCase().includes(q)
    );
  }, [_company, query]);

  const handleSelect = React.useCallback(
    (item: StockDetail) => {
      setOpen(false);

      setTimeout(() => {
        router.push(`/profil-perusahaan/${item.ticker}`);
      }, 500);
    },
    [router]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (!filtered.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filtered.length);
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev === 0 ? filtered.length - 1 : prev - 1));
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleSelect(filtered[activeIndex]);
      }
    },
    [filtered, activeIndex, handleSelect]
  );

  useEffect(() => {
    const container = containerRef.current;
    const el = itemRefs.current[activeIndex];

    if (!container || !el) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const offset = 8;

    // kalau kepotong atas
    if (elRect.top < containerRect.top + offset) {
      container.scrollTop -= containerRect.top - elRect.top + offset;
    }

    // kalau kepotong bawah
    else if (elRect.bottom > containerRect.bottom - offset) {
      container.scrollTop += elRect.bottom - containerRect.bottom + offset;
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");

      // Cmd + K (Mac) / Ctrl + K (Windows)
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <SearchIcon />
          Cari{" "}
          <KbdGroup>
            <Kbd>
              {typeof navigator !== "undefined" &&
              navigator.userAgent.includes("Mac")
                ? "⌘+K"
                : "Ctrl+k"}
            </Kbd>
          </KbdGroup>
        </Button>
      </DialogTrigger>

      <DialogContent showCloseButton={false} className="sm:max-w-xl space-y-0!">
        <InputGroup className="w-full">
          <InputGroupInput
            type="search"
            placeholder="Cari perusahaan..."
            defaultValue={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <div className="flex items-center justify-between px-3 ">
          <p className="text-[14px] font-medium">Hasil Pencarian</p>
          <p className="text-[12px] text-neutral-500">
            {filtered.length} item ditemukan
          </p>
        </div>

        <div ref={containerRef} className="max-h-[400px] min-h-[200px] overflow-y-auto">
          {filtered.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={item.ticker}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => handleSelect(item)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all group min-h-[55px]",
                  "hover:bg-muted/30",
                  isActive && "bg-muted"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                  <CompanyLogo company={item} disableBorder />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold">{item.ticker}</p>
                  <p className="text-[13px] text-muted-foreground truncate">
                    {item.name}
                  </p>
                </div>

                <ChevronRight
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-all",
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  )}
                />
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-[16px] font-medium text-foreground mb-1">
                No stocks found
              </p>
              <p className="text-[14px] text-muted-foreground">
                Try searching by stock code or company name
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/20">
            <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-medium">
                  ↑↓
                </kbd>
                <span>Navigasi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-medium">
                  ↵
                </kbd>
                <span>Pilih</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-medium">
                ESC
              </kbd>
              <span>Tutup</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default Searchbar;
