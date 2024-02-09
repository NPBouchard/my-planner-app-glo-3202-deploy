import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest, { params }: { params: { user: string, name: string, date: string, desc: string, location: string } }) {
    // Basic input validation (example)
    if (!params.user || !params.name || !params.date || !params.desc || !params.location) {
        return new NextResponse(JSON.stringify({ error: "Missing required parameters" }), { status: 400 });
    }

    try {
        const res = await sql`INSERT INTO events (Userid, EventDate, Eventname, Eventdescription, Eventlocation)
        VALUES (${params.user}, ${params.date}, ${params.name}, ${params.desc}, ${params.location})`;

        const json = { res };

        return NextResponse.json(json);
    } catch (error) {
        console.error('Database operation failed:', error);
        // Return a generic error message to the client
        // It's important not to expose sensitive error details in production
        return new NextResponse(JSON.stringify({ error: "Failed to create event" }), { status: 500 });
    }
}
