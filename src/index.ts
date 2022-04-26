import fixedWidthString from 'fixed-width-string'
import minimist from 'minimist'

import { search } from './github-search.service'

async function init(): Promise<void> {
  const args = minimist(process.argv.slice(2))
  const language = args['language']
  if (!language) {
    console.error('language is a required parameter')
    return
  }
  const projectCount = args['project_count']
  if (!projectCount) {
    console.error('project_count is a required parameter')
    return
  }

  const busfactorOfOneProjects = await search(language, projectCount)

  for (const project of busfactorOfOneProjects) {
    console.log(
      `project:${fixedWidthString(
        project.repositoryName,
        20
      )} user:${fixedWidthString(
        project.topContributorName,
        20
      )} percentage: ${project.percentContributed.toFixed(2)}`
    )
  }
}

init().catch(console.error)
