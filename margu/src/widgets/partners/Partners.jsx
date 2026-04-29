import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { fetchPartners } from '@/shared/api/index';
import styles from './Partners.module.css';
import sponsor1 from '@/assets/design/sponsor-1.png';
import sponsor2 from '@/assets/design/sponsor-2.png';
import sponsor3 from '@/assets/design/sponsor-3.png';
import sponsor4 from '@/assets/design/sponsor-4.png';
import sponsor5 from '@/assets/design/sponsor-5.png';
import sponsor6 from '@/assets/design/sponsor-6.png';

const SPONSORS = [
  { src: sponsor1, alt: 'Сбербанк' },
  { src: sponsor2, alt: 'ГТРК Марий Эл' },
  { src: sponsor3, alt: 'Завод полупроводниковых приборов' },
  { src: sponsor4, alt: 'Открытие' },
  { src: sponsor5, alt: 'ВТБ' },
  { src: sponsor6, alt: 'Акашево' },
];

export function Partners() {
  const [sponsors, setSponsors] = useState(SPONSORS);

  useEffect(() => {
    let active = true;

    fetchPartners(6)
      .then(items => {
        const next = items.slice(0, 6).map((item, index) => ({
          src: item.image || SPONSORS[index % SPONSORS.length].src,
          alt: item.title || SPONSORS[index % SPONSORS.length].alt,
        }));

        if (active && next.length) setSponsors(next);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  return (
    <section class={styles.section}>
      <h2 class={styles.heading}>Наши выпускники уже здесь</h2>
      <p class={styles.sub}>
        Мы не обещаем «офер по щелчку пальцев», но строим программы так, чтобы у тебя
        был реальный путь в серьёзную компанию: проекты, стажировки, карьерный центр
      </p>
      <div class={styles.logosGrid}>
        {sponsors.map(sponsor => (
          <img key={sponsor.alt} src={sponsor.src} alt={sponsor.alt} class={styles.logoImg} />
        ))}
      </div>
    </section>
  );
}
