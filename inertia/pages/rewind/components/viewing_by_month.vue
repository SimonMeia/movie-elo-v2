<script setup lang="ts">
import { ViewingsByMonth } from '@/app/types'
import { VisAxis, VisGroupedBar, VisXYContainer } from '@unovis/vue'
import { computed } from 'vue'

const props = defineProps<{ data: ViewingsByMonth }>()

type DataRecord = { count: number; monthId: number }

// Tableau de référence pour tous les mois
const allMonths: DataRecord[] = Array.from({ length: 12 }, (_, i) => ({
  monthId: i + 1,
  count: 0,
}))

// Fusionner les données avec les mois manquants
const data = computed(() => {
  return allMonths.map((month) => {
    const match = props.data.find((d) => d.monthId === month.monthId)
    return { monthId: month.monthId, count: match ? match.numberOfMovies : 0 }
  })
})

const max = computed(() => Math.max(...data.value.map((d) => d.count), 0))

function getShortMonth(id: number) {
  const months = [
    'Jan',
    'Fév',
    'Mar',
    'Avr',
    'Mai',
    'Juin',
    'Jui',
    'Août',
    'Sept',
    'Oct',
    'Nov',
    'Déc',
  ]
  return months[id - 1] || ''
}

const x = (d: DataRecord) => d.monthId
const y = (d: DataRecord) => d.count
</script>

<template>
  <div class="h-full py-8">
    <VisXYContainer :data="data" class="h-full">
      <VisGroupedBar :x="x" :y="y" orientation="horizontal" />
      <VisAxis type="y" :tickFormat="getShortMonth" :gridLine="false" :domainLine="false" />
      <VisAxis type="x" :numTicks="max / 2" :domainLine="false" />
    </VisXYContainer>
  </div>
</template>
