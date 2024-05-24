"use server";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  await fs.writeFile(`./public/uploads/${file.name}`, buffer);
  revalidatePath("/");
}
