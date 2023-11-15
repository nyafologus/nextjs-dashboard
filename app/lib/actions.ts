"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
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
  //previously rawFormData but now destructured into these 3
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath("/dashboard/invoices");

  // Test it out:
  // console.log(rawFormData);

  // console.log(typeof rawFormData.amount);
  // logs this to the terminal:
  // {
  //   customerId: 'cc27c14a-0acf-4f4a-a6c9-d45682c144b9',
  //   amount: '666',
  //   status: 'pending'
  // }
  // You'll notice that amount is of type string and not number. This is because input elements with type="number" actually return a string, not a number!
}
