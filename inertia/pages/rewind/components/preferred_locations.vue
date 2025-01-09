<script setup lang="ts">
import { PreferredLocations } from '@/app/types'
import { VisNestedDonut, VisSingleContainer, VisTooltip } from '@unovis/vue'
import { NestedDonut, NestedDonutSegmentLabelAlignment } from '@unovis/ts'

const props = defineProps<{ data: PreferredLocations }>()
const formatedData = props.data.flatMap((item) => Array(item.numberOfMovies).fill(item.name))

const segmentLabel = (d: any) => d.data.key
const triggers = {
  [NestedDonut.selectors.segment]: (d: any) =>
    `<span>${d.data.key} - ${d.data.values.length}</span>`,
}
const layers = [(d: string) => d]

const layerSettings = (i: number) =>
  i === 0 && {
    // width: 50,
    labelAlignment: NestedDonutSegmentLabelAlignment.Perpendicular,
  }
</script>

<template>
  <div class="h-full w-full flex items-center justify-center flex-col gap-12 text-center">
    <div>
      Vous avez regardé des films à
      <h2 class="text-accent text-2xl inline">{{ data.length }}</h2>
      endroits différents
    </div>
    <VisSingleContainer :data="formatedData">
      <VisNestedDonut
        :layers="layers"
        :segmentLabel="segmentLabel"
        :layerSettings="layerSettings"
      />
      <VisTooltip :triggers="triggers" />
    </VisSingleContainer>
    <div>
      <div class="">
        Mais votre endroit favoris est
        <h2 class="text-accent text-2xl inline">{{ data[0].name }}</h2>
      </div>
      <div class="">
        où vous avez regardé
        <h2 class="text-accent text-2xl inline">{{ data[0].numberOfMovies }}</h2>
        films
      </div>
    </div>
  </div>
</template>
