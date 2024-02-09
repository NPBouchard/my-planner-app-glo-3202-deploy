import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST (request: NextRequest, { params }: { params: { user: string, name: string, date: string, desc: string, location: string } }){
    const user = params.user;
   
    const paramsEventName = params.name;
    const paramsEventLocation = params.location;
    const paramsEventDesc = params.desc;
    const paramsEventDate = params.date;

    const res = await sql`INSERT INTO events (Userid, EventDate, Eventname, Eventdescription, Eventlocation)
    VALUES (${user}, ${paramsEventDate}, ${paramsEventName}, ${paramsEventDesc}, ${paramsEventLocation})`

    const json = {
        res
    };

    return NextResponse.json(json);
}