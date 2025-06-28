"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, UserPlus } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { FriendUser } from "@/type"
import { FriendsLoadingSkeleton } from "@/components/skeleton-friends"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import BananaLoading from "@/components/BananaLoading"



export default function FriendsList() {
  const [isRedirect, setIsRedirect] = useState(false)
  const { data, isLoading, error } = useQuery({
    queryKey: ['Friends'],
    queryFn: async () => {
      const response = await fetch(`/api/friends`)
      const data = await response.json();
      if (!response.ok) {
          throw new Error(data.message || 'Network response was not ok')
      }
      return data as FriendUser[];
    },
    staleTime: 0, 
  })
  const route = useRouter()
  if (isLoading) {
    return <FriendsLoadingSkeleton />
  }
  if (error) {
    toast.error(`${error}`)
    return null
  }

  async function handleRedirect(userId : string){
    setIsRedirect(true)
    route.push(`/users/${userId}`)
  }

  return (
    <div className="space-y-3">
      {data?.map((friend) => (
        <div
          key={friend._id}
          onClick={()=>{
            handleRedirect(friend._id)
          }}
          className="
          hover:cursor-pointer
          flex 
          items-start 
          justify-between 
          p-4 rounded-lg 
          bg-white border
          border-slate-100
          hover:border-slate-200 
          transition-colors"
        >
          <div className="flex items-start space-x-3 flex-1">
            <div className="relative flex-shrink-0">
              <Avatar className="h-12 w-12">
                <AvatarImage src={friend.avatarUrl } alt={friend.name} />
                <AvatarFallback>
                  {friend.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-slate-900 truncate">{friend.name}</p>
                <Badge variant={friend.role === "Pro Plan" ? "default" : "secondary"} className="text-xs flex-shrink-0">
                  {friend.role}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 truncate mb-1">{friend.email || "unknown  email"}</p>
              <p className="text-xs text-slate-500 truncate mb-1">{friend.location || "unknown location"}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2 flex-shrink-0 ml-3">
            <Button size="sm" variant="ghost" className="hover:cursor-pointer h-8 w-8 p-0">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      {data?.length === 0 && (
        <div className="text-center py-8">
          <UserPlus className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 mb-2">No friends yet</p>
          <p className="text-sm text-slate-500">Start connecting with people!</p>
        </div>
      )}

      {isRedirect && <BananaLoading isRedirect={isRedirect}/>}
    </div>
  )
}
