import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from '../../features/songs/songsSlice'

const Pagination = () => {
    const dispatch = useDispatch()
    const { songsCount, songsLimit, songsPage } = useSelector((state) => state.songs)
    const pagesCount = Math.ceil(songsCount / songsLimit)
    const pages = []

    for (let i = 0; i < pagesCount; i++) {
        pages.push(i + 1)
    }

    return (
        <ul className="pagination">
            {pages.map((page) => (
                <li
                    key={page}
                    className={songsPage === page ? 'page-item active' : 'page-item'}
                    onClick={() => dispatch(setPage(page))}
                >
                    <span className="page-link">{page}</span>
                </li>
            ))}
        </ul>
    )
}

export default Pagination
