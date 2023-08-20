import styles from './Spinner.module.scss'

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <span className={styles.visuallyHidden}>Loading...</span>
    </div>
  )
}

export default Spinner
