import type {
  TypedPocketBase,
  ContactsResponse,
  ContactsRecord,
} from "@lib/pocketbase-types";

import PocketBase from "pocketbase";

// Use import.meta.env for Astro environment variables
export const pb = new PocketBase(import.meta.env.PUBLIC_POCKETBASE_URL || "http://localhost:8090") as TypedPocketBase;

// Authenticate with admin credentials
// You'll need to add these environment variables or use hardcoded values for demo purposes
try {
  const adminEmail = import.meta.env.PUBLIC_POCKETBASE_ADMIN_EMAIL || "admin@example.com";
  const adminPassword = import.meta.env.PUBLIC_POCKETBASE_ADMIN_PASSWORD || "your-password";
  
  // This will authenticate as admin when the server starts
  pb.admins.authWithPassword(adminEmail, adminPassword)
    .then(() => console.log("Authenticated with PocketBase admin"))
    .catch(err => console.error("Failed to authenticate with PocketBase:", err));
} catch (error) {
  console.error("Error during PocketBase authentication:", error);
}

// globally disable auto cancellation
pb.autoCancellation(false);

export async function getContacts({
  q = null,
  limit,
  page,
}): Promise<ContactsResponse[]> {
  const options = {
    filter: "",
  };

  if (q) {
    options.filter = `first ~ "${q}" || last ~ "${q}" || email ~ "${q}" || phone ~ "${q}"`;
  }

  let contacts: ContactsResponse[] = [];
  try {
    console.log("trying");
    let result = await pb.collection("contacts").getList(page, limit, options);
    contacts = result.items;
  } catch (e) {
    console.log("oop");
    console.log(e);
    console.log(e.response);
  }
  return contacts;
}

export async function getContact(id: string) {
  let contact: ContactsResponse;
  try {
    const options = {};
    contact = await pb.collection("contacts").getOne(id, options);
  } catch (e) {
    console.log(e.response);
  }

  return contact;
}

//add contact to pocketbase
export async function addContact({ first, last, phone, email }) {
  let newContact: ContactsResponse;

  try {
    console.log("Creating contact with data:", { first, last, phone, email });
    newContact = await pb.collection("contacts").create({
      first,
      last,
      phone,
      email,
    });
    console.log("Contact created successfully:", newContact);
  } catch (e) {
    console.error("Error creating contact:", e);
    console.error("Error response:", e.response);
    throw e; // Re-throw to allow handling in the form submission
  }

  return newContact;
}

export async function deleteContact(id: string) {
  try {
    await pb.collection("contacts").delete(id);
  } catch (e) {
    console.log(e.response);
  }
}

export async function updateContact(id: string, data: ContactsRecord) {
  let updatedContact: ContactsResponse;

  try {
    updatedContact = await pb.collection("contacts").update(id, data);
  } catch (e) {
    console.log(e.response);
  }

  return updatedContact;
}
