<script setup lang="ts">
import Layout from '@/layouts/default.vue'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import { GradeTypesResponse } from '@/app/types'
import { Ref, ref } from 'vue'
import { router } from '@inertiajs/vue3'

const props = defineProps<GradeTypesResponse>()

const isDialogVisible = ref(false)

let newGradeCategory: Ref<GradeCategoryModal> = initNewGradeCategory()

function submitNewGradeCategory() {
  router.visit(`/grade-types`, {
    method: 'post',
    data: newGradeCategory.value,
    preserveState: true,
    preserveScroll: true,
    onSuccess: () => {
      isDialogVisible.value = false
    },
  })
}

type GradeCategoryModal = {
  name: string
  maxGrade: number
  grades: { description: string; value: number }[]
}

function openModal() {
  isDialogVisible.value = true
  newGradeCategory = initNewGradeCategory()
}

function initNewGradeCategory(): Ref<GradeCategoryModal> {
  return ref({
    name: '',
    maxGrade: 2,
    grades: [
      {
        description: '',
        value: 1,
      },
      {
        description: '',
        value: 2,
      },
    ],
  })
}

function updateGradeInputList() {
  if (newGradeCategory.value.grades.length < newGradeCategory.value.maxGrade) {
    for (let i = newGradeCategory.value.grades.length; i < newGradeCategory.value.maxGrade; i++) {
      newGradeCategory.value.grades.push({
        description: '',
        value: newGradeCategory.value.grades.length + 1,
      })
    }
  } else {
    newGradeCategory.value.grades = newGradeCategory.value.grades.slice(
      0,
      newGradeCategory.value.maxGrade
    )
  }
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
          <InputText class="w-full" v-model="newGradeCategory.name" />
          <small v-if="props.errors?.name" class="text-red-500">
            {{ props.errors?.name[0] }}
          </small>
        </div>
        <div class="flex flex-col gap-1">
          <label>Note maximale</label>
          <SelectButton
            v-model="newGradeCategory.maxGrade"
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
            @update:modelValue="updateGradeInputList"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label>Description</label>
          <small v-if="props.errors?.['grades.*.description']" class="text-red-500">
            {{ props.errors?.['grades.*.description'][0] }}
          </small>
          <div class="flex flex-col gap-2">
            <div v-for="i in newGradeCategory.maxGrade" :key="i" class="grid grid-cols-12 gap-4">
              <div class="flex items-center w-full col-span-1">
                <label class="w-full font-bold text-center">{{ i }}</label>
              </div>
              <InputText
                class="w-full col-span-11"
                placeholder="Description"
                v-model="newGradeCategory.grades[i - 1].description"
              />
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
        <Button label="Créer" class="p-button-text" type="submit" />
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
              <Button label="+" rounded class="w-10 h-10 text-xl" @click="openModal" />
            </div>
          </template>
        </Column>
      </DataTable>
      <Button label="Valider" class="my-2" @click="router.get('/')" />
    </div>
  </Layout>
</template>

<style scoped></style>
