import { NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { resend } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, role } = await req.json();
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const invite = await prisma.invite.create({
      data: {
        email,
        role,
        token,
        expiresAt,
      },
    });

    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/accept?token=${token}`;

     // ---- SEND EMAIL HERE ----
    await resend.emails.send({
    //   from: "vnavin1411@gmail.com",
      from: "SOC App <onboarding@resend.dev>",
      to: email,
      subject: "You're invited!",
      html: `
        <p>You have been invited to join our system.</p>
        <p><a href="${inviteLink}">Click here to accept invitation</a></p>
      `,
    });

    return NextResponse.json({
      success: true,
      inviteLink,
      invite,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create invite" }, { status: 500 });
  }
}
