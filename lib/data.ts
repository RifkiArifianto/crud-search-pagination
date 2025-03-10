import { prisma } from "@/lib/prisma";

export type Contact = {
  id: string;
  name: string;
  phone: string;
  createdAt: Date;
};

const ITEMS_PER_PAGE = 5;

export const getContacts = async (
  query: string,
  currentPage: number
): Promise<Contact[]> => {
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

export const getContactById = async (id: string): Promise<Contact | null> => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });
    return contact;
  } catch (error) {
    console.error("Error fetching contact by ID:", error);
    throw new Error("Failed to fetch contact data");
  }
};

export const getContactPages = async (query: string): Promise<number> => {
  try {
    const totalContacts = await prisma.contact.count({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { phone: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    const totalPages = Math.ceil(totalContacts / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Failed to fetch contact data");
  }
};
