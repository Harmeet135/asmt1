import { ChevronLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between p-4 lg:px-8 lg:py-6 bg-transparent">
      <div className="flex items-center gap-3">
        <ChevronLeft className="h-6 w-6 text-foreground" />
        <span className="text-sm text-muted-foreground">Back</span>
      </div>

      <h1 className="text-lg lg:text-2xl font-semibold text-foreground">Dashboard</h1>

      <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
        <AvatarImage src="/professional-woman-avatar.png" alt="Profile" />
        <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
      </Avatar>
    </div>
  )
}
