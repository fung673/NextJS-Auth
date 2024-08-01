import { NextResponse } from 'next/server';
import { PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const messages: string[] = [
    'Hello, World!',
    'How are you today?',
    'Have a great day!',
    'Keep smiling!',
    'Stay positive!'
  ];


export const GET = async (request: Request) => {
    const allStaff = await prisma.employees.findMany()
    const selectedMessage = messages[Math.floor(Math.random() * messages.length)];
  return NextResponse.json({
    staff: allStaff,
    message: selectedMessage,
  })
}

export const POST = async (request: Request) => {
  
  try {
    // Parse the form data
    const formData = await request.formData();
    
    // Extract the form fields
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const employeeNumber = parseInt(formData.get('employeenumber') as string);
    const salary = parseFloat(formData.get('salary') as string);
    const country = formData.get('country') as string;

    // Validate the data (basic example)
    if (!firstName || !lastName || isNaN(employeeNumber) || isNaN(salary) || !country) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }

    // Process the data (e.g., save to database)
    // This is where you'd typically interact with your database
    const result = await saveEmployee({
      firstName,
      lastName,
      employeeNumber,
      salary,
      country
    });

    // Return a success response
    return NextResponse.json({ message: 'Employee added successfully', employee: result }, { status: 201 });

  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function saveEmployee(data: {
  firstName: string;
  lastName: string;
  employeeNumber: number;
  salary: number;
  country: string;
}) {
  try {
    const newEmployee = await prisma.employees.create({
      data: {
        firstname: data.firstName,
        lastname: data.lastName,
        employeenumber: data.employeeNumber,
        salary: data.salary,
        country: data.country,
      },
    });

    return newEmployee;
  } catch (error) {
    console.error('Error saving employee to database:', error);
    throw new Error('Failed to save employee');
  } finally {
    await prisma.$disconnect();
  }
}