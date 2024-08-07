import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  console.log('Custom login route hit');
  try {
    const body = await req.json();
    console.log('Request body:', body);
    const { username, password } = body;

    const user = await prisma.user.findUnique({
      where: { account: username },
    });

    if (!user) {
      console.log('User not found');
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

   // Will be replaced by bcrypt comparison with a simple equality check
   const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      console.log('Invalid password');
      return NextResponse.json({ error: 'Invalid Password' }, { status: 401 });
    }

    console.log('Login successful');
    // Return user object without sensitive information
    return NextResponse.json({
      id: user.id,
      name: user.account,
    });
  } catch (error) {
    console.error('Login error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}