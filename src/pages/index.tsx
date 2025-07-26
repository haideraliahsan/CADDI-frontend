import React from 'react';
import Link from 'next/link';
import ROUTES from '@/route/routes';
import styles from './index.module.css';

const HomePage = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>
        Welcome to <span className={styles.highlight}>CADDi Demo</span>
      </h1>

      <p className={styles.paragraph}>
        Upload and annotate images to simulate efficient communication between engineers and factory teams.
      </p>

      <Link href={ROUTES.ANNOTATE} className={styles.ctaButton}>
        Go to Annotation Page →
      </Link>
    </main>
  );
};

export default HomePage;
