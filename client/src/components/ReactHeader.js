import React from "react"
import "./ReactHeader.css"

export default function ReactHeader() {
    return (
        <header className="react-header">
            <div className="container">
                <div className="container-left">
                    <img src="logo192.png" />
                </div>
                <div className="container-middle">
                    <input type="text" />
                    <button>Search</button>
                </div>
                <div className="container-right">

                </div>
            </div>
        </header>
    )
}