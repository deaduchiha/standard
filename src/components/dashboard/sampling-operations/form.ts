import { z } from "zod";
import { formSchema } from "./stepper";

export type FormData = z.infer<typeof formSchema>;
