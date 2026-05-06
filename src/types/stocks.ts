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

export type StockDetail = {
  id: number;
  ticker: string;
  name: string;
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
  sector: {
    id: number;
    name: string;
  };
  subsector: {
    id: number;
    name: string;
  };
  industry: {
    id: number;
    name: string;
  };
  subindustry: {
    id: number;
    name: string;
  };

  managements: StockManagement[];

  shareholders: {
    id: number;
    company_id: number;
    name: string;
    type: string;
    total: string;
    percentage: string;
    createdAt: string;
    updatedAt: string;
  }[];

  subsidiaries: {
    id: number;
    company_id: number;
    name: string;
    type: string;
    asset: string;
    percentage: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }[];
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
  _4_wk_chg: {
    value: string;
    direction: "+" | "-" | "=";
  };
  _13_wk_chg: {
    value: string;
    direction: "+" | "-" | "=";
  };
  _26_wk_chg: {
    value: string;
    direction: "+" | "-" | "=";
  };
  _52_wk_chg: {
    value: string;
    direction: "+" | "-" | "=";
  };
  npm: string;
  mtd: {
    value: string;
    direction: "+" | "-" | "=";
  };
  ytd: {
    value: string;
    direction: "+" | "-" | "=";
  };
};
