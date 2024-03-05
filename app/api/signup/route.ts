import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

// Function to check if a password is strong
const isStrongPassword = (password: string): boolean => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // Adjust regex as needed
  return regex.test(password);
};

export async function POST(req: any) {
  const { username, password } = await req.json();

  // Check if the password is strong
  if (!isStrongPassword(password)) {
    return new Response(JSON.stringify({ error: 'Password does not meet security requirements. It must include uppercase and lowercase letters, numbers, and be at least 8 characters long.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    // Check if the username already exists
    const existingUser = await sql`SELECT * FROM users WHERE username = ${username} LIMIT 1`;
    if (existingUser.rowCount > 0) { // Adjust based on how your SQL library returns results
      // User already exists, return an error
      return new Response(JSON.stringify({ error: 'Username is already taken. Please choose another.' }), {
        status: 409, // Conflict status
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Proceed with hashing the password with bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into your database
    await sql`INSERT INTO users (username, Passwordhash) VALUES (${username}, ${hashedPassword})`;

    console.log('User created successfully.');
    return new Response(JSON.stringify({ message: 'User created successfully.' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
