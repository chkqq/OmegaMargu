import { h } from 'preact';
import styles from './Partners.module.css';
import partnersStrip from '@/assets/design/partners-strip.png';
import partnersMobile from '@/assets/design/partners-mobile.png';

export function Partners() {
  return (
    <section class={styles.section}>
      <h2 class={styles.heading}>Наши выпускники уже здесь</h2>
      <p class={styles.sub}>
        Мы не обещаем «офер по щелчку пальцев», но строим программы так, чтобы у тебя
        был реальный путь в серьёзную компанию: проекты, стажировки, карьерный центр
      </p>
      <picture class={styles.logosPicture}>
        <source media="(max-width: 767px)" srcSet={partnersMobile} />
        <img src={partnersStrip} alt="Партнеры МарГУ" class={styles.logosImg} />
      </picture>
    </section>
  );
}
