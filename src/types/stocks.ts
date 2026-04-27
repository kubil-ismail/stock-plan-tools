export type StockList = {
  code: string;
  name: string;
  listing_date: string;
};

export type StockDetail = {
  id: string;
  ticker: string;
  name: string;
  logo: string;
  office_address: string;
  email: string;
  phone: string;
  fax: string;
  tin: string;
  website: string;
  listing_date: Date;
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

  managements: {
    id: number;
    company_id: number;
    name: string;
    type: string;
    position: string;
    phone: string;
    email: string;
    is_affiliated: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }[];

  shareholders: {
    id: number;
    company_id: number;
    name: string;
    type: string;
    total: string;
    percentage: string;
    createdAt: Date;
    updatedAt: Date;
  }[];

  subsidiaries: {
    id: number;
    company_id: number;
    name: string;
    type: string;
    asset: string;
    percentage: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }[];
};
