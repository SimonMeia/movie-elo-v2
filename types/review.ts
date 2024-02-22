export type Review = {
  id: number
  grades: {
    story: number
    acting: number
    music: number
    directing: number
    feeling: number
    personal: number
  }
  viewings: Viewing[]
  comment: string | null
}

export type Viewing = {
  id: number
  date: string
  locations: Location[]
  partners: Partner[]
}

export type Location = {
  id: number
  name: string
}

export type Partner = {
  id: number
  name: string
}
