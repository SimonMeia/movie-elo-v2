<script setup lang="ts">
import Layout from '@/layouts/default.vue'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import { GradeTypesResponse } from '@/app/types'
import { ref } from 'vue'

const props = defineProps<GradeTypesResponse>()

const isDialogVisible = ref(false)

const modalGradeMax = ref(2)

function submitNewGradeCategory() {
  console.log('submit')
}
</script>

<template>
  <Dialog
    v-model:visible="isDialogVisible"
    modal
    :pt="{
      content: '!pb-6',
    }"
    :ptOptions="{
      mergeProps: true,
    }"
    :draggable="false"
  >
    <template #header>
      <h3>Créer une catégorie</h3>
    </template>
    <form @submit.prevent="submitNewGradeCategory">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-1">
          <label>Nom de la catégorie</label>
          <InputText class="w-full" />
        </div>
        <div class="flex flex-col gap-1">
          <label>Note maximale</label>
          <SelectButton
            v-model="modalGradeMax"
            :options="Array.from({ length: 9 }, (_, i) => i + 2)"
            :allowEmpty="false"
            :pt="{
              root: 'flex w-full h-10',
              button: {
                style: {
                  'justify-content': 'center',
                  'width': '100%',
                },
              },
            }"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label>Description</label>
          <div class="flex flex-col gap-2">
            <div v-for="i in modalGradeMax" :key="i" class="grid grid-cols-12 gap-4">
              <div class="flex items-center w-full col-span-1">
                <label class="w-full font-bold text-center">{{ i }}</label>
              </div>
              <InputText class="w-full col-span-11" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-4 mt-6">
        <Button
          label="Annuler"
          class="p-button-text"
          severity="contrast"
          @click="isDialogVisible = false"
        />
        <Button
          label="Créer"
          class="p-button-text"
          @click="isDialogVisible = false"
          type="submit"
        />
      </div>
    </form>
  </Dialog>
  <Layout>
    <div class="container">
      <h1 class="my-8">Une derniere étape...</h1>
      <p>
        Pour terminer la création de votre compte, vous devez choisir des catégorie pour vos notes.
      </p>

      <DataTable :value="props.gradeTypes">
        <Column field="name" header="Nom de la catégorie"></Column>
        <Column field="maxGrade">
          <template #header>
            <div class="flex items-center justify-between w-full h-full gap-4">
              <div class="font-bold">Note maximale</div>
              <Button label="+" rounded class="w-10 h-10 text-xl" @click="isDialogVisible = true">
              </Button>
            </div>
          </template>
        </Column>
      </DataTable>
      <Button label="Valider" class="my-2"></Button>
    </div>
  </Layout>
</template>

<style scoped></style>
