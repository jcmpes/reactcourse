function YoutubeEmbed({ video }) {
  return (
    <div className="youtube-video">
      <iframe
        width="853"
        height="480"
        src={video}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Youtube video player"
      />
    </div>
  )
}

export default YoutubeEmbed;