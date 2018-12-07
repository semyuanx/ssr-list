
export function findComponentUpward(context: any, componentName: string, componentNames: any): any {
  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }

  let parent: any = context.$parent;
  let name1: any = parent.$options.name;
  while (parent && (!name1 || componentNames.indexOf(name1) < 0)) {
    parent = parent.$parent;
    if (parent) name1 = parent.$options.name;
  }
  return parent;
}

export function findComponentDownward(context: any, componentName: string): any {
  const childrens: any = context.$children;
  let children: null = null;

  if (childrens.length) {
    /* eslint-disable */
    for (const child of childrens) {
      const name: any = child.$options.name;
      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
    /* eslint-enable */
  }
  return children;
}

export function findBrothersComponents(
  context: any,
  componentName: string,
  exceptMe: boolean = true,
): any {
  const res: any = context.$parent.$children.filter(
    (item: any) => item.$options.name === componentName,
  );
  /* eslint-disable */
  const index: any = res.findIndex((item: any) => item._uid === context._uid);
  /* eslint-enable */
  if (exceptMe) res.splice(index, 1);
  return res;
}

// 判断参数是否是其中之一
export function oneOf(value: any, validList: Array<any>): boolean {
  return validList.indexOf(value) !== -1;
}
