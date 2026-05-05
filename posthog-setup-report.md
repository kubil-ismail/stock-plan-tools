<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Stockplan Next.js App Router project.

## Summary of changes

- **`instrumentation-client.ts`** (new) — Initializes PostHog client-side via the recommended Next.js 15.3+ `instrumentation-client` file. Uses a reverse proxy (`/ingest`) for reliability, enables exception capture, and runs in debug mode in development.
- **`next.config.ts`** — Added reverse proxy rewrites (`/ingest/*` and `/ingest/static/*`, `/ingest/array/*`) so PostHog requests route through your own domain, improving deliverability past ad blockers.
- **`.env.local`** — Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.
- **`src/pages/home/home.view.tsx`** — Added `"use client"` directive and PostHog capture for feature card clicks (`home_feature_clicked`) and contact email CTA clicks (`contact_email_clicked`).
- **`src/pages/(tools-and-simulator)/kalkulator-average/kalkulator_avarage.view.tsx`** — Tracks when a user runs the average price calculation (`kalkulator_average_calculated`) with key properties (stock code, broker, old/new avg, percent change, BEP) and when they go back to recalculate (`kalkulator_average_recalculated`).
- **`src/pages/(tools-and-simulator)/watchlist/watchlist.view.tsx`** — Tracks watchlist saved (`watchlist_saved`), stock added (`watchlist_stock_added`), and stock deleted (`watchlist_stock_deleted`).
- **`src/pages/(market-and-insight)/profil-perusahaan/profil-perusahaan.view.tsx`** — Tracks company profile searches on input blur (`company_profile_searched`) and load-more clicks (`company_profile_load_more_clicked`).
- **`src/pages/(market-and-insight)/kepemilikan-saham/kepemilikan_saham.view.tsx`** — Tracks shareholder searches on input blur (`shareholder_searched`) and load-more clicks (`shareholder_load_more_clicked`).
- **`src/pages/(market-and-insight)/informasi-perusahaan/informasi-perusahaan.view.tsx`** — Tracks date navigation (`informasi_perusahaan_date_changed`) and tab switches (`informasi_perusahaan_tab_viewed`).

## Events

| Event Name | Description | File |
|---|---|---|
| `home_feature_clicked` | User clicks a feature card on the home page | `src/pages/home/home.view.tsx` |
| `contact_email_clicked` | User clicks the contact email CTA | `src/pages/home/home.view.tsx` |
| `kalkulator_average_calculated` | User submits the average price calculator and receives results | `src/pages/(tools-and-simulator)/kalkulator-average/kalkulator_avarage.view.tsx` |
| `kalkulator_average_recalculated` | User returns to step 1 to recalculate | `src/pages/(tools-and-simulator)/kalkulator-average/kalkulator_avarage.view.tsx` |
| `watchlist_saved` | User saves a watchlist (proceeds to preview step) | `src/pages/(tools-and-simulator)/watchlist/watchlist.view.tsx` |
| `watchlist_stock_added` | User adds a stock row to the watchlist | `src/pages/(tools-and-simulator)/watchlist/watchlist.view.tsx` |
| `watchlist_stock_deleted` | User deletes a stock from the watchlist | `src/pages/(tools-and-simulator)/watchlist/watchlist.view.tsx` |
| `company_profile_searched` | User searches for a company in Profil Perusahaan | `src/pages/(market-and-insight)/profil-perusahaan/profil-perusahaan.view.tsx` |
| `company_profile_load_more_clicked` | User clicks load more in Profil Perusahaan | `src/pages/(market-and-insight)/profil-perusahaan/profil-perusahaan.view.tsx` |
| `shareholder_searched` | User searches in Kepemilikan Saham | `src/pages/(market-and-insight)/kepemilikan-saham/kepemilikan_saham.view.tsx` |
| `shareholder_load_more_clicked` | User clicks load more in Kepemilikan Saham | `src/pages/(market-and-insight)/kepemilikan-saham/kepemilikan_saham.view.tsx` |
| `informasi_perusahaan_date_changed` | User navigates to a different date in Informasi Perusahaan | `src/pages/(market-and-insight)/informasi-perusahaan/informasi-perusahaan.view.tsx` |
| `informasi_perusahaan_tab_viewed` | User switches tabs in Informasi Perusahaan | `src/pages/(market-and-insight)/informasi-perusahaan/informasi-perusahaan.view.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/408867/dashboard/1541187
- **Feature Usage Trends** (daily trend of all key actions): https://us.posthog.com/project/408867/insights/6fJAq9WB
- **Calculator Conversion Funnel** (home click → calculation → recalculation): https://us.posthog.com/project/408867/insights/wdiAwt8K
- **Top Features Clicked on Home** (breakdown by feature title): https://us.posthog.com/project/408867/insights/MR4SJ63R
- **Watchlist Creation Funnel** (home click → add stock → save watchlist): https://us.posthog.com/project/408867/insights/Ym38HJ7C
- **Contact Email Clicks** (intent signal trend): https://us.posthog.com/project/408867/insights/s8LRJzYd

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
