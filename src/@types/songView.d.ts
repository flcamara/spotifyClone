export interface SongRowProperties {
    track?: TrackProperties,
    artist?: ArtistProperties,
    index?: number
}

export interface ArtistProperties {
    name: string
    albumCover: string
    releaseYear: string
    tracks: SongProperties[]
}

export interface TrackProperties{
    id: number
    name: string
    path: string
}