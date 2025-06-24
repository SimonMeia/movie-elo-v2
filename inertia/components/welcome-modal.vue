<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const isDialogVisible = defineModel<boolean>('visible', {
  default: false,
})

const emit = defineEmits<{
  (event: 'close'): void
}>()
</script>

<template>
  <Dialog
    v-model:visible="isDialogVisible"
    modal
    :closable="false"
    :pt="{
      root: '!max-w-[95vw]',
      header: '!py-0',
      content: '!p-10',
    }"
    :ptOptions="{
      mergeProps: true,
    }"
    :draggable="false"
  >
    <div class="space-y-6 text-center">
      <h1 class="text-pretty">Bienvenue sur <span class="text-accent">Movie Elo</span></h1>

      <p>
        Pour terminer la création de votre compte, vous devez créer votre système de notation de
        films.
      </p>

      <Button label="Vers la page de création" @click="emit('close')" />
    </div>
  </Dialog>
</template>
