<script setup lang="ts"></script>

<template>
  <div class="grid grid-cols-3 gap-8">
    <div
      v-for="i in 6"
      :key="i"
      class="flex flex-col gap-4 border border-accent rounded-xl p-6 shadow-lg w-full"
    >
      <div class="border-2 border-gray-300 rounded-md p-2 w-fit bg-gray-100 shadow-md">
        <svg
          class="text-accent"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path
            d="M223.77,58a16,16,0,0,0-16.25.53L128,109.14V71.84A15.91,15.91,0,0,0,103.52,58.5L15.33,114.66a15.8,15.8,0,0,0,0,26.68l88.19,56.16A15.91,15.91,0,0,0,128,184.16v-37.3l79.52,50.64A15.91,15.91,0,0,0,232,184.16V71.84A15.83,15.83,0,0,0,223.77,58ZM112,183.93,24.18,128,112,72.06Zm104,0L128.18,128,216,72.06Z"
          ></path>
        </svg>
      </div>
      <h3 class="text-xl font-titles">Rewind</h3>
      <p>
        Obtenez une vue d'ensemble des films que vous avez regardez et des critiques de vos amis
      </p>
    </div>
  </div>
</template>

<style scoped></style>
