import connectDB from "@/lib/mongoDb";
import Room from "@/schema/room";
import { type NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
    try{
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        await connectDB();

        const rooms = await Room.find({ leaderId : userId })
        if(rooms.length == 0) {
            return NextResponse.json({message: 'you dont have any room. '}, {status: 400})
        }
        return NextResponse.json(rooms,{status: 200})
    }catch(err){
        return NextResponse.json({message: `something wrong with server ${err}`}, {status: 500})
    }
}