
<script setup lang="ts">
import { toRefs } from 'vue';
import { RouterLink } from 'vue-router';
import { CardProperties } from '@/@types/homeCard.d.ts'

const props = defineProps<CardProperties>()

const { image, title, subTitle } = toRefs(props)

</script>

<template>
   <RouterLink to="library">
    <div class="bg-[#111111] p-4 rounded-md m-2 hover:bg-[#252525] cursor-pointer">
        <img class="rounded-md" :src="image" alt="Capa">
        <div class="text-white pt-4 font-semibold text-[17px]">{{ title }}</div>
        <div class="text-gray-400 pt-1 pb-3 text-[14px]">{{ subTitle }}</div>
    </div>
   </RouterLink>
</template>

<style scoped>

</style>