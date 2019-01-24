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
  if (transformed) {
    if (transformed.includes('.')) {
      const split = transformed.split('.');
      if (split[1] && split[1].length <= format) {
        return transformed;
      }
    }
    return transformed.includes('.') ? transformed.slice(0, transformed.length - 1) : transformed;
  }
  return val;
};
export const moneyFormat = function moneyFormat(val: string|number, format: number = 2) {
  if (!val) {
    return 0;
  }
  if (format < 1) return val;
  const v = numeral(val);

  let type = Array(format + 1).fill(0).join('');

  type = `$0.[${type}]`;
  const transformed = v.format(type);
  if (transformed) {
    if (transformed.includes('.')) {
      const split = transformed.split('.');
      if (split[1] && split[1].length <= format) {
        return transformed;
      }
    }
    return transformed.includes('.') ? transformed.slice(0, transformed.length - 1) : transformed;
  }
  return val;
};
export const percentFormat = function percentFormat(val: string|number, format: number = 2, simple: boolean = false) {
  if (!val) {
    return '0%';
  }
  if (format < 1) return numeral(val).format('0%');
  const v = numeral(val);

  let type = Array(format + 1).fill(0).join('');
  if (!simple) {
    type = `0.${type}%`;
  } else {
    type = `0.[${type}]%`;
  }
  const transformed: string = v.format(type);
  if (transformed && !transformed.includes('NaN')) {
    if (transformed.includes('.')) {
      const noPercentTransformed = transformed.replace(/%$/, '');
      const split: any = noPercentTransformed.split('.');
      if (split[1] && split[1].length <= format) {
        return transformed;
      } if (!split[1]) {
        return transformed;
      } if (split[1] && split[1].length > format) {
        const merged = noPercentTransformed.slice(0, noPercentTransformed.length - 1);
        return `${merged}%`;
      }
    }
  }
  return transformed && transformed.includes('NaN') ? '0%' : transformed;
};

export const propFormat = function propFormat(val: string | number, prop: string) {
  const percentKeys = ['ROI', 'Roi', 'MaxRetracement'];
  const dotKeys = [
    'Equity', 'DealAmount', 'MaxRetracement',
    'TotalStandardlots', 'TotalSelfStandardlots',
    'TotalFollowStandardlots', 'TotalPips',
    'TotalSelfPips', 'TotalFollowPips',
    'Score', 'AveragePips', 'Pips',
  ];
  const moneyKeys = [
    'Money', 'TotalMoney', 'TotalSelfMoney',
    'TotalFollowMoney', 'FollowMoney', 'FollowMoney',
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

export const timeFormat = function timeFormat(val: any, format = '00:00:00') {
  if (!val) return format;
  return numeral(val).format(format);
};

export const gradeFormat = function gradeFormat(val: any) {
  if (!val) {
    return 'D';
  }
  let grade = 'D';
  if (val >= 9) {
    grade = 'S';
  } else if (val >= 8 && val < 9) {
    grade = 'A+';
  } else if (val >= 7 && val < 8) {
    grade = 'A';
  } else if (val >= 6 && val < 7) {
    grade = 'A-';
  } else if (val >= 5 && val < 6) {
    grade = 'B';
  } else if (val >= 4 && val < 5) {
    grade = 'C';
  } else {
    grade = 'D';
  }
  return grade;
};


export const processConfig = function processConfig(CondCfg: any) {
  let params: any = {};
  const dotToPercent = ['Roi', 'ROI', 'MaxRetracement'];
  if (CondCfg) {
    const { CondConfig } = CondCfg;
    const isDESC = CondCfg.OrderBy ? 1 : 0;
    const orderby = CondCfg.OrderByName;
    if (orderby) {
      params = { ...params, ...{ isDESC, orderby } };
    }
    if (CondConfig) {
      Object.keys(CondConfig).forEach((i: any) => {
        const filter: any = CondConfig[i];

        if (typeof filter !== 'undefined' || filter !== null) {
          if (Object.prototype.toString.call(filter) === '[object Object]') {
            if (filter) {
              if (filter.Min || filter.Max) {
                if (dotToPercent.includes(i)) {
                  if (i === 'MaxRetracement') {
                    params.Retracement = [filter.Min * 100, filter.Max * 100].join('-');
                  } else {
                    params[i] = [filter.Min * 100, filter.Max * 100].join('-');
                  }
                } else {
                  params[i] = [filter.Min, filter.Max].join('-');
                }
              }
            }
          } else if (Array.isArray(filter)) {
            console.log(' no', i);
            if (i === 'BrokerID') {
              params.brokerId = filter;
            } else {
              params[i] = filter;
            }
          } else if (typeof filter === 'boolean') {
            if (i === 'IsPTA') {
              params.isPTA = filter ? 1 : 0;
            } else if (i === 'FreeSubPrice') {
              params.freeSubPrice = filter ? 1 : 0;
            } else {
              params[i] = filter;
            }
          } else {
            params[i] = filter;
          }
        }
      });
    }
  }
  console.log(params, '*************&&&&&&&&&&&&&&');
  return params;
};
