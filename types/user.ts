export type User = {
  id: string
  username: string
  email: string
  isAdmin: boolean
  updatedAt: string | null
  createdAt: string
}

export type ProfileStatistics = {
  movieCount: number
  timeSpentMin: number
}

export type AdminUserProfile = User & {
  totalReviews: number
  totalLocations: number
  totalGradeTypes: number
  totalPartners: number
  hasValidatedGradeTypes: boolean
}
