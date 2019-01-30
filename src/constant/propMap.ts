import createI18n from '@/i18n';

const i18n: any = createI18n((window as any).LANG);
const lang = (path: string) => i18n.t(`message.propMap.${path}`);
const mapProps: any = {
  Date: lang('Date'),
  Money: lang('Money'),
  TotalMoney: lang('TotalMoney'),
  TotalSelfMoney: lang('TotalSelfMoney'),
  TotalFollowMoney: lang('TotalFollowMoney'),
  TotalStandardlots: lang('TotalStandardlots'),
  TotalSelfStandardlots: lang('TotalSelfStandardlots'),
  TotalFollowStandardlots: lang('TotalFollowStandardlots'),
  TotalPips: lang('TotalPips'),
  TotalSelfPips: lang('TotalSelfPips'),
  TotalFollowPips: lang('TotalFollowPips'),
  FollowMoney: lang('FollowMoney'),
  Score: lang('Score'),
  ROI: lang('ROI'),
  MaxRetracement: lang('MaxRetracement'),
  Weeks: lang('Weeks'),
  DealAmount: lang('DealAmount'),
  Equity: lang('Equity'),
  ExpSymbol: lang('ExpSymbol'),
  Subscribers: lang('Subscribers'),
  SubPrice: lang('SubPrice'),
  IsPTA: lang('IsPTA'),
  GradeScore: lang('GradeScore'),
};

export default mapProps;
