import { host, authHost } from './api'

export const createSongAPI = async (id, artist, title, text, userId) => {
    const { data } = await authHost.post('api/songs/', id, artist, title, text, userId)
    return data
}

export const getAllSongs = async (userId, page, limit) => {
    const { data } = await host.get(`api/songs/`, { params: { userId, page, limit } })
    return data
}

export const getOneSong = async (id) => {
    const { data } = await host.get(`api/songs/${id}`)
    return data
}
