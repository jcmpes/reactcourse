import { Twitter, Facebook } from 'react-social-sharing';
import { YoutubeEmbed } from '../../shared';

function LessonDetail({ title, video, description, content, numFavs }) {
  return (
    <div className="detail-container">
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
