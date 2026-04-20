"use client";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Edit2,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";
import React, { Fragment, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

export const mockWatchlist = [
  { stock_code: "", buy: "", target: "", stop_loss: "" },
  { stock_code: "", buy: "", target: "", stop_loss: "" },
  { stock_code: "", buy: "", target: "", stop_loss: "" },
];

function SortableRow({
  item,
  index,
  editIndex,
  setEditIndex,
  handleDeleteItem,
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
              disabled={!isEdit}
              placeholder="Kode saham"
              className={`
                w-full max-w-[110px] h-[40px]
                text-left px-3 rounded-xl border transition
               
                ${
                  isEdit
                    ? "border-[#F97316] bg-white  text-[12px]"
                    : "border-transparent bg-neutral-50 text-neutral-600 font-[700]  text-[12px]"
                }
              `}
            />
          </div>

          {/* BUY */}
          <div className="flex justify-center">
            <input
              type="text"
              defaultValue={item.buy}
              disabled={!isEdit}
              placeholder="Harga Beli"
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
              disabled={!isEdit}
              placeholder="Target harga"
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
              disabled={!isEdit}
              placeholder="Stop loss"
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
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const totalPages = Math.ceil(mockWatchlist.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = mockWatchlist.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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
          <div className="bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-xl relative overflow-hidden">
            {step === "step-1" && (
              <Fragment>
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
                        Judul Watchlist
                      </label>

                      <input
                        type="text"
                        placeholder="Contoh: Asing + Bandar Akum"
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-orange-400"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block uppercase text-[12px]">
                        Tanggal Watchlist
                      </label>

                      <input
                        type="date"
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-orange-400"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block uppercase text-[12px]">
                        Catatan
                      </label>

                      <textarea
                        rows={3}
                        placeholder="Tambahkan catatan singkat..."
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-orange-400"
                      />
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
                      <p className="pr-5">Kode</p>
                    </div>
                    <p className="text-center">Buy</p>
                    <p className="text-center">Target</p>
                    <p className="text-right pr-5">Stop Loss</p>
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
                          key={item.stock_code}
                          item={item}
                          index={index}
                          editIndex={editIndex}
                          setEditIndex={setEditIndex}
                          handleDeleteItem={handleDeleteItem}
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
                    onClick={() => setStep('step-2')}
                    type="button"
                    className="w-full bg-[#F97316] hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
                  >
                    Simpan Watchlist
                  </button>
                </section>
              </Fragment>
            )}

            {step === "step-2" && (
              <Fragment>
                {/* HEADER */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">10 Maret 2026</p>

                    <h2 className="text-2xl font-bold text-neutral-900 tracking-wide">
                      Asing + Bandar Akum
                    </h2>

                    <p className="text-[14px] text-neutral-600">
                      Stockpick ini dipengaruhi info Dar Der Dor akhir pekan ini
                    </p>
                  </div>

                  <div
                    className="px-3 py-1 rounded-full text-xs font-medium border"
                    style={{
                      borderColor: "rgba(249,115,22,0.25)",
                      background: "rgba(249,115,22,0.08)",
                      color: "#F97316",
                    }}
                  >
                    Watchlist
                  </div>
                </div>

                {/* TABLE HEADER */}
                <div className="grid grid-cols-4 text-sm font-semibold text-gray-500 pb-3 tracking-wide mt-10">
                  <p className="pl-3">Kode</p>
                  <p className="text-center">Buy</p>
                  <p className="text-center">Target</p>
                  <p className="text-right pr-5">Stop Loss</p>
                </div>

                {/* ROWS */}
                <div className="space-y-4 min-h-[340px]">
                  {currentItems.map((item) => (
                    <div
                      key={item.stock_code}
                      className="shadow-xs bg-white/50 border border-white/40 rounded-xl px-4 py-3 grid grid-cols-4 items-center hover:bg-white/80 hover:shadow-lg hover:-translate-y-0.5 hover:border-orange-200 transition-all duration-200"
                    >
                      <p className="font-semibold text-gray-700 text-[16px]">
                        {item.stock_code}
                      </p>

                      <p className="text-center font-medium text-gray-700 text-[14px]">
                        {item.buy}
                      </p>

                      <div className="text-center">
                        <p className="font-medium text-gray-700 text-[14px]">
                          {item.target}
                        </p>

                        <p className="text-[12px] font-semibold text-emerald-600">
                          +8.5% - 9%
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-medium text-gray-700 text-[14px]">
                          {item.stop_loss}
                        </p>

                        <p className="text-[12px] font-semibold text-red-600">
                          -5%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PAGINATION */}
                <div className="flex justify-center items-center gap-2 mt-8">
                  {/* Previous */}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="px-2 py-2 text-sm rounded-lg border hover:bg-gray-50 transition"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Page numbers */}

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1.5 text-sm rounded-lg border transition
                    ${
                      currentPage === i + 1
                        ? "bg-orange-500 text-white border-orange-500"
                        : "hover:bg-gray-50"
                    }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  {/* Next */}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="px-2 py-2 text-sm rounded-lg border hover:bg-gray-50 transition"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watchlist_view;
