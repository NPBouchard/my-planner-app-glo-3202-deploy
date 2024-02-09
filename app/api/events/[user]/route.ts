import {NextRequest, NextResponse} from "next/server";
import { sql } from "@vercel/postgres";


export async function GET (request: NextRequest, { params }: { params: { user: string } }){
    const user = params.user;
   
    const { rows } = await sql`SELECT * FROM events WHERE Userid = ${user}`

    const json = {
        rows
    };

    return NextResponse.json(json);
}

export async function POST(request: NextRequest, { params }: { params: { user: string } }) {
    // Ensure the request has a body
    if (request.body) {
        const { name, date, location, description } = await request.json();
        const user = params.user;

        // Insert the new event into the database
        await sql`
            INSERT INTO events (Userid, Eventdate, Eventname, Eventdescription, Eventlocation)
            VALUES (${user}, ${date}, ${name}, ${description}, ${location})
        `;

        // Return a response to confirm the insertion
        return NextResponse.json({ message: "Event added successfully" });
    } else {
        // Handle cases where the request does not have a body
        return NextResponse.json({ error: "Request body is missing" }, { status: 400 });
    }
}


