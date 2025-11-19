import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("role");
  cookieStore.delete("token");
  return Response.json({ ok: true });
}
