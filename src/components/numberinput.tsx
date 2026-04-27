/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface RupiahInputProps {
  placeholder?: string;
  value?: number | null;
  onChange?: (value: number | null) => void;
  allowDecimal?: boolean;
  disablePrefix?: boolean;
  error?: boolean;
  helperText?: string | boolean | undefined;
  disabled?: boolean;
}

export function RupiahInput({
  placeholder = "Masukan nominal",
  value,
  onChange,
  allowDecimal = true,
  disablePrefix = false,
  disabled = false,
}: RupiahInputProps) {
  const [display, setDisplay] = useState("");

  /*
  =========================
  FORMAT RUPIAH
  =========================
  */

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: allowDecimal ? 2 : 0,
    }).format(num);
  };

  /*
  =========================
  SAFE PARSE
  =========================
  */

  const parseIndonesianNumber = (val: string) => {
    if (!val) return null;

    // remove thousand separator
    let cleaned = val.replace(/\./g, "");

    // change decimal comma to dot
    cleaned = cleaned.replace(",", ".");

    const num = Number(cleaned);

    if (isNaN(num)) return null;

    return num;
  };

  /*
  =========================
  SYNC EXTERNAL VALUE
  =========================
  */

  useEffect(() => {
    if (value === null || value === undefined) {
      setDisplay("");
      return;
    }

    setDisplay(formatRupiah(value));
  }, [value]);

  /*
  =========================
  HANDLE CHANGE
  =========================
  */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // allow number . ,
    val = val.replace(/[^\d.,]/g, "");

    setDisplay(val);

    const numeric = parseIndonesianNumber(val);

    onChange?.(numeric);
  };

  /*
  =========================
  FORMAT ON BLUR
  =========================
  */

  const handleBlur = () => {
    if (!display) return;

    const num = parseIndonesianNumber(display);

    if (num !== null) {
      setDisplay(formatRupiah(num));
    }
  };

  /*
  =========================
  RAW VALUE ON FOCUS
  =========================
  */

  const handleFocus = () => {
    if (!display) return;

    const num = parseIndonesianNumber(display);

    if (num !== null) {
      // tampilkan raw tapi tetap pakai decimal koma
      const raw = allowDecimal
        ? num.toString().replace(".", ",")
        : Math.floor(num).toString();

      setDisplay(raw);
    }
  };

  return (
    <InputGroup className="w-full">
      {!disablePrefix && (
        <InputGroupAddon align="inline-start">Rp</InputGroupAddon>
      )}

      <InputGroupInput
        type="text"
        inputMode="decimal"
        placeholder={placeholder}
        value={display}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        disabled={disabled}
      />
    </InputGroup>
  );
}
