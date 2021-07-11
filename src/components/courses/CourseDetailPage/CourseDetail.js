function CourseDetail({ title, featuredImage, video, description, content }) {
  return (
    <div className="detail-container">
      <div className="detail-title">{title}</div>
      <div className="detail-description">{description}</div>
      <div className="detail-video">
        <iframe width="560" height="315" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div className="detail-content">
        {content}
      </div>
    </div>  
  )
}

export default CourseDetail;