import { h } from 'preact';
import styles from './EducationLevels.module.css';

const LEVELS = [
  {
    key: 'bachelor',
    title: 'Бакалавриат/специалитет',
    desc: 'Старт для тех, кто поступает после школы или колледжа',
    features: ['4 года, фундамент + практика', 'Поможем определиться с направлением', 'Первые стажировки уже с 2–3 курса'],
    href: '#',
    color: '#e8f0ff',
    darkColor: '#1a2550',
  },
  {
    key: 'master',
    title: 'Магистратура',
    desc: 'Для тех, кто хочет усилить себя в профессии или сменить фокус',
    features: ['Углубление в выбранную область', 'Совместные проекты с бизнесом', 'Возможность учиться и работать'],
    href: '#',
    color: '#eefaf3',
    darkColor: '#14281e',
  },
  {
    key: 'postgrad',
    title: 'Аспирантура/ординатура',
    desc: 'Для тех, кто хочет исследовать, преподавать и продвигать науку',
    features: ['Научные проекты', 'Публикации, конференции', 'Путь к академической карьере'],
    href: '#',
    color: '#fef3e8',
    darkColor: '#28200e',
  },
  {
    key: 'spo',
    title: 'СПО',
    desc: 'Старт карьеры без долгого ожидания — после 9-го или 11-го класса',
    features: ['2–4 года: от базовых навыков до мастерства', 'Практика с первого курса', 'Помощь с выбором профессии'],
    href: '#',
    color: '#f3e8ff',
    darkColor: '#1e1428',
  },
];

const DISPLAY_LEVELS = ['spo', 'bachelor', 'master', 'postgrad']
  .map(key => LEVELS.find(level => level.key === key))
  .filter(Boolean);

export function EducationLevels() {
  return (
    <section class={styles.section}>
      <div class={styles.intro}>
        <h2 class={styles.heading}>Маршрут в профессию</h2>
        <p class={styles.sub}>Школа заканчивается, а дальше — не страшно. Поступай на тот уровень, который подходит тебе сейчас. Продолжить всегда можно.</p>
      </div>

      <div class={styles.grid}>
        {DISPLAY_LEVELS.map(level => (
          <div key={level.key} class={styles.card}
            style={{ '--card-color': level.color, '--card-dark': level.darkColor }}>
            <h3 class={styles.cardTitle}>{level.title}</h3>
            <p class={styles.cardDesc}>{level.desc}</p>
            <ul class={styles.features}>
              {level.features.map(f => (
                <li key={f} class={styles.feature}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l3.5 3.5L12 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <a href={level.href} class={styles.cardBtn}>Посмотреть программы</a>
          </div>
        ))}
      </div>
    </section>
  );
}
