import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import Article, { TArticle } from '../components/article';

export default function Result() {
  const navigate = useNavigate();
  const { slug } = useParams()
  const { news } = useStore()
  const content = news?.find(artile => artile?.title === slug)
  return (
    <>
      <button onClick={() => {
        navigate(-1); // Go back one step in the history
      }}>Back</button>
      <br />
      {
        content ? <Article meta={content as TArticle}>
          <Article.Title />
          <Article.Img />
          <Article.Source />
          <Article.Description />
        </Article> : <p>Oops!! Content not found</p>
      }
    </>

  )
}
