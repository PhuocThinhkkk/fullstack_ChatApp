import { CalendarDays, MapPin, Mail, Edit, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, } from "@/components/ui/card"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getUser } from "./getUser"
import { getUserInSession } from "@/lib/auth"
import Image from "next/image"



export default async function ProfileComponent() {
    
    const payload  = await getUserInSession()
    if (!payload) {
        return <div> you dont have session. </div>
    }
    const userId : string = payload.userId as string
    const user = await getUser( userId );
    if(!user) return null
    console.log(user)
    
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="border-none shadow-none ">
        {/* Cover Image */}
        <div className="h-48 bg-slate-100 rounded-t-lg" >
            { 
                user.backGroundUrl ?
                <Image
                    src={ user.backGroundUrl }
                    alt= "user background"
                /> : null
            }
            
        </div>

        {/* Profile Header */}
        <div className=" px-6">
          <div className="flex flex-col sm:flex-row gap-6 -mt-12 sm:-mt-16">
            <Avatar className="relative bottom-5 h-24 w-24 sm:h-32 sm:w-32 border-4 border-background">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 pt-4 sm:pt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">
                    {user.role}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className=" hover:cursor-pointer">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost"  className=" hover:cursor-pointer">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Share Profile</DropdownMenuItem>
                      <DropdownMenuItem>Report User</DropdownMenuItem>
                      <DropdownMenuItem>Block User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  Location: 
                        { " " + ( user.location ?? "Unknown") }
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-1 h-4 w-4" />
                    Email: 
                        {" "+user.email}
                  
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="mr-1 h-4 w-4" />
                    Day creat account: 
                        {" "+user.joinAt}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm">{user.bio}</p>
          </div>

          

          <div className="flex justify-between my-10 border-b w-full">
            <div className="text-center">
              <p className="font-bold text-2xl">{user.roomsLen.toLocaleString()}</p>
              <p className="text-xl text-muted-foreground">Rooms joining</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl">{user.roomsOwnLen.toLocaleString()}</p>
              <p className="text-xl text-muted-foreground">Rooms Owning</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl">{user.messagesSent}</p>
              <p className="text-xl text-muted-foreground">Total Messages Sent</p>
            </div>
          </div>
        </div>

        
      </Card>
    </div>
  )
}
