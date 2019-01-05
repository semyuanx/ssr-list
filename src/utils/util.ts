export function isColor(value: string): boolean {
  const colorReg: RegExp = /^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/;
  const rgbaReg: RegExp = /^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/;
  const rgbReg: RegExp = /^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/;

  return colorReg.test(value) || rgbaReg.test(value) || rgbReg.test(value);
}

export function getScrollview(el: any): Window | any {
  let currentNode = el;
  while (
    currentNode
    && currentNode.tagName !== 'HTML'
    && currentNode.tagName !== 'BODY'
    && currentNode.nodeType === 1
  ) {
    const view:Window|null = document.defaultView;
    const overflowY = view && view.getComputedStyle(currentNode).overflowY;
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode;
    }
    currentNode = currentNode.parentNode;
  }
  return window;
}


export const calcTime = function calcTime(timestamp: number): any|null {
  if (!timestamp) return null;
  const date = new Date(timestamp * 1000);
  const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return time;
};

export const getChartData = function getChartData(moneyList: Array<any>, type?: string): any|null {
  if (!moneyList) return null;
  const array = moneyList;
  const value: Array<any> = [];
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

export const animate = function animate(fn: any) {
  if (typeof window !== 'undefined') {
    if (typeof fn !== 'function') return;
    const requestAnimation = window.requestAnimationFrame || (window as any).mozRequestAnimationFrame || ((cb: any) => setTimeout(cb, 16));
    requestAnimation(fn);
  }
};

export function getElementLeft(element: any, className?: any) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;

  while (current !== null) {
    if (className && typeof className === 'string') {
      const cls:any = current.className || current.classList.value;

      console.log(actualLeft, 'actualTop');
      if (cls && cls.indexOf(className) > -1) return actualLeft;
    }
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }

  return actualLeft;
}

export function getElementTop(element: any, className?: any) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;

  while (current !== null) {
    if (className && typeof className === 'string') {
      const cls:any = current.className || current.classList.value;
      if (cls && cls.indexOf(className) > -1) return actualTop;
    }
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}

export const isNumber = function isNumber(str:any) {
  // eslint-disable-next-line
  return !isNaN(parseFloat(str)) && isFinite(str);
};
