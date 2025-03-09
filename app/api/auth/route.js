import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const user = await prisma.users.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const token = await new SignJWT({
      id: user.id,
      username: user.username,
      email: user.email,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('8h')
      .sign(secret);

    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('auth_token', token, { httpOnly: true, secure: true });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function DELETE() {
  try {
    cookies().set('auth_token', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });

    return NextResponse.json({ message: 'Logout berhasil' }, { status: 200 });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'Gagal logout' }, { status: 500 });
  }
}