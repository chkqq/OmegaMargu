import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { fetchSpecialityCards } from '@/shared/api/index';
import { MOCK_PROFESSIONS } from '@/shared/api/mockHome';
import styles from './Professions.module.css';

function readableProfession(card) {
  const source = card.profile || card.title || '';
  return source
    .replace(/\b\d{2}\.\d{2}\.\d{2}\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function Professions() {
  const [professions, setProfessions] = useState(MOCK_PROFESSIONS);

  useEffect(() => {
    let active = true;

    fetchSpecialityCards()
      .then(cards => {
        const seen = new Set();
        const next = cards
          .map(readableProfession)
          .filter(Boolean)
          .filter(item => {
            const key = item.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });

        if (active && next.length) setProfessions(next);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const visible = professions.slice(0, 15);
  const extra = Math.max(0, professions.length - visible.length);
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
        {extra > 0 && <button class={`${styles.tag} ${styles.tagMore}`}>+{extra}</button>}
      </div>
      <HelpCard className={styles.helpMobile} />
    </section>
  );
}
