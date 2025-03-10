import UpdateForm from "@/components/edit-form";
import { getContactById } from "@/lib/data";
import { notFound } from "next/navigation";

// Param type cukup bikin sendiri
type PageProps = {
  params: {
    id: string;
  };
};

// Jangan lupa kasih 'async' karena fetch data
const UpdateContactPage = async ({ params }: PageProps) => {
  const contact = await getContactById(params.id);

  // Handle jika contact tidak ditemukan
  if (!contact) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Contact</h1>
      <UpdateForm contact={contact} />
    </div>
  );
};

export default UpdateContactPage;
