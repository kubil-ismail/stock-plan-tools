import * as yup from "yup";
import { brokers } from "@/data/brokers";
import { Broker } from "@/types/brokers";
import { StockList } from "@/types/stocks";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RupiahInput } from "@/components/numberinput";
import { Autocomplete } from "@/components/autocomplete";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import { useRef } from "react";
import { useFormik } from "formik";
import companyList from "@/data/company_list.json";
import { ResultData } from "../kalkulator_avarage.view";

const validationSchema = yup.object({
  price: yup
    .string()
    .required("Harga rata-rata wajib diisi")
    .test("is-valid-price", "Harga rata-rata harus lebih dari 0", (value) => {
      if (!value) return false;

      const numeric = Number(value.replace(/\./g, ""));
      return numeric > 0;
    }),
  lot: yup
    .string()
    .required("Jumlah lot wajib diisi")
    .test("is-valid-lot", "Jumlah lot harus lebih dari 0", (value) => {
      if (!value) return false;

      const numeric = Number(value.replace(/\./g, ""));
      return numeric > 0;
    }),
  buy_price: yup
    .string()
    .required("Harga beli wajib diisi")
    .test("is-valid-new-price", "Harga beli harus lebih dari 0", (value) => {
      if (!value) return false;

      const numeric = Number(value.replace(/\./g, ""));
      return numeric > 0;
    }),
  buy_lot: yup
    .string()
    .required("Jumlah lot wajib diisi")
    .test("is-valid-lot", "Jumlah lot harus lebih dari 0", (value) => {
      if (!value) return false;

      const numeric = Number(value.replace(/\./g, ""));
      return numeric > 0;
    }),
  broker: yup
    .object({
      name: yup.string().required("Broker wajib dipilih"),
    })
    .nullable()
    .required("Broker wajib dipilih"),

  stock: yup
    .object({
      name: yup.string().required("Saham wajib dipilih"),
    })
    .nullable()
    .required("Saham wajib dipilih"),
});

export type FormValues = {
  price: number | null;
  lot: number | null;
  buy_price: number | null;
  buy_lot: number | null;
  broker: Broker | null;
  stock: StockList | null;
};

