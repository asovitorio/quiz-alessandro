import styles from '@/styles/Loader.module.css'
export default function Loader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}></div>
    </div>
  )
}
