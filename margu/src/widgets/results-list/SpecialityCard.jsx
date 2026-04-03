import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './SpecialityCard.module.css';

/** @param {{ speciality: import('@/shared/api/calculator').Speciality }} props */
export function SpecialityCard({ speciality }) {
  const [expanded, setExpanded] = useState(false);
  const { title, tags, properties, allProperties, exams } = speciality;

  return (
    <article class={`${styles.card} ${expanded ? styles.expanded : ''}`}>
      <div class={styles.tags}>
        {tags.map(tag => (
          <span key={tag.value} class={`${styles.tag} ${styles[`tag_${tag.variant}`]}`}>
            {tag.value}
          </span>
        ))}
      </div>

      <h3 class={styles.title}>{title}</h3>

      <div class={styles.meta}>
        <span class={styles.metaItem}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.3"/>
            <path d="M7 4v3.5l2 1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
          {properties.studyMode}
        </span>
        {properties.budgetPlaces && (
          <span class={styles.metaItem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L9 5l4.5.5-3.25 3.5.75 4.5L7 11.5 3 13.5l.75-4.5L.5 5.5 5 5 7 1z" stroke="currentColor" stroke-width="1.2"/>
            </svg>
            Бюджет: {properties.budgetPlaces} мест
          </span>
        )}
        {properties.passingScore && (
          <span class={styles.metaItem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 11L5 8l2.5 2.5L12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Проходной: {properties.passingScore}
          </span>
        )}
      </div>

      {expanded && (
        <div class={styles.details}>
          <p class={styles.exams}><strong>Экзамены:</strong> {exams}</p>
          {allProperties?.map(p => (
            <div key={p.title} class={styles.propRow}>
              <span class={styles.propKey}>{p.title}</span>
              <span class={styles.propVal}>{p.value}</span>
            </div>
          ))}
        </div>
      )}

      <button class={styles.toggle} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Скрыть' : 'Подробнее'}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </article>
  );
}
