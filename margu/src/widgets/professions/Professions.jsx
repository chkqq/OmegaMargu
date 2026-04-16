import { h } from 'preact';
import { MOCK_PROFESSIONS } from '@/shared/api/mockHome';
import styles from './Professions.module.css';

export function Professions() {
  const visible = MOCK_PROFESSIONS.slice(0, 14);
  const extra = 199;

  return (
    <section class={styles.section}>
      <div class={styles.header}>
        <div>
          <h2 class={styles.title}>Кем ты хочешь стать?</h2>
          <p class={styles.subtitle}>Никаких загадочных шифров. Сначала — понятная профессия, потом — программа, которая к ней ведёт</p>
        </div>
        <a href="#" class={styles.helpBtn}>
          <span>Не знаешь, кем хочешь стать?<br/>Поможем с выбором профессии</span>
          <span class={styles.helpCta}>Помогите выбрать →</span>
        </a>
      </div>

      <div class={styles.tags}>
        {visible.map(p => (
          <button key={p} class={styles.tag}>{p}</button>
        ))}
        <button class={`${styles.tag} ${styles.tagMore}`}>+{extra}</button>
      </div>
    </section>
  );
}
