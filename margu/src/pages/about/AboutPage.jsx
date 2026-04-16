import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { ImagePlaceholder } from '@/shared/ui/ImagePlaceholder';
import { fetchPages } from '@/shared/api/index';
import { MOCK_ABOUT_PAGE, MOCK_STATS } from '@/shared/api/mockHome';
import styles from './AboutPage.module.css';

export function AboutPage() {
  const [page, setPage] = useState(MOCK_ABOUT_PAGE);

  useEffect(() => {
    fetchPages()
      .then(pages => { const found = pages.find(p => p.title === 'О нас' || p.title === 'Об университете'); if (found) setPage(found); })
      .catch(() => {});
  }, []);

  return (
    <main class={styles.main}>
      <div class={styles.container}>
        <h1 class={styles.title}>Об университете</h1>

        {/* Hero image */}
        <ImagePlaceholder label="Главное фото университета" aspectRatio="21/9" className={styles.heroImg} />

        {/* Stats */}
        <div class={styles.stats}>
          {MOCK_STATS.map(s => (
            <div key={s.infoId} class={styles.stat}>
              <span class={styles.statNum}>{s.info}</span>
              <span class={styles.statLabel}>{s.description}</span>
            </div>
          ))}
        </div>

        {/* Text content */}
        <div class={styles.content}>
          <div class={styles.textBlock}>
            <h2>Марийский государственный университет</h2>
            <p>МарГУ — ведущий университет Республики Марий Эл, основанный в 1972 году. За более чем 50 лет работы университет подготовил свыше 90 000 специалистов в самых разных отраслях.</p>

            <ImagePlaceholder label="Фото кампуса" aspectRatio="16/9" className={styles.inlineImg} />

            <h2>Наша миссия</h2>
            <p>Создавать среду, в которой каждый студент может раскрыть свой потенциал, получить востребованную профессию и найти путь к успешной карьере.</p>

            <div class={styles.twoCol}>
              <ImagePlaceholder label="Фото аудитории" aspectRatio="4/3" />
              <ImagePlaceholder label="Фото библиотеки" aspectRatio="4/3" />
            </div>

            <h2>Факультеты и институты</h2>
            <p>Университет включает 15 факультетов и институтов, охватывающих направления от IT и естественных наук до педагогики, юриспруденции и медицины.</p>

            <ImagePlaceholder label="Фото факультетов" aspectRatio="16/9" className={styles.inlineImg} />
          </div>
        </div>
      </div>
    </main>
  );
}
