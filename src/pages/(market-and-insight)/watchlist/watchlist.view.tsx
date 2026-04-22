/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Edit2,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";
import { Fragment, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format } from "date-fns";
import { calculatePercentage, cn, formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const mockWatchlist = [
  { stock_code: "", buy: "", target: "", stop_loss: "" },
];

function SortableRow({
  item,
  index,
  editIndex,
  setEditIndex,
  handleDeleteItem,
  handleChange,
}: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.stock_code,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isEdit = editIndex === index;

  const handleNumberInput = (key: string, value: string) => {
    // hanya angka, koma, titik, strip
    const sanitized = value.replace(/[^0-9,.]/g, "");

    handleChange(key, sanitized);
  };

  const handleStockCodeInput = (key: string, value: string) => {
    // hanya huruf
    const sanitized = value.replace(/[^a-zA-Z]/g, "").toUpperCase();

    handleChange(key, sanitized);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group border border-neutral-200 rounded-2xl p-2 bg-white hover:border-[#F97316] transition-all shadow-sm"
    >
      <div className="flex items-center gap-3">
        {/* DRAG HANDLE */}
        <div
          {...attributes}
          {...listeners}
          className="flex items-center justify-center cursor-grab active:cursor-grabbing text-neutral-400 group-hover:text-[#F97316] transition px-1"
        >
          <GripVertical size={20} />
        </div>

        {/* CONTENT */}
        <div className="flex-1 grid grid-cols-4 md:grid-cols-5 gap-3 items-center">
          {/* KODE */}
          <div className="flex justify-start">
            <input
              type="text"
              defaultValue={item.stock_code}
              onChange={(e) =>
                handleStockCodeInput("stock_code", e.target.value)
              }
              disabled={!isEdit}
              placeholder="Kode saham"
              maxLength={6}
              autoComplete="off"
              className={`
                w-full max-w-[110px] h-[40px]
                text-left px-3 rounded-xl border transition uppercase
               
                ${
                  isEdit
                    ? "border-[#F97316] bg-white  text-[11px]"
                    : "border-transparent bg-neutral-50 text-neutral-600 font-[700]  text-[11px]"
                }
              `}
            />
          </div>

          {/* BUY */}
          <div className="flex justify-center">
            <input
              type="text"
              defaultValue={item.buy}
              value={item.buy}
              onChange={(e) => handleNumberInput("buy", e.target.value)}
              disabled={!isEdit}
              placeholder="Harga Beli"
              inputMode="decimal"
              pattern="[0-9,.\-]*"
              className={`
                w-full max-w-[110px] h-[40px]
                text-center px-3 rounded-xl border transition
                text-[12px]
                ${
                  isEdit
                    ? "border-[#F97316] bg-white"
                    : "border-transparent bg-neutral-50 text-neutral-600"
                }
              `}
            />
          </div>

          {/* TARGET */}
          <div className="flex justify-center">
            <input
              type="text"
              defaultValue={item.target}
              value={item.target}
              onChange={(e) => handleNumberInput("target", e.target.value)}
              disabled={!isEdit}
              placeholder="Target jual"
              inputMode="decimal"
              pattern="[0-9,.\-]*"
              className={`
                w-full max-w-[110px] h-[40px]
                text-center px-3 rounded-xl border transition
                text-[12px]
                ${
                  isEdit
                    ? "border-[#F97316] bg-white"
                    : "border-transparent bg-neutral-50 text-neutral-600"
                }
              `}
            />
          </div>

          {/* STOP LOSS */}
          <div className="flex justify-end">
            <input
              type="text"
              defaultValue={item.stop_loss}
              value={item.stop_loss}
              onChange={(e) => handleNumberInput("stop_loss", e.target.value)}
              inputMode="decimal"
              pattern="[0-9,.\-]*"
              disabled={!isEdit}
              placeholder="Cut loss"
              className={`
                w-full max-w-[120px] h-[40px]
                text-center px-3 rounded-xl border transition
                text-[12px]
                ${
                  isEdit
                    ? "border-[#F97316] bg-white"
                    : "border-transparent bg-neutral-50 text-neutral-600"
                }
              `}
            />
          </div>

          {/* ACTION */}
          <div className="hidden md:flex items-center justify-end gap-2">
            {!isEdit && (
              <button
                type="button"
                onClick={() => setEditIndex(index)}
                className="p-2 rounded-xl border border-neutral-200 hover:border-[#F97316] hover:text-[#F97316] transition"
              >
                <Edit2 size={18} />
              </button>
            )}

            {isEdit && (
              <>
                <button
                  type="button"
                  onClick={() => setEditIndex(null)}
                  className="p-2 rounded-xl border border-neutral-200 hover:border-green-500 hover:text-green-600 transition"
                >
                  <Check size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteItem(index)}
                  className="p-2 rounded-xl border border-neutral-200 hover:border-red-500 hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Watchlist_view() {
  const ITEMS_PER_PAGE = 5;
  const [watchlist, setWatchlist] = useState(mockWatchlist);

  const [step, setStep] = useState<"step-1" | "step-2">("step-1");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = watchlist.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(watchlist.length / ITEMS_PER_PAGE);

  const handleAddItem = () => {
    const newItem = {
      stock_code: "",
      buy: "",
      target: "",
      stop_loss: "",
    };

    setWatchlist((prev) => {
      const updated = [...prev, newItem];

      // auto masuk edit mode ke item terakhir
      setEditIndex(updated.length - 1);

      return updated;
    });
  };

  const handleDeleteItem = (index: number) => {
    setWatchlist((prev) => prev.filter((_, i) => i !== index));
    setEditIndex(null);
  };

  const handleChange = (index: number, key: string, value: string) => {
    const newValue = key === "stock_code" ? value.toUpperCase() : value;

    setWatchlist((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [key]: newValue,
      };

      return updated;
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setWatchlist((items) => {
      const oldIndex = items.findIndex((item) => item.stock_code === active.id);

      const newIndex = items.findIndex((item) => item.stock_code === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  return (
    <div className="relative min-h-screen py-12 px-4 overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#f1f5f9]">
      {/* Background */}
      <div className="absolute w-72 h-72 bg-orange-300/30 rounded-full blur-3xl top-[-80px] left-[-80px]" />
      <div className="absolute w-72 h-72 bg-blue-300/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />

      <div className="flex justify-center">
        <div className="max-w-2xl w-full relative">
          {step === "step-1" && (
            <Fragment>
              <div className="bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-xl relative overflow-hidden">
                <section>
                  <div className="flex items-center gap-2 mb-5">
                    <p className="bg-[#F97316] flex w-7 h-7 text-[14px] rounded-full items-center justify-center font-bold text-[#fff]">
                      1
                    </p>

                    <p className="font-bold text-neutral-600 text-[18px]">
                      Informasi Watchlist
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <label className="mb-2 block uppercase text-[12px]">
                        Nama Watchlist
                      </label>

                      <input
                        type="text"
                        onChange={(e) => {
                          if (e.target.value.length <= 35)
                            setTitle(e.target.value);
                        }}
                        value={title}
                        placeholder="Contoh: Saham Potensi Breakout Minggu Ini"
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-orange-400"
                      />

                      <p
                        className={cn(
                          "text-[13px] text-right",
                          title.length === 35
                            ? "text-red-600"
                            : "text-neutral-500"
                        )}
                      >
                        {35 - title.length}/35
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block uppercase text-[12px]">
                        Tanggal Watchlist (Optional)
                      </label>

                      <input
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-orange-400"
                      />

                      <p className="text-[12px] text-neutral-500 mt-1">
                        Tanggal watchlist ini akan digunakan sebagai hari
                        pantauan saham.
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block uppercase text-[12px]">
                        Catatan (Opsional)
                      </label>

                      <textarea
                        rows={2}
                        onChange={(e) => {
                          if (e.target.value.length <= 50)
                            setNote(e.target.value);
                        }}
                        value={note}
                        placeholder="Tambahkan catatan singkat..."
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-orange-400"
                      />

                      <p
                        className={cn(
                          "text-[13px] text-right",
                          note.length === 50
                            ? "text-red-600"
                            : "text-neutral-500"
                        )}
                      >
                        {50 - note.length}/50
                      </p>
                    </div>
                  </div>
                </section>

                <div className="my-6 border-t border-neutral-200" />

                <div className="flex items-center gap-2 mb-7">
                  <p className="bg-[#F97316] flex w-7 h-7 text-[14px] rounded-full items-center justify-center font-bold text-[#fff]">
                    2
                  </p>

                  <p className="font-bold text-neutral-600 text-[18px]">
                    Data Saham
                  </p>
                </div>

                {/* STEP 2 */}
                <div className="space-y-4">
                  {/* HEADER */}
                  <div className="grid grid-cols-4 md:grid-cols-5 gap-3 text-[12px] font-semibold text-neutral-500 mb-2">
                    <div className="flex justify-between">
                      <p className="">Sort</p>
                      <p className="pr-5">Stock</p>
                    </div>
                    <p className="text-center">Entry</p>
                    <p className="text-center">Take Profit</p>
                    <p className="text-right pr-5">Cut Loss</p>
                    <p className="hidden md:block text-right pr-2">Action</p>
                  </div>

                  <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      disabled={editIndex !== null}
                      items={watchlist.map((i) => i.stock_code)}
                      strategy={verticalListSortingStrategy}
                    >
                      {watchlist.map((item, index) => (
                        <SortableRow
                          key={index}
                          item={item}
                          index={index}
                          editIndex={editIndex}
                          setEditIndex={setEditIndex}
                          handleDeleteItem={handleDeleteItem}
                          handleChange={(key: string, value: string) =>
                            handleChange(index, key, value)
                          }
                        />
                      ))}
                    </SortableContext>
                  </DndContext>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 hover:border-[#F97316] hover:text-[#F97316] transition text-sm font-semibold"
                    >
                      <Plus size={16} />
                      Tambah Saham
                    </button>
                  </div>
                </div>

                <div className="my-6 border-t border-neutral-200" />

                {/* ACTION */}

                <section>
                  <button
                    onClick={() => setStep("step-2")}
                    type="button"
                    className="w-full bg-[#F97316] hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
                  >
                    Simpan Watchlist
                  </button>
                </section>
              </div>
            </Fragment>
          )}

          {step === "step-2" && (
            <Fragment>
              <div
                className="
        bg-white 
        rounded-3xl 
        p-8 
        border 
        border-[#E5E7EB] 
        shadow-xl 
        relative 
        overflow-hidden
      "
              >
                {/* subtle gradient glow */}
                <div
                  className="
          absolute 
          -top-24 
          -right-24 
          w-64 
          h-64 
          blur-3xl 
          opacity-20 
          rounded-full 
          pointer-events-none
        "
                  style={{
                    background:
                      "linear-gradient(135deg, #F97316 0%, #FDBA74 100%)",
                  }}
                />

                {/* HEADER */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    {date && (
                      <p className="text-sm text-neutral-500 font-medium">
                        {format(date, "dd MMM yyyy")}
                      </p>
                    )}

                    <h2 className="text-2xl font-bold text-neutral-900 tracking-wide">
                      {title}
                    </h2>

                    {note && (
                      <p className="text-[14px] text-neutral-600 max-w-[520px]">
                        {note}
                      </p>
                    )}
                  </div>

                  {/* WATCHLIST BADGE */}

                  <div
                    className="
            px-4 
            py-1.5 
            rounded-full 
            text-xs 
            font-semibold 
            border
            shadow-sm
          "
                    style={{
                      borderColor: "rgba(249,115,22,0.25)",
                      background: "rgba(249,115,22,0.10)",
                      color: "#F97316",
                    }}
                  >
                    Watchlist
                  </div>
                </div>

                {/* TABLE HEADER */}

                <div
                  className="
          grid 
          grid-cols-4 
          text-sm 
          font-semibold 
          text-gray-500 
          pb-3 
          tracking-wide 
          mt-10
          border-b
        "
                >
                  <p className="pl-3">Stock</p>
                  <p className="text-center">Entry</p>
                  <p className="text-center">Take Profit</p>
                  <p className="text-right pr-5">Cut Loss</p>
                </div>

                {/* ROWS */}

                <div className="space-y-3 min-h-[340px] pt-4">
                  {currentItems.map((item, index) => (
                    <div
                      key={index}
                      className="
              group
              relative
              bg-white
              border
              border-gray-100
              rounded-xl
              px-4
              py-3
              grid
              grid-cols-4
              items-center
              shadow-sm
              transition-all
              duration-200
              hover:shadow-lg
              hover:-translate-y-0.5
              hover:border-orange-200
            "
                    >
                      {/* LEFT ACCENT BAR */}

                      <div
                        className="
                absolute
                left-0
                top-0
                h-full
                w-[4px]
                rounded-l-xl
                opacity-0
                group-hover:opacity-100
                transition
              "
                        style={{
                          background: "linear-gradient(180deg,#F97316,#FDBA74)",
                        }}
                      />

                      {/* STOCK */}

                      <p
                        className="
                font-semibold 
                text-gray-800 
                text-[16px]
                tracking-wide
              "
                      >
                        {item.stock_code}
                      </p>

                      {/* ENTRY */}

                      <p
                        className="
                text-center 
                font-semibold 
                text-gray-700 
                text-[14px]
              "
                      >
                        {formatRupiah(item.buy, {
                          prefix: false,
                        })}
                      </p>

                      {/* TAKE PROFIT */}

                      <div className="text-center">
                        <p
                          className="
                  font-semibold 
                  text-gray-800 
                  text-[14px]
                "
                        >
                          {formatRupiah(item.target, {
                            prefix: false,
                          }) ?? "-"}
                        </p>

                        {item.target && (
                          <p
                            className={cn(
                              "text-[12px] font-semibold mt-0.5",
                              calculatePercentage(item.buy, item.target)
                                ? "text-emerald-600"
                                : "text-red-600"
                            )}
                          >
                            {calculatePercentage(item.buy, item.target, {
                              percentage: true,
                            })}
                          </p>
                        )}
                      </div>

                      {/* STOP LOSS */}

                      <div className="text-right">
                        <p
                          className="
                  font-semibold 
                  text-gray-800 
                  text-[14px]
                "
                        >
                          {formatRupiah(item?.stop_loss, { prefix: false }) ??
                            "-"}
                        </p>

                        {item?.stop_loss && (
                          <p
                            className="
                    text-[12px] 
                    font-semibold 
                    text-red-600 
                    mt-0.5
                  "
                          >
                            {calculatePercentage(item.buy, item.stop_loss, {
                              percentage: true,
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* PAGINATION */}

                <div className="flex justify-center items-center gap-2 mt-10">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="
            w-9 
            h-9 
            flex 
            items-center 
            justify-center
            rounded-xl
            border
            hover:bg-gray-50
            transition
          "
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`
                w-9
                h-9
                text-sm
                font-semibold
                rounded-xl
                border
                transition
                ${
                  currentPage === i + 1
                    ? "bg-orange-500 text-white border-orange-500 shadow-md"
                    : "hover:bg-gray-50"
                }
              `}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="
            w-9 
            h-9 
            flex 
            items-center 
            justify-center
            rounded-xl
            border
            hover:bg-gray-50
            transition
          "
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center mt-5">
                <Button
                  size="lg"
                  className="rounded-lg"
                  variant="link"
                  onClick={() => setStep("step-1")}
                >
                  <ArrowLeft />
                  Sebelumnya
                </Button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default Watchlist_view;
