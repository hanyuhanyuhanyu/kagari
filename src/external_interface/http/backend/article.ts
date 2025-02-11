import { httpClient } from "../../../infra/http_client";
import { urls } from "./base";

const buildUrl = urls.api.urlCurry("/article");
export type Article = {
  url: string;
  title: string;
};
export const articleApi = {
  async getBody(url: string): Promise<string> {
    const body = await httpClient.fetchText({
      url: urls.markdown.buildUrl(url),
      method: "GET",
    });
    return body;
  },
  async get(id: string): Promise<Article & { body: string }> {
    const article = await httpClient.fetchJson<Article>({
      url: buildUrl(id),
      method: "GET",
    });
    return Object.assign(article, { body: await this.getBody(article.url) });
  },
  async search() {
    return await httpClient.fetchJson<Article[]>({
      url: buildUrl("search"),
      method: "GET",
    });
  },
};
