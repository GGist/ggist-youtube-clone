import React from "react"
import "./Home.css"
import VideoPreview from "./VideoPreview"

export default function Home() {
    const [videoData, setVideoData] = React.useState([])

    React.useEffect(() => {
        fetchVideos().then(data => {
            setVideoData(data)
        })
    }, [])
    
    const videos = videoData.map(data => {
        return <VideoPreview
                    key={data.page_token}
                    name={data.name}
                    s3Link={data.s3_link}
                    author={data.author}
                    uploadDate={data.upload_date}
                    viewCount={data.view_count}
                    pageToken={data.page_token} />
    })

    return (
        <main className="home">
            {videos}
        </main>
    )
}

async function fetchVideos() {
    let response = await fetch("/videos?limit=100")
        .then(response => response.json())

    let results = response.results
    let nextPage = response.next_page
    while (nextPage !== '') {
        response = await fetch(`/videos?page=${nextPage}&limit=100`)
            .then(response => response.json())
        
        results = results.concat(response.results)
        nextPage = response.next_page
    }
    
    return results
}