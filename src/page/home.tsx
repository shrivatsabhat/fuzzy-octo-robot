/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react"
import Card, { TCard } from "../components/card"
import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../utils/services"
import { deleteKeyFromObject } from "../utils/deleteKeyFromObject"
import Input from "../components/input"
import { isValidUrl } from "../utils/isValidUrl"
import { formatDate } from "../utils/formatDate"
import { FilterScroll } from "../components/filterScroll"

export type TSource = {
  id: null | string,
  name: null | string
};
interface Filters {
  author?: string;
  source?: TSource
  category?: string;
  fromDate?: string;
}

interface MetaInfo {
  authors: string[];
  sources: TSource[];
  categories: string[];
}


export default function Home() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<Filters>({});
  const [metaInfo, setMetaInfo] = useState<MetaInfo>({ authors: [], sources: [], categories: [] });

  const { data, isFetching, isSuccess, error } = useQuery({
    queryKey: ['articles', { search }],
    queryFn: () => fetchData({ query: search, options: filters?.fromDate ? `&from=${formatDate(filters.fromDate)}` : '' }).then(({ data }) => {
      try {
        const authors = Array.from(new Set(data.map((article: { author: string }) => article?.author).filter((author: string) => !isValidUrl(author) && Boolean(author)))) as string[];
        const sources = Array.from(new Set(data.map((article: { source: TSource }) => JSON.stringify(article?.source)))
          .values())
          .map(item => JSON.parse(item)) as TSource[]
        // Assuming 'category' field exists in the article object
        const categories = Array.from(new Set(data.map((article: { category?: string }) => article?.category).filter(Boolean))) as string[];

        setMetaInfo({ authors, sources, categories });
      } catch (error) {
        console.error(error)
      }
      return data
    }),
    enabled: !!search,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const applyFilters = (article: { author: string; source: { name: string | null }; category: string; publishedAt: string | number | Date }) => {
    const matchesAuthor = filters.author ? article.author === filters.author : true;
    const matchesSource = filters.source ? article.source?.name === filters.source?.name : true;
    const matchesCategory = filters.category ? article.category === filters.category : true;
    const matchesDate = filters.fromDate ? new Date(article.publishedAt).toLocaleDateString() === filters.fromDate : true;

    return matchesAuthor && matchesSource && matchesCategory && matchesDate;
  };

  return <>
    <Input onChange={({ search: q }) => {
      setSearch(q)
    }} />
    <section className="filters">
      <p className="read-the-source">Filter Search</p>
      <input className="input date" type="date" onChange={e => setFilters(o => ({ ...o, fromDate: e.target.value ? new Date(e.target.value).toLocaleDateString() : '' }))} />
      {metaInfo?.sources.length ? <p className="read-the-source">Filter by source</p> : <></>}
      <section className="horizontal">
        {metaInfo?.sources.map(source => <button onClick={() => setFilters(o => deleteKeyFromObject(o, 'source', source))} className={filters?.source === source ? 'selected' : ''} key={source.id}>{source?.name}</button>)}
      </section>
      <FilterScroll label="Filter by authors" list={metaInfo?.authors} selected={filters.author} onClick={(author) => setFilters(o => deleteKeyFromObject(o, 'author', author))} />
      <FilterScroll label="Filter by categories" list={metaInfo?.categories} selected={filters.category} onClick={(category) => setFilters(o => deleteKeyFromObject(o, 'category', category))} />
    </section>



    <main className="container">
      {isFetching && <p>loading...</p>}
      {error ? <p>{error.message}</p> : ''}
      {/* {isSuccess && data && <pre>{JSON.stringify(data?.filter(applyFilters), undefined, 2)}</pre>} */}
      {isSuccess && data && data?.filter(applyFilters).map((item: TCard) => {
        return <Card meta={item} key={item.title}>
          <Card.Group>
            <Card.Title></Card.Title>
            <Card.Author />
            <Card.Description></Card.Description>
            <Card.Readmore></Card.Readmore>
          </Card.Group>
          <Card.Img />
          <Card.Date />
          <Card.Source />
        </Card>
      })}
    </main>
  </>
}
