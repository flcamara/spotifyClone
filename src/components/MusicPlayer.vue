<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'

import Heart from 'vue-material-design-icons/Heart.vue'
import PictureInPictureBottomRight from 'vue-material-design-icons/PictureInPictureBottomRight.vue'
import Play from 'vue-material-design-icons/Play.vue'
import Pause from 'vue-material-design-icons/Pause.vue'
import SkipBackward from 'vue-material-design-icons/SkipBackward.vue'
import SkipForward from 'vue-material-design-icons/SkipForward.vue'
// import type { storeToRefs } from 'pinia'

import { useSongStore } from '@/stores/song'
import { storeToRefs } from 'pinia'
import { watch } from 'fs'
import type { TrackProperties } from '@/@types/songView'
const useSong = useSongStore()

const { isPlaying, audio, currentTrack, currentArtist } = storeToRefs(useSong)


const isHover = ref(false)
const isTrackTimeCurrent = ref<string>()
const isTrackTimeTotal = ref<string>()
const seeker = ref()
const seekerContainer = ref(null)
const range = ref(0)

const timeupdate = () => {
    audio.value?.addEventListener('timeupdate', function() {
        if (audio.value) {
            const currentTime = audio.value.currentTime;
            if (currentTime !== undefined) {
                const minutes = Math.floor(currentTime / 60);
                const seconds = Math.floor(currentTime - minutes * 60);
                isTrackTimeCurrent.value = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                const value = (100 / audio.value.duration) * currentTime;
                range.value = value;
                seeker.value = value;
            }
        }
    });
};

const loadmetadata = () => {
    audio.value?.addEventListener('loadeddata', function() {
        if (audio.value) {
            const duration = audio.value.duration;
            if (duration !== undefined) {
                const minutes = Math.floor(duration / 60);
                const seconds = Math.floor(duration % 60);
                isTrackTimeTotal.value = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        }
    });
};



onMounted(() => {
    if (audio.value){
        setTimeout(() => {
            timeupdate()
            loadmetadata()
        }, 300)
    }

    if(currentTrack.value){
        seeker.value.addEventListner('change', function(){
            const time = audio.value?.duration * (seeker.value.value / 100)
            audio.value?.currentTime = time
        })

        seeker.value.addEventListner('mousedown', function(){
            audio.value?.pause()
            isPlaying.value = false
        })

        seeker.value.addEventListner('mouseup', function(){
            audio.value?.play()
            isPlaying.value = true
        })

        seekerContainer.value.addEventListner('click', function(e){
            const clickPosition = (e.pageX - seekerContainer.value.offsetLeft) / seekerContainer.value.offsetWidth 
            const time = audio.value?.duration * clickPosition
            audio.value?.currentTime = time
            seeker.value.value = (time/audio.value.duration)*100
        })
    }

})

watch(audio.value, () => {
    timeupdate()
    loadmetadata()
})

watch(isTrackTimeCurrent.value, (time: TrackProperties | undefined) => {
    if (time && time.name === isTrackTimeTotal.value) {
        useSong.nextSong(currentTrack.value);
    }
});
</script>

<template>
    <div>

    </div>
</template>

<style scoped>

</style>