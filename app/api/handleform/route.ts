import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(){
    const data = {
        name: 'Bishal Shrestha',
        age: '27'
    }

    return NextResponse.json({data})
}

export async function POST(req : any, res : any){
    const { name, age } = await req.json();
    
    // Assuming the name is in the format "First Last" and needs to be split.
    const [firstName, lastName] = name.split(' ');

    try {
        // Assuming your sql function is setup to handle SQL queries.
        // The query string is passed to the sql function along with parameters to prevent SQL injection.
        await sql`INSERT INTO people (firstname, lastname) VALUES (${firstName}, ${lastName})`;

        console.log('Data inserted successfully.');
        res.status(200).json({ message: 'Data inserted successfully.' });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
