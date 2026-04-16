import { h } from 'preact';
import { MOCK_PARTNERS } from '@/shared/api/mockHome';
import styles from './Partners.module.css';

export function Partners() {
  return (
    <section class={styles.section}>
      <h2 class={styles.heading}>Наши выпускники уже здесь</h2>
      <p class={styles.sub}>
        Мы не обещаем «офер по щелчку пальцев», но строим программы так, чтобы у тебя
        был реальный путь в серьёзную компанию: проекты, стажировки, карьерный центр
      </p>
      <div class={styles.logos}>
        {MOCK_PARTNERS.map(p => (
          <div key={p.title} class={styles.logo}>
            {p.image
              ? <img src={p.image} alt={p.title} class={styles.logoImg} />
              : <span class={styles.logoText}>{p.title}</span>
            }
          </div>
        ))}
      </div>
    </section>
  );
}
