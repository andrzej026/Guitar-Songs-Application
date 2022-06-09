import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllSongs } from '../api/songsAPI'
import Pagination from '../components/UI/Pagination'
import { setUserSongs, setSongsCount, setPage } from '../features/songs/songsSlice'

const PersonalPage = () => {
    const dispatch = useDispatch()
    const { userSongs, songsPage } = useSelector((state) => state.songs)
    const user = useSelector((state) => state.user.user)
    const userId = user.id

    useEffect(() => {
        getAllSongs(userId).then((data) => {
            dispatch(setUserSongs(data.rows))
            dispatch(setSongsCount(data.count))
            dispatch(setPage(1))
        })
    }, [])

    useEffect(() => {
        getAllSongs(userId, songsPage).then((data) => {
            dispatch(setUserSongs(data.rows))
            dispatch(setSongsCount(data.count))
        })
    }, [songsPage])

    return (
        <div>
            {!userSongs.length ? (
                <h5 className="text-start">
                    Your songbook is empty. <Link to="/create">Fix it!</Link>
                </h5>
            ) : (
                <div>
                    <h5 className="text-start">Your last added songs:</h5>
                    <ul className="list-group list-group-flush">
                        {userSongs.map((song) => (
                            <li key={song.id} className="list-group-item ps-0">
                                <div className="input-group-text d-flex justify-content-between align-items-center">
                                    {song.artist} - {song.title}
                                    <Link
                                        to={`/song/${song.id}`}
                                        target="_blank"
                                        rel="nofollow noopener noreferrer"
                                        className="text-decoration-none"
                                    >
                                        <i className="bi bi-cursor-fill text-dark">
                                            Open
                                        </i>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <Pagination />
        </div>
    )
}

export default PersonalPage
