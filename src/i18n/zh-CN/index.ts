/* eslint-disable */
const context = (require as any).context('./', false, /\.ts$/);

let langs: any = {};
context.keys().filter((item: string) => item !== './index.ts').map((path: string) => {
  const config = context(path).default;
  langs = { ...langs, ...config };
});

export default langs;
