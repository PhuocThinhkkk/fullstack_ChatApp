import { Card, CardContent,} from "@/components/ui/card"
import connectDB from "@/lib/mongoDb"
import { getUserIdInSession } from "@/lib/session";
import { UIError } from "./ui-error"
import { MessageCircle, Users, Zap, TrendingUp } from "lucide-react"
import { RoomDb, UserDB } from "@/type"
import MESSAGE from "@/schema/message"
import RoomCard from "./RoomCard"
import { getUserByIdWithRoom } from "@/lib/db/userdb";



const AllRooms = async () => {
  try{
    const userIdInSession = await getUserIdInSession();
    if(!userIdInSession) {
      return <UIError className="w-full text-center" title="Please sign in to see this page"/>
    }
    const user : UserDB  = await getUserByIdWithRoom(userIdInSession)
    if(!user) {
      return <UIError className="w-full text-center" title="Please sign in to see your rooms "/>
    }

    if(!user.rooms || user.rooms.length == 0) {
      return (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 mb-2">No rooms available</p>
          <p className="text-sm text-slate-500">Create the first room to get started!</p>
        </div>)
    }
    
    
    
    return (
    <>

      <RoomsStats rooms={user.rooms} userId={userIdInSession}/>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {user.rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    
    </>  
   
       
        
    )
  }catch(e){
    console.log(e)
    return <UIError title={`${e}`}/>
  }
}

async function RoomsStats ({ rooms, userId } : { rooms : RoomDb[], userId : string}) {
  await connectDB()
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(24, 0, 0, 0));

  const countMessage = await MESSAGE.countDocuments({
    user: userId,
    createdAt: {
      $gte: startOfDay,
      $lt: endOfDay
    }
});
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2 mx-4">
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Rooms</p>
              <p className="text-3xl font-bold">{rooms.length}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Maximum Users</p>
              <p className="text-3xl font-bold">{rooms.reduce((sum, room) => sum + room.maxPeople, 0)}</p>
            </div>
            <Users className="w-8 h-8 text-green-200" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Members</p>
              <p className="text-3xl font-bold">{rooms.reduce((sum, room) => sum + room.users.length, 0)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-200" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Messages Today</p>
              <p className="text-3xl font-bold">{countMessage}</p>
            </div>
            <Zap className="w-8 h-8 text-orange-200" />
          </div>
        </CardContent>
      </Card>
    </div>

  )
}

export default AllRooms