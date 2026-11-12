"use client";

import React, { useEffect, useState } from "react";
import UsersTable from "@/components/portal/users/users-table";
import { getUsersFromDb } from "@/lib/db";
import { INITIAL_USERS, PortalUser } from "@/lib/portal-data";

export default function PortalUsersPage() {
  const [users, setUsers] = useState<PortalUser[]>(INITIAL_USERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const dbUsers = await getUsersFromDb();
        if (dbUsers && dbUsers.length > 0) {
          setUsers(dbUsers);
        }
      } catch (e) {
        console.warn("Using initial users list:", e);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
    <div className="space-y-6">
      {/* Breadcrumb / Top Bar */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#5f6368] mb-1">
          <span>Portal</span>
          <span>/</span>
          <span className="text-[#202124] font-medium">Users &amp; Admins</span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
            Users &amp; Admin Accounts
          </h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f4ea] text-[#137333] px-2.5 py-0.5 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
            {loading ? "Loading..." : "Firestore Sync"}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#5f6368] mt-1">
          View, search, and manage permissions for all GDG Cloud Islamabad members and organizers
        </p>
      </div>

      {/* Users Table with Dropdown Filter */}
      <UsersTable initialUsers={users} />
    </div>
  );
}
