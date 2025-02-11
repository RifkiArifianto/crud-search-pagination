"use server";

import { z } from "zod";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ContactSchema = z.object({
  name: z.string().min(6),
  phone: z.string().min(11),
});

export const saveContact = async (prevState: unknown, formData: FormData) => {
  const validatedFields = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.contact.create({
      data: {
        name: validatedFields.data.name,
        phone: validatedFields.data.phone,
      },
    });
  } catch (error) {
    return { message: (error as Error).message || "Failed to create contact" };
  }
  revalidatePath("/Contacts");
  redirect("/contacts");
};

export const updateContact = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.contact.update({
      data: {
        name: validatedFields.data.name,
        phone: validatedFields.data.phone,
      },
      where: { id },
    });
  } catch (error) {
    return { message: (error as Error).message || "Failed to update contact" };
  }
  revalidatePath("/Contacts");
  redirect("/contacts");
};

export const deleteContact = async (id: string) => {
  try {
    await prisma.contact.delete({
      where: { id },
    });
  } catch (error) {
    return { message: (error as Error).message || "Failed to delete contact" };
  }
  revalidatePath("/Contacts");
};
