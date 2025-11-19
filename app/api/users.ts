import { api } from "./client";

export const fetchUsersApi = () => api("/api/users");
export const fetchUserApi = (id: number | string) => api(`/api/users/${id}`);
export const createUserApi = (payload: any) =>
  api("/api/users", { method: "POST", body: JSON.stringify(payload) });

export const updateUserApi = (id: number | string, payload: any) =>
  api(`/api/users/${id}`, { method: "PUT", body: JSON.stringify(payload) });

export const deleteUserApi = (id: number | string) =>
  api(`/api/users/${id}`, { method: "DELETE" });

export const fetchUserRoleApi = () => api("/api/auth/get-role");

export const setUserRoleApi = (role: string) =>
  api("/api/auth/set-role", {
    method: "POST",
    body: JSON.stringify({ role }),
    headers: { "Content-Type": "application/json" },
  });
