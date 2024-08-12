import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();


export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return unauthorizedResponse();
    }

    const employees = await prisma.employees.findMany();
    return NextResponse.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return internalServerErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
}


function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}


function internalServerErrorResponse() {
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}