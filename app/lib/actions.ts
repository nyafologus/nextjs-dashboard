"use server";

// import Zod and define a schema that matches the shape of your form object
import { z } from "zod";

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const rawFormData = {
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  };
  // Test it out:
  console.log(rawFormData);

  console.log(typeof rawFormData.amount);
  // You'll notice that amount is of type string and not number. This is because input elements with type="number" actually return a string, not a number!
}
