import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { error } from "console";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


// Get Single User 
export async function GET( 
    req: Request,
    { params } : { params: Promise<{ id: string }>} // Params is a promise: 
){

    // Await for the params promise 
    const { id } = await params;

    // Convert the id to number
    const userId = Number(id);

    // Check to see if the conversion was correct to prevent the code from failing (to prevent DB errors)
    if (isNaN(userId)){
        return NextResponse.json({ error: "Invalid ID format"}, {status: 400});
    }

    const data = await db 
        .select()
        .from(users)
        .where(eq(users.id, userId));

    if(data.length === 0) {
        return NextResponse.json({ error: "User not found" }, {status: 404})
    }

    return NextResponse.json(data[0])
}

// Update the user info 
export async function PUT(
    req: Request,
    { params } : { params: Promise<{id: string}> }
){
    const { id } = await params;

    const userId = Number(id)

    const body = await req.json()

    if (isNaN(userId) || !body){
        return NextResponse.json({ error: "Invalid ID or DATA format"}, {status: 400});
    }

    const updated = await db
        .update(users)
        .set({
            email: body.email,
            name: body.name
        })
        .where(eq(users.id, userId))
        .returning();
    
    if(updated.length === 0){
        return NextResponse.json({ error: "User not found" }, {status: 404})
    }

    return NextResponse.json(updated[0])
}


// Delete a user 
export async function DELETE(
    req: Request,
    { params } : { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const userId = Number(id)

    const deleted = await db    
        .delete(users)
        .where(eq(users.id, userId))
        .returning();

    if(deleted.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
        message: "User deleted successfully",
        user: deleted[0],
    });
}