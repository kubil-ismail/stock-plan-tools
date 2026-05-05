/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, SearchIcon, Check } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type Props = {
  placeholder?: string;
  variant?: string;
  label: string;
  options: any[];
  value?: any | null;
  onChange?: (broker: any | null) => void;
};

export function Autocomplete({
  placeholder = "",
  label = "",
  options,
  value,
  onChange,
  variant,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  /*
  =========================
  AUTO FOCUS SEARCH
  =========================
  */

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  /*
  =========================
  FILTER SEARCH
  =========================
  */

  const filteredOptions = useMemo(() => {
    if (!search) return options;

    return options.filter((option) =>
      `${option.name} ${option.code}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, options]);

  /*
  =========================
  HANDLE SELECT
  =========================
  */

  const handleSelect = (broker: any) => {
    onChange?.(broker);
    setOpen(false);
    setSearch("");
  };

  return (
    <>
      <span className="mb-2 block uppercase text-[12px]">{label}</span>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="w-full justify-between rounded-lg h-12"
          >
            {value ? (
              <span className="flex items-center gap-2">
                {value.logo && (
                  <img
                    src={value.logo}
                    width="20"
                    className="rounded"
                    alt={value.name}
                  />
                )}

                {variant === "stocks" && (
                  <>
                    {value.code} <span>|</span>{" "}
                    <span className="text-[13px] font-[400]">{value.name}</span>
                  </>
                )}

                {variant !== "stocks" && (
                  <>
                    {value.name} ({value.code})
                  </>
                )}
              </span>
            ) : (
              placeholder
            )}

            <ChevronDown />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-lg p-5 max-h-80 overflow-auto gap-0"
          align="start"
        >
          {/* SEARCH */}

          <PopoverHeader className="mb-3">
            <Field>
              <InputGroup>
                <InputGroupInput
                  ref={inputRef}
                  placeholder="Search Broker..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <InputGroupAddon align="inline-end">
                  <SearchIcon size={18} />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </PopoverHeader>

          {/* EMPTY */}

          {filteredOptions.length === 0 && (
            <div className="text-sm text-muted-foreground px-3 py-2">
              Broker tidak ditemukan
            </div>
          )}

          {/* LIST */}

          {filteredOptions.map((item) => {
            const isSelected = value?.code === item.code;

            return (
              <Button
                key={item.code}
                size="lg"
                variant="ghost"
                className="w-full justify-between gap-3"
                onClick={() => handleSelect(item)}
              >
                <span className="flex items-center gap-3">
                  {item.logo && (
                    <img
                      src={item.logo}
                      width="30"
                      loading="lazy"
                      className="rounded"
                      alt={item.name}
                    />
                  )}
                  {variant === "stocks" && (
                    <span className="flex gap-2 items-center">
                      <span className="block">
                        <span className="block text-left">{item.code}</span>
                        <span className="block font-[300] text-neutral-600 text-[12px]">
                          {item.name}
                        </span>
                      </span>
                    </span>
                  )}
                  {variant !== "stocks" && (
                    <>
                      {item.name} ({item.code})
                    </>
                  )}
                </span>

                {isSelected && <Check size={18} className="text-primary" />}
              </Button>
            );
          })}
        </PopoverContent>
      </Popover>
    </>
  );
}
