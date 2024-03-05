import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function POST(req: any) {
  const { username, password } = await req.json();

  try {
    // Find the user by username
    const { rows } = await sql`SELECT * FROM users WHERE username = ${username} LIMIT 1`;
    const user = rows[0];

    if (!user) {
      // User not found
      return new Response(JSON.stringify({ error: 'Invalid username or password.' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.passwordhash); // Make sure the column name matches your DB schema

    if (!isMatch) {
      // Passwords do not match
      return new Response(JSON.stringify({ error: 'Invalid username or password.' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    console.log('Login successful.');
    // Proceed to set up session/login token here
    return new Response(JSON.stringify({ message: 'Login successful.' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