export default function Step_one_view({
  defaultValue,
  handleProcessData,
}: {
  defaultValue: ResultData | null;
  handleProcessData: (values: FormValues) => void;
}) {
  const simulationRef = useRef<HTMLDivElement | null>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      price: defaultValue?.price ?? null,
      lot: defaultValue?.lot ?? null,
      buy_price: defaultValue?.buyPrice ?? null,
      buy_lot: defaultValue?.buyLot ?? null,
      broker: defaultValue?.broker ?? null,
      stock: defaultValue?.stock ?? null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleProcessData(values);
    },
  });

  const handleChange = async (
    name: string,
    value: string | number | Broker | null
  ) => {
    formik.setFieldValue(name, value);
    formik.setFieldTouched(name, true, false);
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-xl">
      {/* Main Card - STEP 1 */}
      <form onSubmit={formik.handleSubmit}>
        <section>
          <div className="flex items-center gap-2 mb-5">
            <p className="bg-[#F97316] flex w-7 h-7 text-[14px] rounded-full items-center justify-center font-bold text-[#fff]">
              1
            </p>

            <p className="font-bold text-neutral-600 text-[18px]">
              Pilih Broker
            </p>
          </div>

          <Autocomplete
            label="Pilih Broker Anda"
            options={brokers}
            value={formik.values.broker}
            onChange={(value) => handleChange("broker", value)}
            placeholder="Pilih Broker Anda..."
          />

          {Boolean(formik.values.broker) && (
            <div className="mt-3 flex gap-2">
              <span className="bg-neutral-100  text-neutral-600 flex items-center gap-1 px-2 p-1 font-[600] rounded-full text-[12px]">
                <BanknoteArrowUp size={20} />
                Fee Beli:{" "}
                <span className="text-green-600">
                  {formik.values.broker?.buyFee ?? ""}%
                </span>
              </span>
              <span className="bg-neutral-100  text-neutral-600 flex items-center gap-1 px-2 p-1 font-[600] rounded-full text-[12px]">
                <BanknoteArrowDown size={20} />
                Fee Jual:{" "}
                <span className="text-red-600">
                  {formik.values.broker?.sellFee}%
                </span>
              </span>
            </div>
          )}

          {formik.touched.broker && Boolean(formik.errors.broker) && (
            <p className="text-[11px] text-red-400 mt-1 transition-all duration-200">
              {formik.errors.broker}
            </p>
          )}
        </section>

        <div className="my-6">
          <Separator />
        </div>

        <section>
          <div className="flex items-center gap-2 mb-5">
            <p className="bg-[#F97316] flex w-7 h-7 text-[14px] rounded-full items-center justify-center font-bold text-[#fff]">
              2
            </p>

            <p className="font-bold text-neutral-600 text-[18px]">
              Posisi saat ini
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <Autocomplete
                label="Pilih Saham"
                options={companyList.data}
                variant="stocks"
                value={formik.values.stock}
                onChange={(value) => handleChange("stock", value)}
                placeholder="Pilih saham anda..."
              />

              {formik.touched.stock && Boolean(formik.errors.stock) && (
                <p className="text-[11px] text-red-400 mt-1 transition-all duration-200">
                  {formik.errors.stock}
                </p>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="mb-2 block uppercase text-[12px]">
                Harga Rata-Rata
              </label>

              <RupiahInput
                placeholder="Masukan harga rata-rata"
                value={formik.values.price}
                onChange={(value) => handleChange("price", value)}
                error={formik.touched.price && Boolean(formik.errors.price)}
              />

              {formik.touched.price && Boolean(formik.errors.price) && (
                <p className="text-[11px] text-red-400 mt-1 transition-all duration-200">
                  {formik.errors.price}
                </p>
              )}
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="mb-2 block uppercase text-[12px]">
                Total Lot Saat Ini
              </label>

              <RupiahInput
                disablePrefix
                placeholder="Masukan total lot saat ini"
                value={formik.values.lot}
                onChange={(value) => handleChange("lot", value)}
                error={formik.touched.lot && Boolean(formik.errors.lot)}
              />

              {formik.touched.lot && Boolean(formik.errors.lot) && (
                <p className="text-[11px] text-red-400 mt-1 transition-all duration-200">
                  {formik.errors.lot}
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="my-6">
          <Separator />
        </div>

        <section ref={simulationRef}>
          <div className="flex items-center gap-2 mb-5">
            <p className="bg-[#F97316] flex w-7 h-7 text-[14px] rounded-full items-center justify-center font-bold text-[#fff]">
              3
            </p>

            <p className="font-bold text-neutral-600 text-[18px]">
              Beli Saham Baru
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2 md:col-span-1">
              <label className="mb-2 block uppercase text-[12px]">
                Harga Beli
              </label>

              <RupiahInput
                placeholder="Masukan harga beli"
                value={formik.values.buy_price}
                onChange={(value) => handleChange("buy_price", value)}
                error={
                  formik.touched.buy_price && Boolean(formik.errors.buy_price)
                }
              />

              {formik.touched.buy_price && Boolean(formik.errors.buy_price) && (
                <p className="text-[11px] text-red-400 mt-1 transition-all duration-200">
                  {formik.errors.buy_price}
                </p>
              )}
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="mb-2 block uppercase text-[12px]">
                Total Lot
              </label>

              <RupiahInput
                disablePrefix
                placeholder="Masukan total lot"
                value={formik.values.buy_lot}
                onChange={(value) => handleChange("buy_lot", value)}
                error={formik.touched.buy_lot && Boolean(formik.errors.buy_lot)}
              />

              {formik.touched.buy_lot && Boolean(formik.errors.buy_lot) && (
                <p className="text-[11px] text-red-400 mt-1 transition-all duration-200">
                  {formik.errors.buy_lot}
                </p>
              )}
            </div>
          </div>

          <Button
            size="lg"
            className="w-full font-bold mt-6"
            type="submit"
            //   onClick={() => handleProcessData()}
          >
            Hitung Simulasi
          </Button>
        </section>
      </form>
    </div>
  );
}
