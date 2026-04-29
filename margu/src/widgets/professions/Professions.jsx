import { h } from 'preact';
import { MOCK_PROFESSIONS } from '@/shared/api/mockHome';
import styles from './Professions.module.css';

export function Professions() {
  const visible = MOCK_PROFESSIONS.slice(0, 15);
  const extra = 199;
  const HelpCard = ({ className = '' }) => (
    <a href="#" class={`${styles.helpBtn} ${className}`}>
      <span>Не знаешь, кем хочешь стать?<br/>Поможем с выбором профессии</span>
      <span class={styles.helpCta}>Помогите выбрать</span>
    </a>
  );

  return (
    <section class={styles.section}>
      <div class={styles.header}>
        <div>
          <h2 class={styles.title}>Кем ты хочешь стать?</h2>
          <p class={styles.subtitle}>Никаких загадочных шифров. Сначала — понятная профессия, потом — программа, которая к ней ведёт</p>
        </div>
        <HelpCard className={styles.helpDesktop} />
      </div>

      <div class={styles.tags}>
        {visible.map(p => (
          <button key={p} class={styles.tag}>{p}</button>
        ))}
        <button class={`${styles.tag} ${styles.tagMore}`}>+{extra}</button>
      </div>
      <HelpCard className={styles.helpMobile} />
    </section>
  );
}
