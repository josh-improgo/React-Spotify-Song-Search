import React, { useState } from 'react'
import ReactDOM from 'react-dom'

export default function Search() {
    const [song, setSong] = useState('')
    const input = document.querySelector('#search')
    const tracksDiv = document.querySelector('.tracks')

    const token = process.env.REACT_APP_TOKEN
    const handleClick = async () => {
        const url = 'https://api.spotify.com/v1/search?'
        const type = 'type=track'
        const market = 'market=US'
        const limit = 'limit=10'
        const queryParams = 'q=' + song
        const endPoint = `${url}${queryParams}&${type}&${market}&${limit}`
        // fetch(endPoint, {
        //     method: 'GET',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         Authorization: 'Bearer ' + token, 
        //     }
        // })
        //     .then(response => response.json())
        //     .then(responseJson => console.log(responseJson))

        const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        })

        const jsonResponse = await response.json();

        tracksDiv.innerHTML = ''

        console.log(jsonResponse)
        jsonResponse["tracks"]["items"].map(item => {
            tracksDiv.insertAdjacentElement('beforeend', createTrack(item))
        })
    }

    const createTrack = ({ name, artists, external_urls }) => {
        let trackDiv = document.createElement('div')
        trackDiv.className = 'track'
        trackDiv.innerHTML = `<a href="${external_urls["spotify"]}">${name} by ${artists.map(({ name }) => name).join(', ')}</a>`
        return trackDiv;
    }

    return (
        <div className="content">
            <h1 className="title">Spotify Song Search</h1>

            <label className="label" htmlFor="search">
                Song Name:
        </label>
            <input id="search" name="search" type="text" placeholder="i.e. Gravity - Timeflies" onChange={({target}) => {setSong(target.value)
                console.log(target.value)}}/>
            <button className="button" onClick={handleClick}>Search</button>
            <div className="tracks">

            </div>
        </div>
    )
}
