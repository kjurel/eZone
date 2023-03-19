import { z } from "zod";

export type LocationType = z.infer<typeof SingleLocationType>;
const SingleLocationType = z.object({
  id: z.number(),
  city: z.string(),
  name: z.string(),
  entity: z.string(),
  country: z.string(),
  sources: z.array(
    z.object({
      name: z.string(),
      id: z.string(),
    })
  ),
  parameters: z.array(
    z.object({
      id: z.number(),
      unit: z.string(),
      count: z.number(),
      average: z.number(),
      lastValue: z.number(),
      parameter: z.string(),
      displayName: z.string(),
      lastUpdated: z.string(),
      parameterId: z.number(),
      firstUpdated: z.string(),
    })
  ),
  sensorType: z.string(),
  coordinates: z.object({
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
  }),
  lastUpdated: z.string(),
  firstUpdated: z.string(),
  measurements: z.number(),
});

const LocationResponseData = z.object({
  meta: z.object({
    name: z.string(),
    license: z.string(),
    website: z.string(),
    page: z.number(),
    limit: z.number(),
    found: z.number(),
  }),
  results: z.array(SingleLocationType),
});

export async function getLocationAq(city: string) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  const link =
    "https://api.openaq.org/v2/locations?" +
    new URLSearchParams({ city: city }).toString();

  return await fetch(link, options)
    .then((response) => response.json())
    .then((response) => LocationResponseData.parse(response))
    .catch((err) => console.error(err));
}
