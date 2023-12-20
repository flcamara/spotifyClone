import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import artist from '@/artist.json'
import type { ArtistProperties, TrackProperties } from '@/@types/songView';

interface SongState {
  isPlaying: boolean;
  audio: HTMLAudioElement | null;
  currentArtist: ArtistProperties;
  currentTrack: TrackProperties;
}

export const useSongStore = defineStore('song', {
  state: (): SongState => ({
    isPlaying: false,
    audio: null,
    currentArtist: {
      name: '',
      albumCover: '',
      releaseYear: '',
      tracks: []
    },
    currentTrack: {
      id: 0,
      name: '',
      path: '',
    }
    }),
  actions: {
    loadSong(artist: ArtistProperties, track: TrackProperties){
      this.currentArtist= artist;
      this.currentTrack = track;

      if (this.audio && this.audio.src){
        this.audio.pause()
        this.isPlaying = false
        this.audio.src = ''
      }

      this.audio = new Audio()
      this.audio.src = track.path

      setTimeout(() => {
        this.isPlaying = true
        if(this.audio)
        this.audio.play()

    }, 200)
    },

    playOrPauseSong(){
      if(this.audio && this.audio.paused){
        this.isPlaying = true
        this.audio.play();
      }else if (this.audio){
        this.isPlaying = false
        this.audio.pause();
      }
    },

    playOrPauseThisSong(artist: ArtistProperties, track: TrackProperties){
      if (!this.audio || !this.audio.src || (this.currentTrack.id !== track.id)){
        this.loadSong(artist, track)
        return
      }

      this.playOrPauseSong()
    },

    prevSong(currentTrack: TrackProperties){
      const track = artist.tracks[currentTrack.id - 2]
      this.loadSong(artist, track)
    },

    nextSong(currentTrack: TrackProperties){
      if(currentTrack.id === artist.tracks.length){
        const track = artist.tracks[0]
        this.loadSong(artist, track)
      }else{
        const track = artist.tracks[currentTrack.id]
        this.loadSong(artist, track)
      }
    },

    playFromFirst() {
      const track = artist.tracks[0]
      this.loadSong(artist, track)
    },

    resetState(){
      this.isPlaying = false
      this.audio = null
      this.currentArtist = {
        name: '',
        albumCover: '',
        releaseYear: '',
        tracks: []
      }
      this.currentTrack = {
        id: 0,
        name: '',
        path: '',
      }
    }
  },
  persist: true
})
