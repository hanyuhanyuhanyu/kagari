import { IHttpClient, RequestType } from "../external_interface/http/interface";

export const httpClient: IHttpClient = {
  async fetchJson<T>(req: RequestType<T>): Promise<T> {
    const res = await fetch(req.url, {
      method: req.method,
      headers: {
        "Content-Type": req.contentType || "application/json",
      },
      body: req.body,
    });
    const json = await res.json();
    if (!req.checker) return json as T;
    if (!req.checker(json)) throw new Error("hoge");
    return json;
  },
  async fetchText(req: RequestType): Promise<string> {
    const res = await fetch(req.url, {
      method: req.method,
      headers: {
        "Content-Type": req.contentType || "application/json",
      },
      body: req.body,
    });
    return await res.text();
  },
};
