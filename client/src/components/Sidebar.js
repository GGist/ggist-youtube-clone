import React from "react"
import './Sidebar.css'

export default function Sidebar() {
    const [subscriptions, setSubscriptions] = React.useState([])

    React.useEffect(() => {
        fetchSubscriptions()
            .then(data => setSubscriptions(data))
    }, [])

    const subscriptionElements = subscriptions.map(subscription => {
        return (
            <li key={subscription.page_token} className="sidebar-container--selectable">
                <div className="sidebar-container__data">
                    <img src="https://ggist-youtube-clone.s3.amazonaws.com/assets/default.webp" className="subscription--img" />
                    <span>{subscription.name}</span>
                </div>
            </li>
        )
    })

    const sectionOne = ["Home", "Explore", "Shorts", "Subscriptions"]
    const sectionTwo = ["Library", "History", "Your videos", "Your movies", "Watch later", "Liked videos"]
    const sectionThree = ["Settings", "Report history", "Help", "Send feedback"]
    const sectionMapper = (data) => {
        return (
            <li className="sidebar-container--selectable">
                <div className="sidebar-container__data">
                    {data}
                </div>
            </li>
        )
    }
    const sectionOneElements = sectionOne.map(sectionMapper)
    const sectionTwoElements = sectionTwo.map(sectionMapper)
    const sectionThreeElemenets = sectionThree.map(sectionMapper)

    return (
        <header className="sidebar">
            <ul className="sidebar-container">
                {sectionOneElements}
                <hr></hr>
                {sectionTwoElements}
                <hr></hr>
                <li className="sidebar-container__title">Subscriptions</li>
                {subscriptionElements}
                <hr></hr>
                {sectionThreeElemenets}
            </ul>
        </header>
    )
}

async function fetchSubscriptions() {
    let response = await fetch("/subscriptions?limit=100")
        .then(response => response.json())

    let results = response.results
    let nextPage = response.next_page
    while (nextPage !== '') {
        response = await fetch(`/subscriptions?page=${nextPage}&limit=100`)
            .then(response => response.json())
        
        results = results.concat(response.results)
        nextPage = response.next_page
    }

    return results
}