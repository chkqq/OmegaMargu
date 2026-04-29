import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { fetchEvents, fetchInfoStats } from '@/shared/api/index';
import { MOCK_STATS } from '@/shared/api/mockHome';
import styles from './StatsCampus.module.css';
import campusGirls from '@/assets/design/campus-girls.png';

const CAMPUS_CARDS = [
  { key: 'events', title: 'Мероприятия и развлечения', desc: 'Студенческие вечеринки, творческие конкурсы, спортивные состязания — выбирай и участвуй!', btn: 'Посмотреть мероприятия', counter: '1/4' },
  { key: 'glossary', title: 'Словарь абитуриента', desc: 'Расшифровываем непонятные термины про поступление', btn: null },
  { key: 'campus', title: 'Университетский кампус', desc: 'Кампус на ладони: где что находится — простым языком', btn: null },
  { key: 'video', title: 'Видео об университете', desc: 'Учёба, наука, досуг: открой университет по‑новому в видео', btn: null },
];

export function StatsCampus() {
  const [stats, setStats] = useState(MOCK_STATS);
  const [featuredEvent, setFeaturedEvent] = useState(null);

  useEffect(() => {
    fetchInfoStats().then(setStats).catch(() => {/* use mock */});
    fetchEvents()
      .then(data => {
        const firstFacultyEvent = data.faculties?.flatMap(faculty => faculty.events ?? [])?.[0];
        setFeaturedEvent(data.university?.[0] ?? firstFacultyEvent ?? null);
      })
      .catch(() => {});
  }, []);

  const eventCard = featuredEvent
    ? {
        title: featuredEvent.title,
        desc: featuredEvent.text || CAMPUS_CARDS[0].desc,
        btn: 'Посмотреть мероприятие',
        url: featuredEvent.url || '#',
        image: featuredEvent.images?.[0],
        counter: CAMPUS_CARDS[0].counter,
      }
    : { ...CAMPUS_CARDS[0], url: '#', image: null };

  return (
    <section class={styles.section}>
      <h2 class={styles.heading}>Твой университет — твои возможности</h2>

      <div class={styles.statsRow}>
        {stats.map(s => (
          <div key={s.infoId} class={styles.statItem}>
            <span class={styles.statNum}>{s.info}</span>
            <span class={styles.statLabel}>{s.description}</span>
          </div>
        ))}
      </div>

      <div class={styles.campusGrid}>
        <a href={eventCard.url} class={styles.eventsCard} aria-label={eventCard.title}>
          <img src={campusGirls} alt="" class={styles.eventsImg} />
          <span class={styles.eventsPanel}>
            <span class={styles.eventsTop}>
              <span class={styles.eventsTitle}>{CAMPUS_CARDS[0].title}</span>
              <span class={styles.eventsCounter}>{eventCard.counter}</span>
            </span>
            <span class={styles.eventsDesc}>{CAMPUS_CARDS[0].desc}</span>
            <span class={styles.eventsButton}>
              {CAMPUS_CARDS[0].btn}
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 11h14M13 6l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </span>
        </a>

        {/* Small info cards */}
        <div class={styles.infoCards}>
          {CAMPUS_CARDS.slice(1).map(card => (
            <a key={card.key} href="#" class={styles.infoCard}>
              <div>
                <h4 class={styles.infoCardTitle}>{card.title}</h4>
                <p class={styles.infoCardDesc}>{card.desc}</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class={styles.arrow}>
                <path d="M5 15L15 5M15 5H7M15 5v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
