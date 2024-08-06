/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios"
import get from "lodash.get"

type ApiSchema = {
  title: string
  author: string
  publishedAt: string
  description: string
  urlToImage: string
  url: string
  source: {
    name: string
    id: string
  }
  content: string, category: string
}

type GenericObject = Record<string, unknown>;

export const api = {
  newsApi: {
    baseUrl: `https://newsapi.org/v2`,
    apiKey: `5655b100a46d4f82b8a6c908da23b990`,//`ab74891323644a1dbd39f47696045f32`,
    url: (q: string, options?: string) => {
      if (q) {
        const otherQuery = options ? options : ''
        return {
          query: `${api.newsApi.baseUrl}/everything?q=${q}&apiKey=${api.newsApi.apiKey}${otherQuery}&pageSize=10&page=1&sortBy=relevancy&searchIn=title,description`,
          schema: (article: GenericObject) => ({
            title: article.title,
            author: article.author || '',
            //@ts-ignore
            publishedAt: new Date(article?.publishedAt).toLocaleDateString() || '',
            description: article.description,
            urlToImage: article.urlToImage || 'No Image Available',
            url: article.url,
            source: {
              //@ts-ignore
              name: article.source.name || '',
              //@ts-ignore
              id: article.source.id || ''
            },
            content: article?.content ?? '',
            category: ''
          }),
          offsetPath: ['data', "articles"],
        }
      }

      return {
        query: `${api.newsApi.baseUrl}/top-headlines/sources?apiKey=${api.newsApi.apiKey}`,
        //@ts-expect-error
        schema: article => ({
          title: article.name || '',
          author: '',
          publishedAt: '',
          description: article.description,
          urlToImage: 'No Image Available',
          url: article.url,
          source: {
            name: article.name || '',
            id: article.id || ''
          },
          content: article?.content ?? '',
          category: article?.category ?? ''
        }),
        offsetPath: ['data', "sources"],
      }
    }
  },
  nytimes: {
    baseUrl: `https://api.nytimes.com/svc`,
    apiKey: `4NH3YCYxeDZ8zX4paKiDGHZWJPr811wa`,
    url: (q: string, options?: string) => {
      if (q) {
        return {
          query: `${api.nytimes.baseUrl}/search/v2/articlesearch.json?q=${q}&api-key=${api.nytimes.apiKey}`,
          //@ts-expect-error
          schema: (article) => {
            return ({
              title: article?.headline?.main || "",
              author: article?.byline?.original || '',
              publishedAt: new Date(article.pub_date).toLocaleDateString() || '',
              description: article.abstract,
              urlToImage: article.multimedia?.[0]?.url || 'No Image Available',
              url: article.web_url || '',
              source: {
                name: 'The New York Times',
                id: article.source || 'the-nytimes'
              },
              content: article?.lead_paragraph ?? '',
              category: article?.section_name || ''
            })
          },
          offsetPath: ['data', 'response', 'docs']
        }

      }
      return {
        query: `${api.nytimes.baseUrl}/topstories/v2/home.json?api-key=${api.nytimes.apiKey}`,
        //@ts-expect-error
        schema: (article) => {
          return ({
            title: article.title,
            author: article?.byline || '',
            publishedAt: new Date(article.published_date).toLocaleDateString() || '',
            description: article.abstract,
            urlToImage: article.multimedia?.[0]?.url || 'No Image Available',
            url: article.url,
            source: {
              name: 'The New York Times',
              id: 'The New York Times'
            },
            content: article?.content ?? '',
            category: ''
          })
        },
        offsetPath: ['data', 'results']
      }
    }
  },
  guardian: {
    baseUrl: `https://content.guardianapis.com`,
    apiKey: `07bb56d4-3a2a-4d2f-abf8-7506e7d31b5e`,
    url: (q: string, _options?: string) => {
      if (q) {
        return {
          query: `${api.guardian.baseUrl}/search?page=1&q=${q}&api-key=${api.guardian.apiKey}`,
          schema: (article: GenericObject) => {
            return ({
              title: article?.webTitle || "",
              author: '',
              //@ts-expect-error
              publishedAt: new Date(article.webPublicationDate).toLocaleDateString() || '',
              description: "",
              urlToImage: 'No Image Available',
              url: article.webUrl || '',
              source: {
                name: 'The Guradian',
                id: 'the-guardian'
              },
              content: article?.lead_paragraph ?? '', category: article?.sectionName || ''
            })
          },
          offsetPath: ['data', 'response', 'results']
        }
      }

      return {
        query: '',
        schema: (article: GenericObject) => { console.log(article) },
        offsetPath: []
      }
    }
  }
}

// fn to fetch 
// if fail throw error
// if pass, apply schema, 
// return data

const fetchNewApi = async (q: string, options?: string) => {
  const entry = api.newsApi.url(q, options)
  return await axios.get(entry.query).then((data) => get(data, entry.offsetPath, []).map(entry.schema)).catch(error => ({ error }));
}

const fetchNyTimes = async (q: string, options?: string) => {
  const entry = api.nytimes.url(q)
  return await axios.get(entry.query).then((data) => get(data, entry.offsetPath, []).map(entry.schema)).catch(error => ({ error }));
}

const fetchGuradian = async (q: string, options?: string) => {
  const entry = api.guardian.url(q)
  return await axios.get(entry.query).then((data) => get(data, entry.offsetPath, []).map(entry.schema)).catch(error => ({ error }));
}

export const fetchData = async ({ query, options }: { query: string, options?: string }) => {
  const fetchPromises = [fetchNewApi(query, options), fetchNyTimes(query), fetchGuradian(query)]
  const results = await Promise.allSettled(fetchPromises);
  const responce = [] as ApiSchema[]
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.info(`Fetch ${index} succeeded with`, result.value);
      responce.push(result.value)

    } else if (result.status === 'rejected') {
      console.error(`Fetch ${index} failed with`, result.reason);
    }
  });

  return { data: responce.flat() }
} 