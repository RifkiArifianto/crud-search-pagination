import UpdateForm from "@/components/edit-form";
import { getContactById } from "@/lib/data";
import { notFound } from "next/navigation";

// Pakai function declaration + async
export default async function UpdateContactPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id; // Ambil id dari params
  const contact = await getContactById(id); // Ambil data contact dari id

  if (!contact) {
    notFound(); // Kalau ga ada, ke halaman 404
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Contact</h1>
      <UpdateForm contact={contact} /> {/* Kirim contact ke form */}
    </div>
  );
}
