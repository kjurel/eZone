import type { APIRoute } from "astro";
import * as schemas from "@schemas/AccuWeather";

function validator(data: unknown) {
  schemas.zod.array(schemas.searchByQueryData).parse(data);
}

export const get: APIRoute = async ({ request, params }) => {
  if (params.q === undefined) {
    return new Response(null, { status: 400 });
  }

  const url = new URL(
    "http://dataservice.accuweather.com/locations/v1/cities/autocomplete"
  );
  url.searchParams.append("apikey", import.meta.env.ACCU_KEY);
  url.searchParams.append("q", params.q);

  const res = await fetch(url, {
    headers: {
      "Access-Control-Allow-Origin": url.origin,
    },
  });
  const resResult = validator(await res.json());

  return new Response(JSON.stringify(resResult), { status: 200 });
};

export async function wrapper(query: string) {
  const url = new URL("/api/searchByQuery");
  url.searchParams.append("q", query);
  return validator(await (await fetch(url)).json());
}
