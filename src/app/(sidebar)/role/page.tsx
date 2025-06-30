import HeroPricing from "@/components/HeroPricing"
import PricingSection from "@/components/PricingSection"
import FeaturesComparision from "@/components/FeaturesComparision"
import FeedbackSection from "@/components/FeedbackSection"
import UserInformation from "@/components/UserInformation"
import { SidebarTrigger } from "@/components/ui/sidebar"


export default async function Page() {
  
  return (
    <>
      {/* Header with trigger for mobile */}
        <header className="relative flex h-18 items-center border-b px-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="ml-2 text-lg font-semibold">Pricing</h1>
          <div className="absolute right-8">
            <UserInformation/>
          </div>
        </header>
      <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100">
        <HeroPricing />
        <PricingSection/>
        <FeaturesComparision/>
        <FeedbackSection/>
      </div>
    </>
  )
}
