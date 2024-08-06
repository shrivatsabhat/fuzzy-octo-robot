import { useContext } from "react"
import { CentralContext } from "../central-context"

export const useStore = () => {
  const context = useContext(CentralContext)
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context
}