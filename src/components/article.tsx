import { createContext, type FC, useContext, type ReactNode } from "react";

export type TArticle = {
  title: string,
  description?: string
  date?: `${number} ${string} ${number}`
  source: string
  img?: {
    src: string,
    alt?: string
  }
}
const ArticleContext = createContext<TArticle>({} as TArticle)

const useArticle = () => useContext(ArticleContext)

export default function Article({ children, meta }: Readonly<{ meta: TArticle, children: ReactNode }>) {
  return <ArticleContext.Provider value={meta}>
    <div>
      {children}
    </div>
  </ArticleContext.Provider>
}

const Title = () => {
  const { title } = useArticle()
  return <h2 className='read-the-article-title' title={title}>{title}</h2>

}
const Description = () => {
  const { description } = useArticle()
  return <p className='read-the-article-desc' title={description}>{JSON.stringify(description, undefined, 2)}</p>
}
const Date = () => {
  const { date } = useArticle()
  return <p className="read-the-date">{date}</p>
}
const Source = () => {
  const { source } = useArticle()
  return <p className="read-the-source">{source}</p>
}
const Img = () => {
  const { img } = useArticle()
  return <img src={img?.src ?? ''} className="banner" alt={img?.alt ?? ''} />
}
const Group: FC<{ children: ReactNode }> = ({ children }) => <div>{children}</div>

Article.Title = Title
Article.Description = Description
Article.Date = Date
Article.Source = Source
Article.Img = Img
Article.Group = Group