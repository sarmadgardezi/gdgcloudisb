// src/lib/db.ts
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  increment,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PortalEvent, PortalRegistration, PortalUser, UserRole } from "@/lib/portal-data";

export interface DevFestRegistrationInput {
  fullName: string;
  email: string;
  phone?: string;
  organization: string;
  role: string;
  track: string;
  experienceLevel: string;
  eventId?: string;
  eventTitle?: string;
}

// 1. Fetch all events from Firestore
export async function getEventsFromDb(): Promise<PortalEvent[]> {
  try {
    if (!db) return [];
    const snap = await getDocs(collection(db, "events"));
    if (snap.empty) return [];
    return snap.docs.map((d) => ({
      ...(d.data() as PortalEvent),
      id: d.id,
    }));
  } catch (error) {
    console.error("Error fetching events from Firestore:", error);
    return [];
  }
}

// 2. Fetch single event by ID
export async function getEventById(eventId: string): Promise<PortalEvent | null> {
  try {
    if (!db) return null;
    const snap = await getDoc(doc(db, "events", eventId));
    if (!snap.exists()) return null;
    return { ...(snap.data() as PortalEvent), id: snap.id };
  } catch (error) {
    console.error(`Error fetching event ${eventId}:`, error);
    return null;
  }
}

// 3. Create a real event registration in Firestore
export async function createRegistration(
  input: DevFestRegistrationInput
): Promise<{ success: boolean; registrationId: string; error?: string }> {
  try {
    if (!db) throw new Error("Firestore is not initialized");

    const eventId = input.eventId || "devfest-islamabad-2026";
    const eventTitle = input.eventTitle || "Cloud DevFest Islamabad 2026";
    const regCode = `DF26-${Math.floor(10000 + Math.random() * 90000)}`;

    const newRegistrationData = {
      id: regCode,
      userName: input.fullName.trim(),
      userEmail: input.email.trim().toLowerCase(),
      phone: input.phone?.trim() || "",
      organization: input.organization.trim(),
      role: input.role,
      track: input.track,
      experienceLevel: input.experienceLevel,
      eventId,
      eventTitle,
      registeredAt: "Just now",
      createdAt: serverTimestamp(),
      status: "Confirmed",
      ticketType: input.role.toLowerCase().includes("student") ? "Student" : "Standard",
      avatarBg: "#4285F4",
    };

    // Save registration document
    const docRef = await addDoc(collection(db, "registrations"), newRegistrationData);

    // Increment event registeredCount in Firestore
    try {
      const eventDocRef = doc(db, "events", eventId);
      await updateDoc(eventDocRef, {
        registeredCount: increment(1),
      });
    } catch (e) {
      console.warn("Could not increment event registeredCount:", e);
    }

    return { success: true, registrationId: regCode || docRef.id };
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error("Error submitting registration to Firestore:", error);
    return { success: false, registrationId: "", error: err.message || "Failed to submit" };
  }
}

// 4. Fetch all registrations from Firestore
export async function getRegistrationsFromDb(): Promise<PortalRegistration[]> {
  try {
    if (!db) return [];
    const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: data.id || d.id,
        userName: data.userName || data.fullName || "Attendee",
        userEmail: data.userEmail || data.email || "",
        eventTitle: data.eventTitle || "Cloud DevFest Islamabad",
        registeredAt: data.registeredAt || "Recent",
        status: data.status || "Confirmed",
        ticketType: data.ticketType || "Standard",
        avatarBg: data.avatarBg || "#1a73e8",
      };
    });
  } catch (error) {
    console.error("Error fetching registrations from Firestore:", error);
    return [];
  }
}

// 5. Update registration check-in status in Firestore
export async function updateRegistrationStatusInDb(
  regId: string,
  newStatus: "Confirmed" | "Checked In" | "Waitlist"
): Promise<boolean> {
  try {
    if (!db) return false;
    const snap = await getDocs(collection(db, "registrations"));
    const targetDoc = snap.docs.find((d) => d.id === regId || d.data().id === regId);
    if (targetDoc) {
      await updateDoc(doc(db, "registrations", targetDoc.id), { status: newStatus });
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error updating registration ${regId}:`, error);
    return false;
  }
}

// 6. Fetch users from Firestore
export async function getUsersFromDb(): Promise<PortalUser[]> {
  try {
    if (!db) return [];
    const snap = await getDocs(collection(db, "users"));
    return snap.docs.map((d) => ({
      ...(d.data() as PortalUser),
      id: d.id,
    }));
  } catch (error) {
    console.error("Error fetching users from Firestore:", error);
    return [];
  }
}

// 7. Update user role in Firestore
export async function updateUserRoleInDb(
  userId: string,
  newRole: UserRole,
  accountType: "admin" | "user"
): Promise<boolean> {
  try {
    if (!db) return false;
    await updateDoc(doc(db, "users", userId), {
      role: newRole,
      accountType,
    });
    return true;
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    return false;
  }
}
