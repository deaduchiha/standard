import { z } from "zod";
import { formSchema } from "./stepper";

export type TFormData = z.infer<typeof formSchema>;
