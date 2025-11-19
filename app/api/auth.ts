import { api } from "./client";

export const loginApi = (payload: { email: string; password: string }) =>
  api("/api/auth/login", { method: "POST", body: JSON.stringify(payload) });

export const signupApi = (payload: any) =>
  api("/api/auth/signup", { method: "POST", body: JSON.stringify(payload) });

export const acceptInviteApi = (token: string) =>
  api(`/api/invite/${token}`);

export const sendInviteApi = (payload: { email: string; role: string }) =>
  api("/api/invite", { method: "POST", body: JSON.stringify(payload) });
