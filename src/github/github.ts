import axios from 'axios'
import { ContributorsItem, RepositorySearchResponse } from './types'

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

  async getRepositories(
    language: string,
    projectCount: number
  ): Promise<RepositorySearchResponse> {
    const url = `https://api.github.com/search/repositories?l=${language}&q=stars:>1&s=stars&type=Repositories&per_page=${projectCount}`
    const { data } = await axios.get(url, this.config)

    return data
  }

  async getContributors(contributorsUrl: string): Promise<ContributorsItem[]> {
    const { data } = await axios.get(contributorsUrl, this.config)

    return data
  }
}
