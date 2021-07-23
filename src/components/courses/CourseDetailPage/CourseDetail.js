import Head from "next/head";
import Image from "next/image";
import  { Twitter, Facebook } from "react-social-sharing";
import { YoutubeEmbed } from "../../shared";

function CourseDetail({ title, video, description, content, image }) {
  return (
    <>
    <Head>
      <title>{`Teach It Up: ${title}`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={`Curso en Teach It Up: ${description}`}/>
      <meta property="og:image" content={image ? image : null} />
      <meta property="og:title" content={`Teach It Up: ${title}`} />
      <meta property="og:video" content={`https://www.youtube.com/embed/${video}`} />
    </Head>
    <div className="detail-container">
      <div className="detail-image">
        {!image 
          ? null
          : <Image width={150} height={150} src={image} alt=""/>
        }
      </div>
      <div className="detail-title">{title}</div>
      <div className="detail-description">{description}</div>
      <YoutubeEmbed video={video} />
      <div className="detail-content">
        {content}
      </div>
      <div className="deatail-sharer">
        <Facebook link={window.location.href} />
        <Twitter link={window.location.href} />
      </div>
    </div>
    </>
  )
}

export default CourseDetail;