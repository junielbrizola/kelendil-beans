// actions/shipping/calculateFreight.ts
"use server";
import { z } from "zod";
import melhorEnvio from "@/lib/melhorenvio";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

// Validação de entrada para cálculo de frete
const calculateFreightSchema = z.object({
  destinationPostalCode: z.string().min(5, "Invalid postal code"),
  weightKg: z.preprocess(val => typeof val === "string" ? parseFloat(val) : val,
    z.number().positive("Weight must be positive")),
  lengthCm: z.preprocess(val => typeof val === "string" ? parseFloat(val) : val,
    z.number().positive("Length must be positive")),
  widthCm: z.preprocess(val => typeof val === "string" ? parseFloat(val) : val,
    z.number().positive("Width must be positive")),
  heightCm: z.preprocess(val => typeof val === "string" ? parseFloat(val) : val,
    z.number().positive("Height must be positive"))
});

type FreightOption = {
  provider: string;
  service: string;
  price: number;
  estimatedDelivery: string;
};

type CalculateFreightData = { options: FreightOption[] };

export async function calculateFreightAction(
  formData: FormData
): Promise<ActionResult<CalculateFreightData>> {
  const { data, errors } = await normalizeForm(calculateFreightSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }

  try {
    // Chamada ao helper melhorEnvio já configurado com retry
    const response = await melhorEnvio.post(
      "/me/shipment/calculate",
      {
        from: { postal_code: process.env.ORIGIN_POSTAL_CODE },
        to: { postal_code: data?.destinationPostalCode },
        weight: data?.weightKg,
        dimensions: { length: data?.lengthCm, width: data?.widthCm, height: data?.heightCm }
      }
    );

    const options: FreightOption[] = response.data.data.map((opt: any) => ({
      provider: opt.name,
      service: opt.service,
      price: parseFloat(opt.price),
      estimatedDelivery: opt.delivery_time
    }));

    return { success: true, data: { options } };
  } catch (error: any) {
    console.error("calculateFreightAction error:", error.response?.data || error);
    return { success: false, error: { code: "API_ERROR", message: "Error calculating freight" } };
  }
}
