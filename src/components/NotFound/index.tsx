import React, { useEffect } from 'react'
import SmartLink from '../SmartLink'
import NavBar from '../NavBar'
import Footer from '../Footer'
import * as styles from './index.module.css'

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    throw Error('Fake error for testing Sentry')
  }, [])

  return (
    <>
      <NavBar />
      <header className={styles.header}>
        <h1>Page not found</h1>
        <p className={styles.header__text}>
          The page you&apos;re looking doesn&apos;t exist or another error
          occured. Please check your internet connection or{' '}
          <SmartLink href="/">go back to home</SmartLink>.
        </p>
      </header>
      <Footer />
    </>
  )
}

export default NotFoundPage