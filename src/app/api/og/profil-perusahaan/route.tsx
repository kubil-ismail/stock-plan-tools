import { ImageResponse } from "@vercel/og";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ticker = (searchParams.get("ticker") || "").toUpperCase();
  const name = (searchParams.get("name") || "").toUpperCase();
  const sector = (searchParams.get("sector") || "").toUpperCase();
  const industry = (searchParams.get("industry") || "").toUpperCase();

  try {
    const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/images/company/logo/${ticker}.svg`;

    const logoRes = await fetch(logoUrl);
    const logoSvg = await logoRes.text();

    const logoBase64 = `data:image/svg+xml;base64,${btoa(logoSvg)}`;

    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            position: "relative",
            background:
              "linear-gradient(135deg, #f8fafc 0%, #fff7ed 50%, #f1f5f9 100%)",
            fontFamily: "sans-serif",
            padding: "60px",
            boxSizing: "border-box",
          }}
        >
          {/* glow */}
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              background: "rgba(251,146,60,0.25)",
              borderRadius: "9999px",
              filter: "blur(100px)",
              top: -100,
              left: -100,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              background: "rgba(96,165,250,0.25)",
              borderRadius: "9999px",
              filter: "blur(100px)",
              bottom: -100,
              right: -100,
            }}
          />

          {/* content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            {/* top */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 22, color: "#64748b" }}>
                Informasi Perusahaan
              </div>
            </div>

            {/* middle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 40,
              }}
            >
              {/* logo card */}
              <div
                style={{
                  width: 140,
                  height: 140,
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={logoBase64} width={90} height={90} />
              </div>

              {/* text */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontSize: 76,
                    fontWeight: 800,
                    color: "#0f172a",
                    letterSpacing: "-2px",
                  }}
                >
                  {ticker}
                </div>

                <div
                  style={{
                    fontSize: 30,
                    color: "#64748b",
                    marginTop: 8,
                  }}
                >
                  {name}
                </div>

                <div
                  style={{
                    marginTop: 14,
                    display: "flex",
                    gap: 12,
                  }}
                >
                  {/* tag */}
                  <div
                    style={{
                      fontSize: 18,
                      padding: "6px 12px",
                      borderRadius: 999,
                      background: "rgba(15,23,42,0.05)",
                      color: "#475569",
                    }}
                  >
                    {sector}
                  </div>

                  <div
                    style={{
                      fontSize: 18,
                      padding: "6px 12px",
                      borderRadius: 999,
                      background: "rgba(15,23,42,0.05)",
                      color: "#475569",
                    }}
                  >
                    {industry}
                  </div>
                </div>
              </div>
            </div>

            {/* bottom */}
            <div
              style={{
                fontSize: 22,
                color: "#94a3b8",
              }}
            >
              stockplan.id
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(`${err.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
