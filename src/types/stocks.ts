export type StockList = {
  code: string;
  name: string;
  listing_date: string;
};

export type StockManagement = {
  id: number;
  company_id: number;
  name: string;
  type: string;
  position: string;
  phone: string;
  email: string;
  is_affiliated: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type StockBusinessField = {
  raw_business: string;
  business_summary: string;
  business_tags: string[];
  business_keywords: string[];
};

export type StockSector = {
  id: number;
  name: string;
};

export type StockSubSector = {
  id: number;
  name: string;
  sector_id?: number;
};

export type StockIndustry = {
  id: number;
  name: string;
};

export type StockSubIndustry = {
  id: number;
  name: string;
  industries_id?: number;
};

export type StockTechnicalChange = {
  value: string;
  direction: "+" | "-" | "=";
};

export type StockTechnical = {
  Nama_Perusahaan: string;
  Kode_Saham: string;
  Kode_SubIndustri: string;
  Sektor: string;
  Subsektor: string;
  Idustri: string;
  Subindustri: string;
  Index: string;
  Per: string;
  Pbv: string;
  Roe: string;
  Roa: string;
  Der: string;
  Mkt_Cap: string;
  Total_Rev: string;

  _4_wk_chg: StockTechnicalChange;
  _13_wk_chg: StockTechnicalChange;
  _26_wk_chg: StockTechnicalChange;
  _52_wk_chg: StockTechnicalChange;

  npm: string;

  mtd: StockTechnicalChange;
  ytd: StockTechnicalChange;
};

export type StockShareholder = {
  id?: number;
  company_id?: number;
  name: string;
  type: string;
  total?: string;
  shares?: number;
  percentage: string | number;
  createdAt?: string;
  updatedAt?: string;
};

export type StockSubsidiary = {
  id?: number;
  company_id?: number;
  name: string;
  type?: string;
  business_type?: string;
  asset?: string;
  total_assets?: number;
  percentage?: string;
  ownership_percentage?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

export type StockPublicAccountant = {
  name: string;
};

export type StockCorporateSecretary = {
  name: string;
  email: string;
  phone: string;
};

export type StockDetail = {
  id: number;
  ticker: string;
  name: string;
  company_name?: string;
  logo: string;
  office_address: string;
  email: string;
  phone: string;
  fax: string;
  tin: string;
  website: string;
  listing_date: string;
  listing_board: string;
  main_business: string;

  sector: StockSector;
  sub_sector: StockSubSector;
  industry: StockIndustry;
  sub_industry: StockSubIndustry;

  managements: StockManagement[];

  shareholders: StockShareholder[];

  subsidiaries: StockSubsidiary[];

  business_field?: StockBusinessField;

  // tambahan v2 tanpa ganggu existing
  corporate_secretary?: StockCorporateSecretary;
  public_accountants?: StockPublicAccountant[];
  technical?: StockTechnical;
  scraped_at?: string;
};

export type StockDetailV2 = {
  ticker: string;
  company_name: string;
  listed_at: string;
  listing_board: string;

  business_field: StockBusinessField;

  industry: StockIndustry;

  sub_industry: {
    id: number;
    name: string;
    industries_id: number;
  };

  sector: StockSector;

  sub_sector: {
    id: number;
    name: string;
    sector_id: number;
  };

  // tambahan baru
  office_address?: string;
  email?: string;
  phone?: string;
  fax?: string;
  website?: string;

  corporate_secretary?: StockCorporateSecretary;

  shareholders?: StockShareholder[];

  subsidiaries?: StockSubsidiary[];

  public_accountants?: StockPublicAccountant[];

  technical?: StockTechnical;

  scraped_at?: string;
};

// V2

export interface JSONResponse<T> {
  total: number;
  data: T;
}

export interface ApilResponse<T> {
  status: boolean;
  data: T;
}

export interface StockDirectors {
  name: string;
  position: string;
  affiliated: boolean;
}

export interface StockSubsidiaries {
  name: string;
  business_type: string;
  total_assets: number;
  ownership_percentage: number;
}

export interface StockListResponse {
  ticker: string;
  company_name: string;
  listed_at: string;
  listing_board: string;
  business_field: {
    raw_business: string;
    business_summary: string;
    business_tags: string[];
    business_keywords: string[];
  };
  sector: StockSector;
  sub_sector: StockSubSector;
  industry: StockIndustry;
  sub_industry: StockSubIndustry;
}

export interface StockDetailResponse {
  company_name: string;
  ticker: string;
  office_address: string;
  email: string;
  phone: string;
  fax: string;
  tax_id: string;
  website: string;
  listing_date: string;
  listing_board: string;

  business_field: {
    raw_business: string;
    business_summary: string;
    business_tags: string[];
    business_keywords: string[];
  };

  sector: StockSector;
  sub_sector: StockSubSector;
  industry: StockIndustry;
  sub_industry: StockSubIndustry;

  corporate_secretary: StockCorporateSecretary;

  directors: StockDirectors[];
  commissioners: { name: string; position: string; affiliated: boolean }[];
  audit_committee: { name: string; position: string }[];

  shareholders: {
    name: string;
    type: string;
    shares: number;
    percentage: number;
  }[];
  subsidiaries: StockSubsidiaries[];
  public_accountants: { name: string }[];

  technical: {
    per: string;
    pbv: string;
    roe: string;
    roa: string;
    der: string;
    mkt_cap: string;
    total_rev: string;

    _4_wk_chg: { value: string; direction: "+" | "-" };
    _13_wk_chg: { value: string; direction: "+" | "-" };
    _26_wk_chg: { value: string; direction: "+" | "-" };
    _52_wk_chg: { value: string; direction: "+" | "-" };

    npm: string;

    mtd: { value: string; direction: "+" | "-" };
    ytd: { value: string; direction: "+" | "-" };
  };

  scraped_at: string;
}

export interface ShareholderResponse {
  name: string;
  slug: string;
  category: string;
  total_company: number;
  summary: {
    shareholder: number;
    director: number;
    commissioner: number;
  };
  roles: string[];
  companies: {
    ticker: string;
    name: string;
    roles: string[];
    shareholder: {
      percentage: number;
      shares: number;
      type: string;
    } | null;
    director: {
      title?: string;
    } | null;
    commissioner: {
      title?: string;
    } | null;
  }[];
  keywords: string[];
}
