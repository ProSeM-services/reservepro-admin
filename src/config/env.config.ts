import { z } from "zod";

const envZodModel = z.object({
    VITE_BASE_URL: z.string().url(),
});

/*
 |TODO For the moment prevent this from passing deployment into production.
 |------>  envZodModel.parse(process.env);
*/

type EnvType = z.infer<typeof envZodModel>;
declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvType {}
  }
}
