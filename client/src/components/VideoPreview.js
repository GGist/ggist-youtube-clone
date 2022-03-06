import React from "react"
import "./VideoPreview.css"

export default function VideoPreview({ name, s3Link, author, uploadDate, viewCount, pageToken }) {
    let date = new Date(uploadDate);

    return (
        <div className="video-preview">
            <img className="video-preview__img" src={s3Link} alt="video" />
            <div className="video-preview__icon-data">
                <img className="video-preview__img--small" src={s3Link} alt="video"/>
                <div className="video-preview__data">
                    <h3 className="video-preview__data--large">{name}</h3>
                    <div className="video-preview__data--small">{author}</div>
                    <div className="video-preview__data--small">{`${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`} • {viewCount} views</div>
                </div>
            </div>
        </div>
    )
}