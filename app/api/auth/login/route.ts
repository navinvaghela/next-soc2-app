import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    console.log("useruseruser", user)

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const res =  NextResponse.json(
      { message: "Login successful", user: { id: user.id, name: user.name, email: user.email, role: user.role } },
      { status: 200 }
    );

    res.cookies.set("role", user.role, {
      sameSite: "strict",
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      path: "/",
    });
    return res 
    
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
