
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Set initial state based on window width
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Run on mount
    checkIsMobile()
    
    // Set up event listener for window resize
    const handleResize = () => {
      checkIsMobile()
    }
    
    window.addEventListener("resize", handleResize)
    
    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}
