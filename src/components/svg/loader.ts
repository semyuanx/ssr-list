const context = (require as any).context('@/assets/svgs', false, /\.svg$/);
const svgs: any = {};
context.keys().filter((item: string) => item !== './index.ts').map((path: string) => {
  const names = path.match(/^\.\/(.+)\.svg$/);
  const name: string = (names && names[1]) || '';
  svgs[name] = context(path);
  return path;
});
export default svgs;
