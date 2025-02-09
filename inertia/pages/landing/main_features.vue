<script setup lang="ts">
import { FormGradeType } from '@/app/types'

const dbGradeTypes: FormGradeType[] = [
  {
    id: 1,
    name: 'Acteurs',
    maxGrade: 10,
    grades: [
      { id: 1, grade: 1, description: 'Le meilleur acteur', movie: 'Le meilleur acteur' },
      { id: 2, grade: 2, description: 'Le meilleur acteur', movie: 'Le meilleur acteur' },
      { id: 3, grade: 3, description: 'Le meilleur acteur', movie: 'Le meilleur acteur' },
      { id: 4, grade: 4, description: 'Le meilleur acteur', movie: 'Le meilleur acteur' },
    ],
  },
  {
    id: 2,
    name: 'Acteurs',
    maxGrade: 10,
    grades: [
      { id: 1, grade: 1, description: 'Le meilleur acteur', movie: 'Le meilleur acteur' },
      { id: 2, grade: 2, description: 'Le meilleur acteur', movie: 'Le meilleur acteur' },
    ],
  },
  {
    id: 2,
    name: 'Acteurs',
    maxGrade: 10,
    grades: [
      { id: 1, grade: 1, description: 'Le meilleur acteur', movie: 'Le meilleur acteur' },
      { id: 2, grade: 2, description: 'Le meilleur acteur', movie: 'Le meilleur acteur' },
      { id: 3, grade: 3, description: 'Le meilleur acteur', movie: 'Le meilleur acteur' },
    ],
  },
]
</script>

<template>
  <div class="grid items-center gap-4 lg:grid-cols-2" id="main-features">
    <div class="flex flex-col gap-4">
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

    <div>
      <Accordion>
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

  <div class="grid gap-4 lg:grid-cols-2">
    <div></div>
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

    <div></div>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div class="flex flex-col gap-4">
      <h2 class="text-3xl font-titles">Comparaison avec vos films déjà notés</h2>
      <p>
        Difficile de noter un film sans avoir de références ? Movie Elo vous permet de comparer vos
        films déjà classé avec celui que vous ajoutez.
      </p>
      <ul class="list-disc list-inside">
        <li>Un film par catégorie et par note</li>
        <li>Comparison simplifée sans avoir a aller dans le tableau</li>
      </ul>
    </div>

    <div></div>
  </div>
</template>

<style scoped></style>
