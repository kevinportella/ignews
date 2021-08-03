import { SingInButton } from '../SingInButton'
import { ActiveLink } from '../ActiveLink'

import styles from './styles.module.scss'

export function Header () {

  return (
    <header className={styles.headerContainer}>

      <div className={styles.headerContent}>

        <img src="/images/logo.svg" alt="ig.news" />

        <nav>

          <ActiveLink
          activeClassName = {styles.active}
          href="/"
          >

            <a className={styles.active}>Home</a>

          </ActiveLink>

          <ActiveLink
          activeClassName = {styles.active}
          href="/posts"
          >

            <a>Posts</a>

          </ActiveLink>

        </nav>

        <SingInButton />

      </div>

    </header>
  )
}