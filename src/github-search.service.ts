import { Github, ContributorsItem, RepositoryResultItem } from './github'

export type SearchResult = {
  repositoryName: string
  topContributorName: string
  percentContributed: number
}

const github = new Github()

/**
 * Given a  language and a projectCount search for those projects for a bus factor of 1. Where the
 * bus factor of 1 is any project where 1 contributor contributed 75% or more of the contributions.
 * @param language
 * @param projectCount
 */
export async function search(language: string, projectCount: number) {
  const repositoryList = await github.getRepositories(language, projectCount)

  const repositoryPromises = repositoryList.items.map((repository) => {
    return handleRepository(repository)
  })

  return (await Promise.all(repositoryPromises)).filter(
    (result) => result !== undefined && result.percentContributed >= 0.75
  )
}

/**
 * Given a github repository, see what percent that top contributor has contributed.
 * @param repository
 */
export async function handleRepository(
  repository: RepositoryResultItem
): Promise<SearchResult | undefined> {
  let contributors: ContributorsItem[] | null
  try {
    contributors = await github.getContributors(repository.contributors_url)
  } catch (err) {
    // An error occurs while trying to query for contributors to large repositories
    // normally I'd log something like this but I'm just leaving it out of this project
  }

  if (contributors === undefined || contributors.length === 0) {
    return
  }

  let totalContributions = 0
  for (const contributor of contributors) {
    totalContributions += contributor.contributions
  }

  // The contributor list is sorted by contributions descending, so the first one is the top contributor
  const topContributor = contributors[0]
  const percentContributed = topContributor.contributions / totalContributions

  return {
    repositoryName: repository.name,
    topContributorName: topContributor.login,
    percentContributed,
  }
}
