import  { Twitter, Facebook } from "react-social-sharing";
import { YoutubeEmbed } from "../../shared";


function CourseDetail({ title, video, description, content, image }) {
  return (
    <div className="detail-container">
      <div className="detail-image">
        <img src={`/public/images/${image}`} />
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
  )
}

export default CourseDetail;