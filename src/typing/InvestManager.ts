export interface Welcome {
  total: number;
  pageIndex: number;
  pageSize: number;
  lastUpdateTime: string;
  items: Item[];
}

export interface Item {
  ID: number;
  Name: string;
  Description: string;
  Status: string;
  ProfitMode: ProfitMode;
  RetreatMode: RetreatMode;
  MinFollowBalance: number;
  FollowerMaxRisk: number;
  ExpectROI: number;
  ExpectTraderProfit: number;
  ExpectFollowerProfit: number;
  ExpectFollowerCount: number;
  ExpectDays: number;
  ExpectStartTime: string;
  ExpectEndTime: string;
  StartTime: string;
  EndTime: string;
  CreateTime: string;
  IsShowHistoryOrder: boolean;
  Balance: number;
  Equity: number;
  FollowerCount: number;
  ROI: number;
  Profit: number;
  FollowerProfit: number;
  PositionOrders: number;
  PositionSTDLots: number;
  Trader: Trader;
}

export interface ProfitMode {
  TakeProfitRatio: number;
  StopLossRatio: number;
}

export interface RetreatMode {
  MaxRetreatRatio: number;
  StopOutRatio: number;
}

export interface Trader {
  Type: string;
  UserID: number;
  Nickname: string;
  AccountIndex: number;
  Broker: string;
  BrokerID: number;
  BrokerName: string;
  Signature: string;
  JoinBalance: number;
  ExitBalance: number;
  JoinTime: string;
  ExitTime: string;
  ExitReason: string;
  Summary: Summary;
}

export interface Summary {
  ProductCount: number;
  WinProductCount: number;
  Profit: number;
  AverageROI: number;
  Balance: number;
  FollowerCount: number;
  FollowerProfit: number;
  ProductProfit: number;
  ProductPassRate: number;
}
