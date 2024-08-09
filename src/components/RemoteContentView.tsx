import styles from './RemoteContentView.module.scss'
import Spinner from '@/components/Spinner'

interface RemoteContentViewProps {
  error: any
  isLoading: boolean
  children: React.ReactNode
}

const RemoteContentView: React.FunctionComponent<RemoteContentViewProps> = ({
  error,
  isLoading,
  children,
}) => {
  if (error) {
    return <main className={styles.placeholder}>Failed to fetch from API</main>
  }

  if (isLoading) {
    return (
      <main className={styles.placeholder}>
        <Spinner />
      </main>
    )
  }

  return children
}

export default RemoteContentView
