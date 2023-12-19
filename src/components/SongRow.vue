<script setup lang="ts">
import { onMounted, ref, toRef, toRefs } from 'vue'
import Play from 'vue-material-design-icons/Play.vue'
import Pause from 'vue-material-design-icons/Pause.vue'
import Heart from 'vue-material-design-icons/Heart.vue'
import { SongRowProperties } from '@/@types/songView'

import { useSongStore } from '@/stores/song'
import { storeToRefs } from 'pinia'
const useSong = useSongStore()

const { isPlaying, currentTrack } = storeToRefs(useSong)

const isHover = ref(false)
const isTrackTime = ref<string>('')
const props = defineProps<SongRowProperties>()

const { track, artist, index } = toRefs(props)
const audio = ref<HTMLAudioElement | null>(null)

onMounted(() => {
  audio.value = new Audio(track.value?.path)
  audio.value.addEventListener('loadedmetadata', function () {
    if (audio.value) {
      const duration = audio.value.duration
      const minutes = Math.floor(duration / 60)
      const seconds = Math.floor(duration % 60)
      isTrackTime.value = minutes + ':' + seconds.toString().padStart(2, '0')
    }
  })
})
</script>

<template>
  <section v-if="track && artist">
    <li
      class="flex items-center justify-between rounded-md hover:bg-[#2A2929]"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
    >
      <div class="flex items-center w-full py-1.5">
        <div v-if="isHover" class="w-[40px] ml-[14px] mr-[6px] cursor-pointer">
          <Play v-if="!isPlaying" fillColor="#FFFFFF" :size="25" @click="useSong.playOrPauseThisSong(artist, track)" />
          <Play v-else-if="isPlaying && currentTrack.name !== track.name" fillColor="#FFFFFF" :size="25" @click="useSong.loadSong(artist, track)" />
          <Pause v-else fillColor="#FFFFFF" :size="25" @click="useSong.playOrPauseSong()" />
        </div>
        <div v-else class="text-white font-semibold w-[40px] ml-5">
          <span :class="{'text-green-500': currentTrack && currentTrack.name === track.name}">
            {{ index }}
          </span>
        </div>
        <div>
          <div 
            :class="{'text-green-500': currentTrack && currentTrack.name === track.name}"
            class="text-white font-semibold">
            {{ track.name }}
          </div>
          <div class="text-sm font-semibold text-gray-400">
            {{ artist.name }}
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <button type="button" v-if="isHover">
          <Heart fillColor="#1BD760" :size="22" />
        </button>
        <div v-if="isTrackTime" class="text-xs mx-5 text-gray-400">
          {{ isTrackTime }}
        </div>
      </div>
    </li>
  </section>
</template>

<style scoped></style>
