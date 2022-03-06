import React from "react"
import "./Header.css"

export default function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-container__logo">
                    <img src="logo192.png" height="37px" width="37px" />
                    <div>ReactTube</div>
                </div>
                <div className="header-container__search">
                    <input type="text" />
                    <button><img src="logo192.png" height="28px" width="28px" /></button>
                </div>
                <div className="header-container__account">
                    <img src="https://ggist-youtube-clone.s3.amazonaws.com/assets/default.webp" height="30px" width="30px" alt="video" />
                </div>
            </div>
        </header>
    )
}