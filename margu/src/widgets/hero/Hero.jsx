import { h } from 'preact';
import { useState } from 'preact/hooks';
import { ImagePlaceholder } from '@/shared/ui/ImagePlaceholder';
import styles from './Hero.module.css';

const SLIDES = [
  {
    title: 'ПОСТУПАЙ В МАРГУ',
    subtitle: 'Поступление без паники: понятные шаги, честные условия, реальный результат',
    btnLabel: 'Выбрать направление',
    btnHref: '#directions',
  },
  {
    title: 'ТВОЙ СТАРТ В ПРОФЕССИЮ',
    subtitle: '200+ программ обучения, стажировки с первых курсов, карьерный центр',
    btnLabel: 'Открыть калькулятор ЕГЭ',
    btnHref: '/calculator',
  },
  {
    title: 'НАУКА И ИННОВАЦИИ',
    subtitle: 'Исследовательские лаборатории, гранты, публикации — уже на первом курсе',
    btnLabel: 'Узнать больше',
    btnHref: '/about',
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];

  return (
    <section class={styles.hero}>
      {/* Background image placeholder */}
      <div class={styles.bg}>
        <ImagePlaceholder label="Фото главного баннера" aspectRatio="unset" className={styles.bgImg} />
      </div>

      <div class={styles.content}>
        <div class={styles.card}>
          <p class={styles.subtitle}>{slide.subtitle}</p>
          <h1 class={styles.title}>{slide.title}</h1>
          <a href={slide.btnHref} class={styles.btn}>
            {slide.btnLabel}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Slide controls */}
      <div class={styles.controls}>
        <button class={styles.arrow} onClick={() => setCurrent((current - 1 + SLIDES.length) % SLIDES.length)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 5l-5 5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class={styles.arrow} onClick={() => setCurrent((current + 1) % SLIDES.length)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 5l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class={styles.dots}>
        {SLIDES.map((_, i) => (
          <button key={i} class={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)} />
        ))}
      </div>
    </section>
  );
}
