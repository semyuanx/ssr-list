/* eslint-disable */
export const getChartData = function getChartData(moneyList, type) {
  if (!moneyList) return;
  const array = moneyList;
  const value = [];
  array.forEach((element) => {
    if (type === 'xAxis') {
      value.push(element.TotalMoney);
    } else {
      const date = new Date(element.Date * 1000);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
      const day = (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate());
      const dataStr = `${year}${month}${day}`;
      value.push(dataStr);
    }
  });
  return value;
};

export const none = () => {};