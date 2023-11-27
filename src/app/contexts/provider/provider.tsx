import GuidebarContextProvider from "../GuidebarContextProvider"
import UserContextProvider from "../UserContextProvider"

interface Props {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <GuidebarContextProvider>
      <UserContextProvider>
        { children } 
      </UserContextProvider>
    </GuidebarContextProvider>  
  )
}