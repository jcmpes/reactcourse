import { Link } from 'react-router-dom';
import { Twitter, Facebook } from 'react-social-sharing';
import { Button, YoutubeEmbed } from '../../shared';

function LessonDetail({ title, video, description, content, image, numFavs }) {
  return (
    <div className="detail-container">
      <div className="detail-image">
        <img style={{ width: '150px', height: '150px' }} src={image} alt="" />
      </div>
      <div className="detail-title">{title}</div>
      <div className="detail-description">{description}</div>
      <YoutubeEmbed video={video} />
      <div className="detail-content">{content}</div>
      <div className="deatail-sharer">
        <Facebook link={window.location.href} />
        <Twitter link={window.location.href} />
      </div>
      <div>
        Tiene {numFavs} favorito{numFavs === 1 ? '' : 's'}
      </div>
    </div>
  );
}

export default LessonDetail;
