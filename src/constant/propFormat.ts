import createI18n from '@/i18n';

const i18n: any = createI18n((window as any).LANG);
const lang = (path: string) => i18n.t(`message.propFormat.${path}`);
export const needHighlight = [
  'ROI',
  'Roi',
  'Money',
  'TotalMoney',
  'TotalSelfMoney',
  'TotalFollowMoney',
  'FollowMoney',
];
export const suffixProps: any = {
  Weeks: lang('Week') || '周',
  DealAmount: lang('Order') || '笔',
};

export default {
  needHighlight,
  suffixProps,
};
