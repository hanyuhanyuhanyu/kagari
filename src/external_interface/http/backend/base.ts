const apiUrl = "https://kagari-449709.an.r.appspot.com";
const s3Base = "https://kagari-markdown.s3.ap-northeast-1.amazonaws.com";

const createBuilder = (base: string) => {
  return {
    buildUrl(...urlPath: string[]) {
      return new URL(urlPath.join("/"), base);
    },
    urlCurry(...urlPath: string[]) {
      return (...urlPath2: string[]) =>
        this.buildUrl(...[...urlPath, ...urlPath2]);
    },
  };
};
export const urls = {
  api: createBuilder(apiUrl),
  markdown: createBuilder(s3Base),
};
