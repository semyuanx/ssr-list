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
