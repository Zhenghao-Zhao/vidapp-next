import GuidebarContextProvider from "../GuidebarContextProvider"
import AuthContextProvider from "../AuthContextProvider"

interface Props {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <GuidebarContextProvider>
      <AuthContextProvider>
        { children } 
      </AuthContextProvider>
    </GuidebarContextProvider>  
  )
}