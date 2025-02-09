<script setup lang="ts">
import { FormGradeType } from '@/app/types'
import { ref } from 'vue'
import { MultiSelect } from 'primevue'

const currentFilm = ref({
  title: 'Inception',
  actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
  genres: 'Sci-Fi, Thriller, Action',
  year: 2010,
  poster: 'https://image.tmdb.org/t/p/original/aej3LRUga5rhgkmRP6XMFw3ejbl.jpg',
  categories: [
    { label: 'Réalisation', options: [1, 2, 3], selected: 1 },
    { label: 'Musique', options: [1, 2, 3, 4], selected: 3 },
    { label: 'Envie de le revoir', options: [1, 2], selected: 2 },
  ],
})

const partners = ['Tom', 'Emma', 'Brad', 'Meryl', 'Morgan', 'Keira']
const selectedPartners = ref([partners[0], partners[1]])
const locations = ['Cinéma', 'A la maison', 'Chez Tom', 'Dans le train']
const selectedLocations = ref([locations[0]])

const dbGradeTypes: FormGradeType[] = [
  {
    id: 1,
    name: 'Histoire',
    maxGrade: 10,
    grades: [
      {
        id: 1,
        grade: 4,
        description: 'Histoire légendaire',
        movie: 'Le Seigneur des anneaux : Le retour du roi',
      },
      { id: 2, grade: 3, description: 'Très bonne histoire', movie: 'Spider-Man : New Generation' },
      { id: 3, grade: 2, description: 'Pas mal...', movie: 'American Psycho' },
      { id: 4, grade: 1, description: 'Vraiment pas top', movie: 'Megalopolis' },
    ],
  },
  {
    id: 2,
    name: 'Acting',
    maxGrade: 10,
    grades: [
      { id: 1, grade: 2, description: 'Bluffant', movie: 'Forrest Gump' },
      { id: 2, grade: 1, description: 'Bien', movie: 'La Nuit au musée' },
      {
        id: 3,
        grade: 1,
        description: 'Sans plus',
        movie: 'Indiana Jones et le Cadran de la destinée',
      },
    ],
  },
  {
    id: 3,
    name: 'Note personnelle',
    maxGrade: 10,
    grades: [
      { id: 1, grade: 3, description: 'Génial, à revoir absolument', movie: 'La La Land' },
      { id: 2, grade: 2, description: 'Pas mal, sans plus', movie: 'Top Gun : Maverick' },
    ],
  },
]
</script>

<template>
  <div class="grid gap-8 lg:gap-24 lg:grid-cols-2 items-center lg:pt-24" id="main-features">
    <div class="flex flex-col gap-4 lg:order-last">
      <h2 class="text-3xl font-titles">Qui a dit que 5 étoiles suffisaient ?</h2>
      <p>
        Plus besoin de vous limiter aux classement sur 5 étoiles. Avec Movie Elo, inventez votre
        propre système de notation et classez vos films selon vos propres critères.
      </p>
      <ul class="list-disc list-inside">
        <li>Définissez les aspects des films que vous souhaitez noter</li>
        <li>Choisissez une note maximale pour chaque catégorie</li>
        <li>Décrivez chaque notes associer des émotions aux chiffres</li>
      </ul>
    </div>

    <div
      class="flex flex-col w-full p-6 border shadow-lg border-accent rounded-xl gap-4 category-rating"
    >
      <div v-for="(category, index) in currentFilm.categories" :key="index">
        <label class="block mb-1 text-lg font-titles" :for="'category-' + index">
          {{ category.label }}
        </label>
        <SelectButton
          :pt="{ root: '!flex !w-full !h-10' }"
          :options="category.options.map((option) => ({ label: option.toString(), value: option }))"
          optionLabel="label"
          optionValue="value"
          :model-value="category.selected"
        />
      </div>
    </div>
  </div>

  <div class="grid gap-8 lg:gap-24 lg:grid-cols-2 items-center">
    <div class="flex flex-col gap-4">
      <h2 class="text-3xl font-titles">Avec qui je l’avait vu ce film déjà ?</h2>
      <p>
        Regarder un film est souvent un moment de partage, alors gardez un trace des différents
        partenaires et lieux où vous avez regardez des films.
      </p>
      <ul class="list-disc list-inside">
        <li>Sauvegardez la date, le lieux et les personnes avec qui vous avez vu un film</li>
        <li>
          Vous avez revu un films ? Ajoutez un nouveau visionnage avec d’autres personnes et un
          autre lieu
        </li>
      </ul>
    </div>

    <div class="flex flex-col w-full p-6 border shadow-lg border-accent rounded-xl gap-6">
      <div>
        <label class="block mb-1 text-lg font-titles">Partenaire</label>
        <MultiSelect
          v-model="selectedPartners"
          display="chip"
          :options="partners"
          placeholder="Choisissez des partenaires"
          class="!w-full"
          :maxSelectedLabels="2"
        />
      </div>

      <div>
        <label class="block mb-1 text-lg font-titles">Lieu</label>
        <MultiSelect
          v-model="selectedLocations"
          display="chip"
          :options="locations"
          placeholder="Choisissez un lieu"
          class="!w-full"
          :maxSelectedLabels="1"
        />
      </div>
    </div>
  </div>

  <div class="grid gap-8 lg:gap-24 lg:grid-cols-2 items-center lg:h-[500px]">
    <div class="flex flex-col gap-4 lg:order-last">
      <h2 class="text-3xl font-titles">Comparaison avec vos films déjà notés</h2>
      <p>
        Difficile de noter un film sans avoir de références? Movie Elo vous permet de comparer vos
        films déjà classé avec celui que vous ajoutez.
      </p>
      <ul class="list-disc list-inside">
        <li>Un film par catégorie et par note</li>
        <li>Comparison simplifée sans avoir a aller dans le tableau</li>
      </ul>
    </div>

    <div class="border shadow-lg border-accent rounded-xl p-6">
      <Accordion :value="1">
        <AccordionPanel v-for="gradeType in dbGradeTypes" :key="gradeType.id" :value="gradeType.id">
          <AccordionHeader>{{ gradeType.name }}</AccordionHeader>
          <AccordionContent>
            <div class="grid grid-cols-1 gap-2">
              <div v-for="grade in gradeType.grades" :key="grade.id">
                <h4 class="text-accent">{{ grade.grade }} - {{ grade.description }}</h4>
                <p>{{ grade.movie }}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </div>
</template>

<style scoped></style>
