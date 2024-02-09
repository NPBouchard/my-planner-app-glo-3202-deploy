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