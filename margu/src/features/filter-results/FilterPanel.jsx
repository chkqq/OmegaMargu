import { h } from 'preact';
import { useState } from 'preact/hooks';
import { filterSignal, updateFilter } from '@/entities/speciality/model';
import styles from './FilterPanel.module.css';

const STUDY_MODES = ['Очная', 'Очно-заочная', 'Заочная'];
const DIRECTIONS = ['Информационные технологии', 'Педагогика', 'Искусственный интеллект', 'Беспилотные системы'];
const ADMISSION = ['Бюджет', 'Платно'];

/**
 * @param {{ onClose: () => void, embedded?: boolean }} props
 */
export function FilterPanel({ onClose, embedded = false }) {
  const filter = filterSignal.value;

  /**
   * @param {string} key
   * @param {string} val
   */
  const toggle = (key, val) => {
    const cur = filter[key] ?? [];
    const next = cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val];
    updateFilter({ [key]: next });
  };

  const reset = () => updateFilter({ studyMode: [], admission: [], directions: [] });

  const content = (
      <div class={`${styles.panel} ${embedded ? styles.embedded : ''}`}>
        {!embedded && <button class={styles.close} onClick={onClose} aria-label="Закрыть фильтр">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>}

        <FilterGroup title="ОСНОВАНИЯ ПОСТУПЛЕНИЯ" items={ADMISSION} selected={filter.admission ?? []}
          onToggle={v => toggle('admission', v)} />
        <FilterGroup title="ФОРМА ОБУЧЕНИЯ" items={STUDY_MODES} selected={filter.studyMode ?? []}
          onToggle={v => toggle('studyMode', v)} />
        <FilterGroup title="ОБРАЗОВАТЕЛЬНЫЕ НАПРАВЛЕНИЯ" items={DIRECTIONS} selected={filter.directions ?? []}
          onToggle={v => toggle('directions', v)} />

        {!embedded && <div class={styles.actions}>
          <button class={styles.resetBtn} onClick={reset}>Сбросить всё</button>
          <button class={styles.applyBtn} onClick={onClose}>Применить</button>
        </div>}
      </div>
  );

  if (embedded) return content;

  return (
    <div class={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      {content}
    </div>
  );
}

/**
 * @param {{ title: string, items: string[], selected: string[], onToggle: (v:string)=>void }} props
 */
function FilterGroup({ title, items, selected, onToggle }) {
  return (
    <div class={styles.group}>
      <p class={styles.groupTitle}>{title}</p>
      {items.map(item => (
        <label key={item} class={styles.checkItem}>
          <input
            type="checkbox"
            class={styles.checkbox}
            checked={selected.includes(item)}
            onChange={() => onToggle(item)}
          />
          <span class={styles.checkmark} />
          <span class={styles.checkLabel}>{item}</span>
        </label>
      ))}
    </div>
  );
}
