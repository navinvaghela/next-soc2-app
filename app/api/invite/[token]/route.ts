import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;

  const invite = await prisma.invite.findUnique({
    where: { token },
  });

  if (!invite) {
    return NextResponse.json({ error: "Invalid invite link" }, { status: 400 });
  }

  if (invite.used) {
    return NextResponse.json({ error: "Invite already used" }, { status: 400 });
  }

  if (invite.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invite expired" }, { status: 400 });
  }

  return NextResponse.json(invite);
}
