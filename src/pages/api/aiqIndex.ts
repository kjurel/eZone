import type { APIRoute } from "astro";
import * as schemas from "src/schemas/AccuWeather";

// function validator(data: unknown) {
//   schemas.zod.array(schemas.searchByQueryData).parse(data);
// }

export const get: APIRoute = async ({ request, params }) => {
  const FetchOptions = {
    method: "GET",
    headers: { accept: "application/json" },
  };

  fetch(
    URLSearchParams,
    "https://api.openaq.org/v2/latest/860?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false",
    FetchOptions
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

  const url = new URL("http://api.openweathermap.org/data/2.5/air_pollution");
  url.searchParams.append("appid", import.meta.env.OWMP_KEY);
  url.searchParams.append("lat", "51.505");
  url.searchParams.append("lon", "-0.09");

  const res = await fetch(url, {
    headers: {
      "Access-Control-Allow-Origin": url.origin,
    },
  });
  const resResult = await res.json();

  return new Response(JSON.stringify(resResult), { status: 200 });
};

export async function wrapper(query?: string) {
  const url = "/api/aiqIndex";
  //   url.searchParams.append("q", query);
  return await (await fetch(url)).json();
}
