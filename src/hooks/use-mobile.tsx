
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    // Initialize with server-side safe check
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  )

  React.useEffect(() => {
    // Set initial state based on window width
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Run on mount
    checkIsMobile()
    
    // Debounce resize event for better performance
    let resizeTimer: ReturnType<typeof setTimeout>
    
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        checkIsMobile()
      }, 100)
    }
    
    window.addEventListener("resize", handleResize)
    
    // Clean up event listener and timer
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return isMobile
}
