import GuidebarContextProvider from "../GuidebarContextProvider"
import { TooltipContextProvider } from "../TooltipContextProvider"

interface Props {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <GuidebarContextProvider>
      <TooltipContextProvider>
        { children } 
      </TooltipContextProvider>
    </GuidebarContextProvider>  
  )
}