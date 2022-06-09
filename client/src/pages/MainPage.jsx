import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllSongs } from '../api/songsAPI'
import Pagination from '../components/UI/Pagination'
import { setAllSongs, setSongsCount, setPage } from '../features/songs/songsSlice'

const MainPage = () => {
    const dispatch = useDispatch()
    const { allSongs, songsPage } = useSelector((state) => state.songs)

    useEffect(() => {
        getAllSongs().then((data) => {
            dispatch(setAllSongs(data.rows))
            dispatch(setSongsCount(data.count))
            dispatch(setPage(1))
        })
    }, [])

    console.log(allSongs)

    useEffect(() => {
        getAllSongs(null, songsPage).then((data) => {
            dispatch(setAllSongs(data.rows))
            dispatch(setSongsCount(data.count))
        })
    }, [songsPage])

    return (
        <div>
            {!allSongs.length ? (
                <h5 className="text-start">Site is empty 😞</h5>
            ) : (
                <div>
                    <h5 className="text-start">All last added songs:</h5>
                    <ul className="list-group list-group-flush">
                        {allSongs.map((song) => (
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

export default MainPage
