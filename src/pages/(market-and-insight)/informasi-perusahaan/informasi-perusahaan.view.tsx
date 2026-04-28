import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyLogo from "@/components/companyLogo";
import { Badge } from "@/components/ui/badge";

interface Props {}

function Informasi_perusahaan_view(props: Props) {
  const {} = props;

  return (
    <div className="relative min-h-screen py-12 px-4 overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#fff7ed] to-[#f1f5f9]">
      {/* Background */}
      <div className="absolute w-72 h-72 bg-orange-300/30 rounded-full blur-3xl top-[-80px] left-[-80px]" />
      <div className="absolute w-72 h-72 bg-blue-300/30 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />

      <div className="max-w-7xl mx-auto relative">
        <p className="text-2xl font-bold mb-4 text-[#2A2826]">
          Informasi Perusahaan
        </p>
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon-sm">
            <Calendar />
          </Button>
          <Button variant="outline" size="icon-sm">
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="icon-sm">
            <ChevronRight />
          </Button>
          <p className="text-xl font-bold text-[#2A2826] ml-2">3 May 2026</p>
        </div>

        <Tabs defaultValue="semua" className="w-full">
          <TabsList variant="line">
            <TabsTrigger value="semua">Semua</TabsTrigger>
            <TabsTrigger value="aksi_korporasi">Aksi Korporasi</TabsTrigger>
            <TabsTrigger value="kalender_perusahaan">
              Kalender Perusahaan
            </TabsTrigger>
            <TabsTrigger value="notasi_khusus">Notasi Khusus</TabsTrigger>
            <TabsTrigger value="papan_pemantauan">Papan Pemantauan</TabsTrigger>
          </TabsList>
          <TabsContent value="semua" className="pt-4 grid md:grid-cols-2 gap-4">
            <Aksi_korporasi_card />
          </TabsContent>
          <TabsContent
            value="aksi_korporasi"
            className="pt-4 grid md:grid-cols-2 gap-4"
          >
            {[...new Array(10)].map((_, index) => (
              <Aksi_korporasi_card key={index} />
            ))}
          </TabsContent>
          <TabsContent value="kalender_perusahaan" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>
                  Generate and download your detailed reports. Export data in
                  multiple formats for analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                You have 5 reports ready and available to export.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notasi_khusus" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and options. Customize your
                  experience to fit your needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Configure notifications, security, and themes.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="papan_pemantauan" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and options. Customize your
                  experience to fit your needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Configure notifications, security, and themes.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Aksi_korporasi_card(props: Props) {
  return (
    <Card>
      <CardContent className="text-sm flex gap-3">
        <CompanyLogo
          company={{
            logo: "Portals/0/StaticData/ListedCompanies/LogoEmiten/AALI.jpg",
          }}
        />

        <div className="space-y-0.5 w-full">
          <div className="flex justify-between items-center">
            <p className="text-[19px] font-semibold text-foreground">CYBR</p>

            <Badge variant="outline">Aksi Korporasi</Badge>
          </div>

          <p className="text-muted-foreground mb-4">Waran</p>
          <p>
            Aksi Korporasi:
            <span className="font-medium"> 315.610.920.000</span>
          </p>

          <p>
            Total:
            <span className="font-semibold"> 407.091.703.837</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Informasi_perusahaan_view;
