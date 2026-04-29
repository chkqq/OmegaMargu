import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './SpecialityCard.module.css';

/** @param {{ speciality: import('@/shared/api/calculator').Speciality }} props */
export function SpecialityCard({ speciality }) {
  const [expanded, setExpanded] = useState(false);
  const { title, tags, properties, allProperties, exams } = speciality;
  const code = tags.find(tag => /\d{2}\.\d{2}\.\d{2}/.test(tag.value))?.value ?? tags[0]?.value;
  const level = tags.find(tag => !/\d{2}\.\d{2}\.\d{2}/.test(tag.value) && tag.variant !== 'green')?.value ?? 'Бакалавриат';
  const mode = properties.studyMode || tags.find(tag => tag.variant === 'green')?.value;

  return (
    <article class={`${styles.card} ${expanded ? styles.expanded : ''}`}>
      <div class={styles.topline}>
        <span class={styles.code}>{code}</span>
        <div class={styles.tags}>
          {level && <span class={`${styles.tag} ${styles.tag_blue}`}>{level}</span>}
          {mode && <span class={`${styles.tag} ${styles.tag_green}`}>{mode}</span>}
        </div>
      </div>

      <h3 class={styles.title}>{title}</h3>

      <div class={styles.meta}>
        {properties.budgetPlaces && (
          <span class={styles.metaItem}>
            <span>Бюджетных мест</span>
            <strong>{properties.budgetPlaces}</strong>
          </span>
        )}
        {(speciality.offBudgetPlace || speciality.offBudgetPlaces || properties.paidPlaces || properties.offBudgetPlaces) && (
          <span class={styles.metaItem}>
            <span>Платных мест</span>
            <strong>{speciality.offBudgetPlace ?? speciality.offBudgetPlaces ?? properties.paidPlaces ?? properties.offBudgetPlaces}</strong>
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
