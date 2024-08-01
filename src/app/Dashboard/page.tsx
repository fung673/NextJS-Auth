import styles from "../page.module.css";
import Link from 'next/link'

export default function Dashboard() {
  return (
    <main className={styles.main}>
      <div>
        <div className={styles.title}>
          DashBoard
        </div>
        <Link href="/">
          Home
        </Link>
      </div>
    </main>
  );
}
