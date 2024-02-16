import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
	const { rows } = await sql`SELECT id FROM users`;

	const json = {
		rows,
	};

	return NextResponse.json(json);
}
