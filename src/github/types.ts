export type RepositoryResultItem = {
  id: number
  name: string
  full_name: string
  contributors_url: string
}

export type RepositorySearchResponse = {
  total_count: number
  incomplete_results: boolean
  items: RepositoryResultItem[]
}

export type ContributorsItem = {
  login: string
  id: number
  contributions: number
}
