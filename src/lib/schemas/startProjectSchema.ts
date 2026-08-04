import { z } from "zod";

export const startProjectSchema = z.object({
  businessSize: z.string().min(1, "Please select a business size"),
  country: z.string().min(1, "Country is required"),
  state: z.string().optional(),
  businessName: z.string().min(1, "Business name is required").trim(),
  services: z.array(z.string()).min(1, "Select at least one service"),
  otherService: z.string().optional(),
  email: z.string().email("Invalid email address").trim(),
  phone: z.string().min(5, "Phone number is too short").trim(),
}).superRefine((data, ctx) => {
  if (data.country === "India" && !data.state) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "State is required for India",
      path: ["state"],
    });
  }
  if (data.services.includes("Other") && (!data.otherService || data.otherService.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please specify the other service",
      path: ["otherService"],
    });
  }
});

export type StartProjectFormData = z.infer<typeof startProjectSchema>;

export const defaultFormValues: StartProjectFormData = {
  businessSize: "",
  country: "",
  state: "",
  businessName: "",
  services: [],
  otherService: "",
  email: "",
  phone: "",
};
