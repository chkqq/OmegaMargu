import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { setScore } from '@/entities/subject/model';
import styles from './SubjectInput.module.css';

/**
 * @param {{ id: number, label: string, value: number|null, minScore: number }} props
 */
export function SubjectInput({ id, label, value, minScore }) {
  const isSet = value !== null && value !== undefined && value !== '';
  const isInvalid = isSet && value < minScore;

  const handleChange = useCallback((e) => {
    const raw = e.target.value;
    if (raw === '') {
      setScore(id, null);
      return;
    }
    const num = Math.min(100, Math.max(0, parseInt(raw, 10) || 0));
    setScore(id, num);
  }, [id]);

  return (
    <div class={`${styles.row} ${isInvalid ? styles.invalid : ''} ${isSet && !isInvalid ? styles.active : ''}`}>
      <span class={styles.label}>{label}</span>
      <input
        class={styles.input}
        type="number"
        min="0"
        max="100"
        placeholder={`от ${minScore}`}
        value={value ?? ''}
        onInput={handleChange}
        aria-label={`Балл по предмету ${label}`}
      />
    </div>
  );
}
