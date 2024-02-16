export type Review = {
  tmdbMovieId: number
  grades: {
    story: number
    acting: number
    music: number
    directing: number
    feeling: number
    personal: number
  }
  locations: string[]
  partners: string[]
  date: Date
  comment: string | null
}
