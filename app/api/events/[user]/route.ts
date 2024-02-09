// api > hello > route.ts
import {NextRequest, NextResponse} from "next/server";

export async function GET (request: NextRequest){
    const greeting = "In events with user"
    const json = {
        greeting
    };
    
    return NextResponse.json(json);
}