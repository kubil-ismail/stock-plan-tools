"use client";

import { Building2, Calendar, LineChart } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export function TabsIcons() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const search = useSearchParams();

  const value = search?.get("tabs") ?? "profil-perusahaan";

  return (
    <Tabs
      value={value}
      onValueChange={(val) =>
        router.push(`/profil-perusahaan/${params?.slug}?tabs=${val}`)
      }
    >
      <TabsList className="rounded-3xl w-full flex overflow-x-auto no-scrollbar md:grid md:grid-cols-3">
        {/* PROFIL */}
        <TabsTrigger
          value="profil-perusahaan"
          className="group flex items-center gap-2 whitespace-nowrap px-4 text-gray-500 data-[state=active]:text-orange-500 rounded-3xl"
        >
          <Building2
            size={18}
            className="transition-colors text-gray-400 group-data-[state=active]:text-orange-500"
          />
          <span className="hidden sm:inline">Profil Perusahaan</span>
          <span className="sm:hidden">Profil</span>
        </TabsTrigger>

        {/* KINERJA */}
        {/* <TabsTrigger
          value="kinerja-saham"
          className="group flex items-center gap-2 whitespace-nowrap px-4 text-gray-500 data-[state=active]:text-orange-500 rounded-3xl"
        >
          <LineChart
            size={18}
            className="transition-colors text-gray-400 group-data-[state=active]:text-orange-500"
          />
          <span className="hidden sm:inline">Kinerja Saham</span>
          <span className="sm:hidden">Kinerja</span>
        </TabsTrigger> */}

        {/* AKSI KORPORASI */}
        <TabsTrigger
          value="aksi-korporasi"
          className="group flex items-center gap-2 whitespace-nowrap px-4 text-gray-500 data-[state=active]:text-orange-500 rounded-3xl"
        >
          <Calendar
            size={18}
            className="transition-colors text-gray-400 group-data-[state=active]:text-orange-500"
          />
          <span className="hidden sm:inline">Aksi Korporasi</span>
          <span className="sm:hidden">Aksi</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
