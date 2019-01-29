export default {
  gjsx: 'Advanced filter',
  reset: 'Reset',
  filter: 'Select',
  PTA: 'PTA member',
  freeSubscription: 'Follow (free)',
  placeholder: '请输入',
  labels: [
    {
      label: '账户评级',
      desc: '账户评级',
      filter: [
        'No limits',
      ],
    },
    {
      label: 'Ability ',
      tips: '交易能力值是通过综合评估交易员在一定周期内的盈利与风控能力、资金规划与绩效稳定性等多重维度的计算结果',
      desc: '备注介绍',
      filter: [
        'No limits',
      ],
    },
    {
      label: 'Subscribers',
      tips: '统计时刻的订阅账户数',
      desc: 'Subscribers',
      filter: [
        'No limits',
        '<',
        'People',
        '人以上',
      ],
    },
    {
      label: 'Equity',
      desc: '备注介绍',
      filter: [
        'No limits',
        '<',
      ],
    },
    {
      tips: '第一笔交易至今的周数',
      label: 'Trading period',
      desc: '备注介绍',
      filter: [
        'No limits',
        '<',
        'Week',
        '周以上',
      ],
    },
    {
      tips: '最大的净值回撤比例',
      label: 'Max retracement ratio',
      desc: '备注介绍',
      filters: [
        'No limits',
        '<',
        '以上',
      ],
    },
    {
      label: 'Return',
      desc: '备注介绍',
      filters: [
        'No limits',
        '<',
        '以上',
      ],
    },
    {
      label: 'Broker',
      desc: '备注介绍',
      filters: [
        'All',
      ],
    },
  ],
};
