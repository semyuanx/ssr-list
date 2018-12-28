export function isWebview(query:any) {
  if (typeof query === 'object') {
    return Object.keys(query).every(v => ['channel', 'clientFlag', 'clientType', 'lang', 'version'].indexOf(v) !== -1) && query.clientType && query.clientType.toLowerCase() === 'fmapp';
  }
  return false;
}

export const t = 1;
