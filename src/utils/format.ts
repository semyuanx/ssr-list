import numeral from 'numeral';

export const numberFormat = function numberFormat(val: string|number, format: number = 2) {
  if (!val) {
    return 0;
  }
  if (format < 1) return val;
  const v = numeral(val);

  let type = Array(format + 1).fill(0).join('');

  type = `0.[${type}]`;
  const transformed = v.format(type);
  return transformed ? transformed.slice(0, transformed.length - 1) : val;
};
export const percentFormat = function percentFormat(val: string|number, format: number = 2) {
  if (!val) {
    return '0%';
  }
  if (format < 1) return numeral(val).format('0%');
  const v = numeral(val);

  let type = Array(format).fill(0).join('');

  type = `0.${type}%`;
  const transformed = v.format(type);
  return transformed && transformed.includes('NaN') ? '0%' : transformed;
};

export const propFormat = function propFormat(val: string | number, prop: string) {
  const percentKeys = ['ROI'];
  const dotKeys = [
    'Equity', 'DealAmount', 'MaxRetracement',
    'TotalStandardlots', 'TotalSelfStandardlots',
    'TotalFollowStandardlots', 'TotalPips',
    'TotalSelfPips', 'TotalFollowPips',
    'Score', '',
  ];
  const moneyKeys = [
    'Money', 'TotalMoney', 'TotalSelfMoney',
    'TotalFollowMoney', 'FollowMoney',
  ];
  if (percentKeys.includes(prop)) {
    return percentFormat(val);
  } if (dotKeys.includes(prop)) {
    return numberFormat(val);
  } if (moneyKeys.includes(prop)) {
    return val;
  }
  return val;
};

export const none = () => {};
