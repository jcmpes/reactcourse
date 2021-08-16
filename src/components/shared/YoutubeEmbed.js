import './YoutubeEmbed.css';

function YoutubeEmbed({ video }) {
  return (
    <div className="youtube-video">
      <iframe
        src={`https://www.youtube.com/embed/${video}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Youtube video player"
      />
    </div>
  );
}

export default YoutubeEmbed;
