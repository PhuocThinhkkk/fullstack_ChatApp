import  { NextResponse, type NextRequest } from "next/server";
import MESSAGE from "@/schema/message";
import connectDB from "@/lib/mongoDb";



export async function GET( req : NextRequest , {params} : {params : Promise<{roomid : string}>}){
  try{
    const { roomid } = await params;
    console.log("room id ", roomid)
    await connectDB()
    const messages = await MESSAGE.find({ roomName : roomid });
    if(messages.length === 0 ) return NextResponse.json({messages: "no data in this room"}, {status : 400});
    console.log(messages)
    return NextResponse.json(messages, {status: 200})

  }catch(err){
    console.log("error when getting room's messages :", err);
    return NextResponse.json({message: `error when getting room's messages ${err}`}, {status: 500});
  }
}


export async function POST( req : NextRequest ) { 
  try{
    const data = await req.json();
    if(!data)  return NextResponse.json({ message: 'Content is required' },{ status: 400 });
    const { userId , roomName, info } : {userId: string, roomName: string, info: string}= data;

    await connectDB(); 

    await MESSAGE.create(
      {
        userId,
        roomName,
        info,
      }
    );

    return NextResponse.json({message: `create message to db`}, {status: 200});
  }catch(err){
    console.log("error: ", err);
    return NextResponse.json({message: `error ${err} when create message`}, {status: 500 })
  }
  
  





}