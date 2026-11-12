"use client";

import React, { useState, useMemo } from "react";
import { PortalUser, UserRole } from "@/lib/portal-data";

interface UsersTableProps {
  initialUsers: PortalUser[];
}

export default function UsersTable({ initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState<PortalUser[]>(initialUsers);
  const [accountFilter, setAccountFilter] = useState<"all" | "admin" | "user">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Filtered users calculation
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      // Dropdown filter: all, admin, user
      if (accountFilter !== "all" && u.accountType !== accountFilter) {
        return false;
      }
      // Role filter
      if (roleFilter !== "all" && u.role !== roleFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = u.name.toLowerCase().includes(query);
        const matchesEmail = u.email.toLowerCase().includes(query);
        const matchesTitle = u.title.toLowerCase().includes(query);
        return matchesName || matchesEmail || matchesTitle;
      }
      return true;
    });
  }, [users, accountFilter, roleFilter, searchQuery]);

  // Counts for the dropdown tabs
  const adminCount = useMemo(() => users.filter((u) => u.accountType === "admin").length, [users]);
  const userCount = useMemo(() => users.filter((u) => u.accountType === "user").length, [users]);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newAccountType = newRole === "Member" ? "user" : "admin";
          return {
            ...u,
            role: newRole,
            accountType: newAccountType,
          };
        }
        return u;
      })
    );
    setEditingUserId(null);
    setFeedbackMessage("User role updated successfully.");
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "Super Admin":
        return "bg-[#e8f0fe] text-[#1a73e8] border-[#d2e3fc]";
      case "Chapter Admin":
        return "bg-[#fce8e6] text-[#c5221f] border-[#f5c2c7]";
      case "Organizer":
        return "bg-[#e6f4ea] text-[#137333] border-[#ceead6]";
      case "Member":
      default:
        return "bg-[#f1f3f4] text-[#5f6368] border-[#dadce0]";
    }
  };

  return (
    <div className="google-card bg-white overflow-hidden space-y-4">
      {/* Table Header with Dropdown & Search Filter */}
      <div className="p-5 sm:p-6 border-b border-[#f1f3f4] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#202124] tracking-tight">
              Community Directory &amp; Roles
            </h2>
            <p className="text-xs sm:text-sm text-[#5f6368] mt-0.5">
              Manage chapter administrators, core organizers, and registered community members
            </p>
          </div>

          {/* Quick Action Button */}
          <button
            type="button"
            onClick={() => {
              const newName = prompt("Enter full name of new member/admin:");
              if (!newName) return;
              const newEmail = prompt("Enter email address:");
              if (!newEmail) return;
              const isAdmin = confirm("Assign as an Admin account? (OK for Admin, Cancel for Member)");

              const newUser: PortalUser = {
                id: `usr-${Date.now()}`,
                name: newName,
                email: newEmail,
                role: isAdmin ? "Chapter Admin" : "Member",
                accountType: isAdmin ? "admin" : "user",
                title: isAdmin ? "Chapter Co-Lead" : "Community Member",
                initials: newName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase(),
                avatarBg: isAdmin ? "#4285F4" : "#34A853",
                status: "Active",
                googleAccount: true,
                joinedDate: "Just now",
                eventsCount: 0,
              };

              setUsers([newUser, ...users]);
              setFeedbackMessage(`Added ${newName} (${newUser.role}) successfully!`);
              setTimeout(() => setFeedbackMessage(null), 3500);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#1557d0] transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
          >
            <span>+ Add Account</span>
          </button>
        </div>

        {feedbackMessage && (
          <div className="p-3 rounded-lg bg-[#e6f4ea] border border-[#ceead6] text-[#137333] text-xs font-medium flex items-center justify-between">
            <span>✓ {feedbackMessage}</span>
            <button
              onClick={() => setFeedbackMessage(null)}
              className="text-[#137333] hover:underline"
            >
              ✕
            </button>
          </div>
        )}

        {/* Dropdown Filters & Search Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          {/* Main Requested Dropdown: Admin Accounts vs Regular Users */}
          <div className="sm:col-span-4">
            <label htmlFor="account-type-filter" className="block text-xs font-semibold text-[#5f6368] mb-1">
              Account Type Dropdown
            </label>
            <div className="relative">
              <select
                id="account-type-filter"
                value={accountFilter}
                onChange={(e) => setAccountFilter(e.target.value as "all" | "admin" | "user")}
                className="w-full appearance-none pl-3.5 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-[#dadce0] bg-white text-[#202124] font-medium focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none cursor-pointer"
              >
                <option value="all">👥 All Accounts ({users.length})</option>
                <option value="admin">⭐ Admin Accounts ({adminCount})</option>
                <option value="user">👤 General Users &amp; Members ({userCount})</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#5f6368]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Role Granular Filter */}
          <div className="sm:col-span-3">
            <label htmlFor="role-filter" className="block text-xs font-semibold text-[#5f6368] mb-1">
              Filter by Role
            </label>
            <div className="relative">
              <select
                id="role-filter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-[#dadce0] bg-white text-[#202124] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none cursor-pointer"
              >
                <option value="all">All Roles</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Chapter Admin">Chapter Admin</option>
                <option value="Organizer">Organizer</option>
                <option value="Member">Member</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#5f6368]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Search Input */}
          <div className="sm:col-span-5">
            <label htmlFor="search-user" className="block text-xs font-semibold text-[#5f6368] mb-1">
              Search Users &amp; Admins
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#80868b]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                id="search-user"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or company..."
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#dadce0] bg-white text-[#202124] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none placeholder-[#80868b]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#f8f9fa] border-b border-[#dadce0] text-[#5f6368] font-medium">
              <th className="py-3 px-4 sm:px-6">User / Account</th>
              <th className="py-3 px-4">Role &amp; Permissions</th>
              <th className="py-3 px-4 hidden md:table-cell">Google Auth</th>
              <th className="py-3 px-4 hidden lg:table-cell">Joined</th>
              <th className="py-3 px-4 hidden sm:table-cell">Events</th>
              <th className="py-3 px-4 text-right sm:px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f3f4]">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-[#5f6368]">
                  No accounts found matching your selected filter.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#f8f9fa] transition-colors">
                  {/* User Profile */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-2xs"
                        style={{ backgroundColor: user.avatarBg }}
                      >
                        {user.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[#202124] flex items-center gap-1.5 truncate">
                          <span>{user.name}</span>
                          {user.accountType === "admin" && (
                            <span
                              className="text-[10px] font-bold text-[#1a73e8] bg-[#e8f0fe] px-1.5 py-0.2 rounded"
                              title="Administrator Account"
                            >
                              ADMIN
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#5f6368] truncate">{user.email}</div>
                        <div className="text-[11px] text-[#80868b] truncate">{user.title}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {editingUserId === user.id ? (
                      <div className="flex items-center gap-1.5">
                        <select
                          defaultValue={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                          className="px-2 py-1 text-xs rounded border border-[#1a73e8] bg-white text-[#202124] outline-none"
                        >
                          <option value="Super Admin">Super Admin</option>
                          <option value="Chapter Admin">Chapter Admin</option>
                          <option value="Organizer">Organizer</option>
                          <option value="Member">Member</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => setEditingUserId(null)}
                          className="text-xs text-[#5f6368] hover:text-[#202124]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getRoleBadge(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    )}
                  </td>

                  {/* Google Auth Status */}
                  <td className="py-3.5 px-4 hidden md:table-cell text-xs whitespace-nowrap">
                    {user.googleAccount ? (
                      <span className="inline-flex items-center gap-1 text-[#137333]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                        <span>Google Linked</span>
                      </span>
                    ) : (
                      <span className="text-[#80868b]">Email Only</span>
                    )}
                  </td>

                  {/* Joined Date */}
                  <td className="py-3.5 px-4 hidden lg:table-cell text-xs text-[#5f6368] whitespace-nowrap">
                    {user.joinedDate}
                  </td>

                  {/* Events Registered Count */}
                  <td className="py-3.5 px-4 hidden sm:table-cell text-xs font-semibold text-[#202124] whitespace-nowrap">
                    {user.eventsCount}
                  </td>

                  {/* Action Menu */}
                  <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    {editingUserId === user.id ? null : (
                      <button
                        type="button"
                        onClick={() => setEditingUserId(user.id)}
                        className="text-xs font-medium text-[#1a73e8] hover:underline px-2 py-1 rounded hover:bg-[#e8f0fe] transition-colors cursor-pointer"
                      >
                        Change Role
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer Summary */}
      <div className="p-4 sm:px-6 border-t border-[#f1f3f4] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#5f6368] gap-2">
        <span>
          Showing {filteredUsers.length} of {users.length} registered accounts
        </span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
            {adminCount} Admin Accounts
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#34A853]" />
            {userCount} Regular Members
          </span>
        </div>
      </div>
    </div>
  );
}

