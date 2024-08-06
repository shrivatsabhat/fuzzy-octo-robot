import { createContext, type Dispatch, useState, type ReactNode } from "react";

type TCentralStore = {
  query: string
  setQuery: Dispatch<React.SetStateAction<string>>
  setNews: Dispatch<React.SetStateAction<Array<Record<string, unknown>>>>
  news: Array<Record<string, unknown>>
}

export const CentralContext = createContext<TCentralStore>({} as TCentralStore)

export default function Provider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [news, setNews] = useState<Array<Record<string, unknown>>>([])

  return <CentralContext.Provider value={{ query, setQuery, news, setNews }}>
    {children}
  </CentralContext.Provider>
}