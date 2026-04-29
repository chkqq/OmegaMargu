import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { fetchEducationDirections } from '@/shared/api/index';
import { MOCK_EDU_DIRECTIONS } from '@/shared/api/mockHome';
import styles from './EduDirections.module.css';

export function EduDirections() {
  const [tab, setTab] = useState('directions');
  const [directions, setDirections] = useState(MOCK_EDU_DIRECTIONS);
  const scrollerRef = useRef(null);

  useEffect(() => {
    let active = true;

    fetchEducationDirections(8)
      .then(data => {
        if (active && data.length) setDirections(data);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const handleWheel = event => {
    const scroller = scrollerRef.current;
    if (!scroller || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    if (maxScroll <= 0) return;

    const nextScroll = Math.max(0, Math.min(maxScroll, scroller.scrollLeft + event.deltaY));
    if (nextScroll !== scroller.scrollLeft) {
      event.preventDefault();
      scroller.scrollLeft = nextScroll;
    }
  };

  return (
    <section class={styles.section} id="directions">
      <div class={styles.header}>
        <h2 class={styles.heading}>Образовательные направления</h2>
        <div class={styles.tabs}>
          <button class={`${styles.tab} ${tab === 'faculties' ? styles.tabActive : ''}`}
            onClick={() => setTab('faculties')}>Факультеты</button>
          <button class={`${styles.tab} ${tab === 'directions' ? styles.tabActive : ''}`}
            onClick={() => setTab('directions')}>Направления</button>
        </div>
      </div>
      <p class={styles.sub}>Получите востребованную профессию: направления бакалавриата/специалитета под запросы рынка труда</p>

      <div class={styles.grid} ref={scrollerRef} onWheel={handleWheel}>
        {directions.map(dir => (
          <a key={dir.id} href="#" class={styles.card}>
            <div class={styles.cardIcon}>{dir.icon}</div>
            <h3 class={styles.cardTitle}>{dir.title}</h3>
            <div class={styles.professions}>
              {dir.professions.map(p => <span key={p} class={styles.profession}>{p}</span>)}
            </div>
            <span class={styles.count}>{dir.count ? `${dir.count} специальностей` : 'Смотреть программы'}</span>
            <svg class={styles.arrow} width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M5 13L13 5M13 5H7M13 5v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}
