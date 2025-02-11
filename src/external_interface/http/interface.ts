export type RequestType<T = any> = {
  url: string | URL;
  method: string;
  contentType?: string;
  body?: BodyInit;
  checker?: (a: unknown) => a is T;
};
export interface IHttpClient {
  fetchJson<T>(req: RequestType<T>): Promise<T>;
  fetchText(req: RequestType): Promise<string>;
}
