import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { createSongAPI } from '../api/songsAPI'
import { useDispatch } from 'react-redux'
import { addSong } from '../features/songs/songsSlice'

const SongPageCreate = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const [songInfo, setSongInfo] = useState({
        id: Date.now(),
        artist: '',
        title: '',
        text: '',
        userId: user.id,
    })

    const createSong = async (event) => {
        event.preventDefault()
        try {
            if (songInfo.artist.trim() || songInfo.title.trim() || songInfo.text.trim()) {
                await createSongAPI({
                    id: Date.now(),
                    artist: songInfo.artist,
                    title: songInfo.title,
                    text: songInfo.text,
                    userId: user.id,
                })
                dispatch(addSong(songInfo))
                setSongInfo({
                    id: Date.now(),
                    artist: '',
                    title: '',
                    text: '',
                    userId: user.id,
                })
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <form className="row g-3" onSubmit={createSong}>
            <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label"></label>
                <input
                    type="text"
                    className="form-control"
                    id="Artist"
                    placeholder="Artist"
                    value={songInfo.artist}
                    onChange={(event) =>
                        setSongInfo({ ...songInfo, artist: event.target.value })
                    }
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label"></label>
                <input
                    type="text"
                    className="form-control"
                    id="Title"
                    placeholder="Title"
                    value={songInfo.title}
                    onChange={(event) =>
                        setSongInfo({ ...songInfo, title: event.target.value })
                    }
                />
            </div>
            <div className="col-12">
                <textarea
                    className="form-control"
                    aria-label="With textarea"
                    placeholder="Text"
                    style={{ height: 400 }}
                    value={songInfo.text}
                    onChange={(event) =>
                        setSongInfo({ ...songInfo, text: event.target.value })
                    }
                ></textarea>
            </div>
            <button
                type="submit"
                className="btn btn-secondary"
                disabled={
                    !songInfo.artist.trim() ||
                    !songInfo.title.trim() ||
                    !songInfo.text.trim()
                }
            >
                Send
            </button>
        </form>
    )
}

export default SongPageCreate
