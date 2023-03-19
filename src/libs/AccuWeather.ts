import * as schemas from "@schemas/AccuWeather";

export class AccuWeather {
  private readonly routes = {
    autocompleteSearch:
      "http://dataservice.accuweather.com/locations/v1/cities/autocomplete",
  };
  private readonly apiKey: string;
  constructor() {
    this.apiKey = import.meta.env.ACCU_KEY;
  }

  async search(query: string) {
    const url = new URL(this.routes.autocompleteSearch);
    url.searchParams.append("apikey", this.apiKey);
    url.searchParams.append("q", query);

    const res = await fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": url.origin,
      },
    });
    const resResult = schemas.zod
      .array(schemas.searchByQueryData)
      .parse(await res.json());

    return resResult;
  }
}
