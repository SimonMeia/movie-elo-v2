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
import Message from 'primevue/message'
import ConfirmPopup from 'primevue/confirmpopup'
import { useConfirm } from 'primevue/useconfirm'

const props = defineProps<GradeTypesResponse>()

const isDialogVisible = ref(false)
const confirm = useConfirm()

const confirmDeletion = (event: any, id: number) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Êtes-vous sûr de vouloir supprimer la catégorie ?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Annuler',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: { label: 'Supprimer' },
    accept: () => {
      router.delete('/grade-types/' + id)
    },
  })
}

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

const options = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
]

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
          <InputText class="w-full" v-model="newGradeCategory.name" placeholder="Ex. Histoire" />
          <small v-if="props.errors?.name" class="text-red-500">
            {{ props.errors?.name[0] }}
          </small>
        </div>
        <div class="flex flex-col gap-1">
          <label>Note maximale</label>
          <SelectButton
            v-model="newGradeCategory.maxGrade"
            :options="options"
            optionLabel="label"
            optionValue="value"
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
          <label>Description des notes</label>
          <small
            v-if="
              Object.keys(props.errors || {})
                .filter((key) => key.startsWith('grades.') && key.endsWith('.description'))
                .shift()
            "
            class="text-red-500"
          >
            {{
              Object.keys(props.errors || {})
                .filter((key) => key.startsWith('grades.') && key.endsWith('.description'))
                .map((key) => (props.errors ? props.errors[key][0] : ''))
                .shift()
            }}
          </small>
          <div class="flex flex-col gap-2">
            <div v-for="i in newGradeCategory.maxGrade" :key="i" class="grid grid-cols-12 gap-4">
              <div class="flex items-center w-full col-span-1">
                <label class="w-full font-bold text-center">{{ i }}</label>
              </div>
              <InputText
                class="w-full col-span-11"
                placeholder="Ex. Mauvais, bien ou excellent"
                v-model="newGradeCategory.grades[i - 1].description"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-4 mt-6">
        <Button label="Annuler" severity="secondary" @click="isDialogVisible = false" />
        <Button label="Créer" type="submit" />
      </div>
    </form>
  </Dialog>
  <Layout>
    <div class="container">
      <h1 class="my-8">Une dernière étape...</h1>
      <p>
        Pour terminer la création de votre compte, vous devez créer votre système de notation de
        films.
      </p>

      <Message severity="warn" class="my-4">
        <b>Attention : </b>Une fois le système créé, il ne sera plus possible de le modifier
      </Message>

      <ConfirmPopup></ConfirmPopup>

      <DataTable :value="props.gradeTypes">
        <template #empty>
          <div class="text-center py-4 space-y-4">
            <p>Définissez les éléments des films que vous souhaitez noter.</p>
            <p>
              Par exemple, vous pourriez avoir envie de noter l'<b>histoire</b>, l'<b>acting</b>
              ainsi que la <b>musique</b>.
            </p>
            <Button label="Créer une catégorie" @click="openModal" />
          </div>
        </template>
        <Column field="name" header="Nom de la catégorie"></Column>
        <Column field="maxGrade">
          <template #header>
            <div class="flex items-center justify-between w-full h-full gap-4">
              <div class="font-bold">Note maximale</div>
              <Button label="+" rounded class="w-10 h-10 text-xl" @click="openModal" />
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-between w-full h-full gap-4">
              <div>{{ slotProps.data.maxGrade }}</div>
              <Button
                icon="pi pi-trash"
                @click="confirmDeletion($event, slotProps.data.id)"
                severity="danger"
                :pt="{ root: 'aspect-square !w-8' }"
              />
            </div>
          </template>
        </Column>
      </DataTable>
      <Button
        label="Valider"
        class="my-2"
        @click="router.post('/grade-types/validate')"
        :disabled="!props.gradeTypes.length"
      />
    </div>
  </Layout>
</template>

<style scoped></style>
