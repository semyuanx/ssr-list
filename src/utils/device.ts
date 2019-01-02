export function isWebview(search:string) {
  let clientType = '';
  const query = search.slice(1).split('&').map((v) => {
    const vArr = v.split('=');
    if (vArr[0] === 'clientType') [, clientType] = vArr;
    return vArr[0];
  });
  return query.every(v => ['channel', 'clientFlag', 'clientType', 'lang', 'version'].indexOf(v) !== -1) && clientType.toLowerCase() === 'fmapp';
}

export const t = 1;
