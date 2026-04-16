import { h } from 'preact';
import { useState } from 'preact/hooks';
import { MOCK_EDU_DIRECTIONS } from '@/shared/api/mockHome';
import styles from './EduDirections.module.css';

export function EduDirections() {
  const [tab, setTab] = useState('directions');

  return (
    <section class={styles.section} id="directions">
      <div class={styles.header}>
        <h2 class={styles.heading}>Образовательные направления</h2>
        <div class={styles.tabs}>
          <button class={`${styles.tab} ${tab === 'faculties' ? styles.tabActive : ''}`}
            onClick={() => setTab('faculties')}>Факультеты</button>
          <button class={`${styles.tab} ${tab === 'directions' ? styles.tabActive : ''}`}
            onClick={() => setTab('directions')}>Направления</button>
        </div>
      </div>
      <p class={styles.sub}>Получите востребованную профессию: направления бакалавриата/специалитета под запросы рынка труда</p>

      <div class={styles.grid}>
        {MOCK_EDU_DIRECTIONS.map(dir => (
          <a key={dir.id} href="#" class={styles.card}>
            <div class={styles.cardIcon}>{dir.icon}</div>
            <h3 class={styles.cardTitle}>{dir.title}</h3>
            <div class={styles.professions}>
              {dir.professions.map(p => <span key={p} class={styles.profession}>{p}</span>)}
            </div>
            <span class={styles.count}>{dir.count} специальностей</span>
            <svg class={styles.arrow} width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M5 13L13 5M13 5H7M13 5v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}
