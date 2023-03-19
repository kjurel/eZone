import { z } from "zod";

export const zod = z;

export const searchByQueryData = z.object({
  Version: z.number(),
  Key: z.string(),
  Type: z.union([z.literal("City"), z.literal("Country")]),
  Rank: z.number(),
  LocalizedName: z.string(),
  Country: z.object({
    ID: z.string(), //"IN"
    LocalizedName: z.string(), //"India"
  }),
  AdministrativeArea: z.object({
    ID: z.string(), //"UP"
    LocalizedName: z.string(), //"Uttar Pradesh"
  }),
});
