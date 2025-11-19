import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    // Only allow these fields to be updated
    const { name, email, role } = body;
    const payload = { name, email, role };

    // Prisma requires a number if id is Int
    const updated = await prisma.user.update({
      where: { id: Number(id) },
      data: payload,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return Response.json({ message: "User deleted" });
  } catch (error) {
    return Response.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

