import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 5;

export const getContacts = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const contacts = await prisma.contact.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Failed to fetch contact data");
  }
};

export const getContactById = async (id: string) => {
  try {
    const contacts = await prisma.contact.findUnique({
      where: { id },
    });
    return contacts;
  } catch (error) {
    console.error("Error fetching contact by ID:", error);
    throw new Error("Failed to fetch contact data");
  }
};

export const getContactPages = async (query: string) => {
  try {
    const totalContacts = await prisma.contact.count({
      // ✅ MENGEMBALIKAN ANGKA
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { phone: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    const totalPages = Math.ceil(totalContacts / ITEMS_PER_PAGE); // ✅ Sekarang `totalContacts` adalah angka
    return totalPages;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Failed to fetch contact data");
  }
};
