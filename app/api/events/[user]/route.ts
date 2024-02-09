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

export async function POST (request: NextRequest, { params }: { params: { user: string } }){
    const user = params.user;
   
    const paramsEventName = request.nextUrl.searchParams.get("name");
    const paramsEventLocation = "TBA";
    const paramsEventDesc = request.nextUrl.searchParams.get("description");
    const paramsEventDate = request.nextUrl.searchParams.get("date");

    const res = await sql`INSERT INTO events (Userid, EventDate, Eventname, Eventdescription, Eventlocation)
    VALUES (${user}, ${paramsEventDate}, ${paramsEventName}, ${paramsEventDesc}, ${paramsEventLocation})`

    const json = {
        res
    };

    return NextResponse.json(json);
}
