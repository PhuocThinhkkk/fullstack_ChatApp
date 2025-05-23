import { SidebarTrigger } from "@/components/ui/sidebar"
import ButtonCreateRoom from "@/components/ButtonCreateRoom"
import SearchRoom from "@/components/SearchRoom";
import AllRooms from "@/components/AllRooms";
import { Suspense } from "react";
import RoomsLoadingSkeleton from "./loading";

const Page = () => {
  return (
    <>
    {/* Header with trigger for mobile */}
    <header className="relative flex h-18 items-center border-b px-4">
      <SidebarTrigger className="md:hidden" />
      <h1 className="ml-2 text-lg font-semibold">Rooms</h1>
      <div className="absolute right-7 h-full  top-4">
        <ButtonCreateRoom/>
      </div>
    </header>

    <div className="space-y-8">
      
      <p className="m-4 text-center text-3xl font-bold "> Enter your rooms name:</p>
      <div className="flex justify-center min-w-full">
          <div className="relative w-4/5 lg:w-2/3 h-12 mx-auto">
            <SearchRoom/>
          </div>
      </div>
      <Suspense fallback={<RoomsLoadingSkeleton/>}>
        <AllRooms/>
      </Suspense>
    
    </div>
    </>
    
  )
}

export default Page