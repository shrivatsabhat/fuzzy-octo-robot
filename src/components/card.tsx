import { createContext, type FC, useContext, type ReactNode, useState } from "react";
import defaultImage from '/react.svg'

type ArticleSource = {
  id?: string;
  name: string;
}


export type TCard = {
  title: string,
  description: string
  source: ArticleSource;
  author: string | null;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}


const CardContext = createContext<TCard>({} as TCard)

const useCard = () => useContext(CardContext)

export default function Card({ children, meta }: Readonly<{ meta: TCard, children: ReactNode }>) {
  return <CardContext.Provider value={meta}>
    <div className='card highlight'>
      {children}
    </div>
  </CardContext.Provider>
}

const Title = () => {
  const { title } = useCard()
  return <h3 className='read-the-title' title={title}>{title}</h3>

}
const Description = () => {
  const { description } = useCard()
  return <p className='read-the-desc' title={description}>{description}</p>
}
const Date = () => {
  const { publishedAt } = useCard()
  return <p className="read-the-date">{publishedAt}</p>
}
const Source = () => {
  const { source } = useCard()
  return <p className="read-the-source" title={source?.name} id={source?.id}>{source?.name}</p>
}
const Author = () => {
  const { author = '' } = useCard()
  return <i className="read-the-source">{author ? 'by ' : ''}{author}</i>
}
const Img = () => {
  const { urlToImage = '', title } = useCard()
  const [imgSrc, setImgSrc] = useState(urlToImage);

  const handleError = () => {
    setImgSrc(defaultImage);
  };
  return <img src={imgSrc} className="thubnail" alt={title} onError={handleError} />
}
const Group: FC<{ children: ReactNode }> = ({ children }) => <div>{children}</div>

const Readmore = () => {
  const { url = '' } = useCard()

  return <>
    {url ? <a target="_blank" href={url}>Read More &gt;&gt;</a> :
      <></>}
  </>
}

Card.Title = Title
Card.Description = Description
Card.Date = Date
Card.Source = Source
Card.Img = Img
Card.Group = Group
Card.Readmore = Readmore
Card.Author = Author