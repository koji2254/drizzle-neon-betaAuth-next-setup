import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { error } from "console";
import { NextResponse } from "next/server";

// Get all users
export async function GET() {
    const data = await db.select().from(users);

    // returns an empty array [] 
    return NextResponse.json(data)
}


// Create a a new User 
export async function POST(req: Request){
    let body;

    try {
        body = await req.json()

    } catch (error) {
        return NextResponse.json({ error: "Invalid json" + error }, { status: 400 })
    }

    if(!body.email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const inserted = await db  
        .insert(users)
        .values({
            email: body.email,
            name: body.name,
        })
        .returning();

    return NextResponse.json(inserted)
}






