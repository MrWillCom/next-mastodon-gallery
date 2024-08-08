import config from '@/../config'
import { Status } from '@/types/mastodon'

async function getStatus(id: string) {
  const response = await fetch(config.getStatusQuery(id))

  if (!response.ok) {
    throw new Error('Failed to fetch from API')
  }

  return (await response.json()) as Status
}

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const status = await getStatus(id)

  return <>{JSON.stringify(status)}</>
}
