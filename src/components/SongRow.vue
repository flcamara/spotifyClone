<script setup lang="ts">
import { onMounted, ref, toRef, toRefs } from 'vue'
import Play from 'vue-material-design-icons/Play.vue'
import Pause from 'vue-material-design-icons/Pause.vue'
import Heart from 'vue-material-design-icons/Heart.vue'
import { SongProperties } from '@/@types/songView'

const isHover = ref(false)
const isTrackTime = ref(null)
const props = defineProps<SongProperties>()

const { track, artist, index } = toRefs(props)

</script>

<template>
    <li class="flex items-center justify-between rounded-md hover:bg-[#2A2929]" @mouseenter="isHover = true" @mouseleave="isHover = false">
        <div class="flex items-center w-full py-1.5">
            <div class="w-[40px] ml-[14px] mr-[6px] cursor-pointer">
                <Play v-if="true" fillColor="#FFFFFF" :size="25" />
                <Play v-else fillColor="#FFFFFF" :size="25" />
            </div>
        </div>
    </li>
</template>

<style scoped>

</style>