export type Rewind = {
  year: number
  yearlyMovies: YearlyMovies
  timeSpent: TimeSpent
  averageRuntime: AverageRuntime
  preferredGenres: PreferredGenres
  preferredActors: PreferredActors
  preferredPartners: PreferredPartners
  preferredLocations: PreferredLocations
  longestShortestMovies: LongestShortesMovies
  averageGrades: AverageGrades
  viewingsByMonth: ViewingsByMonth
}

export type YearlyMovies = {
  value: number
  frequencyInDays: number
}

export type TimeSpent = {
  minutes: number
}

export type AverageRuntime = {
  minutes: number
}

export type PreferredGenres = {
  totalGenres: number
  topGenres: {
    name: string
    numberOfMovies: number
  }[]
}

export type PreferredActors = {
  name: string
  numberOfMovies: number
}[]

export type PreferredPartners = {
  name: string
  numberOfMovies: number
}[]

export type PreferredLocations = {
  name: string
  numberOfMovies: number
}[]

export type LongestShortesMovies = {
  longestName: string
  longestRuntimeMin: number
  shortestName: string
  shortestRuntimeMin: number
}

export type AverageGrades = {
  overallAverage: number
  maxOverallGrade: number
  gradeTypes: {
    name: string
    average: number
    maxGrade: number
  }[]
}

export type ViewingsByMonth = {
  monthId: number
  numberOfMovies: number
}[]
