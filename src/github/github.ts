import axios from 'axios'
import { ContributorsItem, RepositorySearchResponse } from './types'

/**
 * This is a really simple cut down implementation of the github api
 */
export class Github {
  private readonly config = {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  }

  constructor() {
    if (!process.env.GITHUB_TOKEN) {
      console.warn(
        'You should set a personal github token so you will not be rate limited'
      )
    } else {
      this.config.headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
    }
  }

  /**
   * Get a list of repositories.
   * @param language
   * @param projectCount
   */
  async getRepositories(
    language: string,
    projectCount: number
  ): Promise<RepositorySearchResponse> {
    if (projectCount > 100) {
      throw new Error('Only a project count of 100 is supported at this time.')
    }
    const url = `https://api.github.com/search/repositories?l=${language}&q=stars:>1&s=stars&type=Repositories&per_page=${projectCount}`
    const { data } = await axios.get(url, this.config)

    return data
  }

  /**
   * Given a contributors url get a list of contributors to a repository
   * @param contributorsUrl
   */
  async getContributors(contributorsUrl: string): Promise<ContributorsItem[]> {
    const { data } = await axios.get(contributorsUrl, this.config)

    return data
  }
}
