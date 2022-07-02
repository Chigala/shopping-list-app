import { useMediaQuery } from "react-responsive"

export const useDesktopMediaQuery = () =>
  useMediaQuery({ query: "(min-width: 1280px)" })

export const useTablet = () =>
  useMediaQuery({ query: "(max-width: 767px)" })

export const useMobile = () => 
useMediaQuery({ query: '(max-width: 480px)' })

export const usePotrait = () => useMediaQuery({ query: '(orientation: portrait)' })

  