import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneSong } from '../api/songsAPI'

const SongPageView = () => {
    const [song, setSong] = useState({})
    const { id } = useParams()
    const numID = +id

    useEffect(() => {
        getOneSong(numID).then((song) => setSong(song))
    }, [])

    return (
        <div>
            <h3>
                {song.artist} - {song.title}
            </h3>
            <span>Added by: {song.userId}</span>
            <div className="card">
                <div className="card-body" style={{ whiteSpace: 'pre-wrap' }}>
                    {song.text}
                </div>
            </div>
        </div>
    )
}

export default SongPageView
