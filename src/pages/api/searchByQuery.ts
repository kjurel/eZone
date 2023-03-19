import type { APIRoute } from "astro";
import { AccuWeather } from "@libs/AccuWeather";

export const get: APIRoute = async ({ request, params }) => {
  main: {
    if (params.q === undefined) {
      return new Response(null, { status: 400 });
    }
    const accw = new AccuWeather();
    const result = await accw.search(params.q);
    return new Response(JSON.stringify(result), { status: 200 });
  }
};
