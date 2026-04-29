import { h } from 'preact';
import styles from './Footer.module.css';
import MarsuLogo from  '../../assets/marsu.svg'

const SOCIAL_ICONS = {
  vk: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm2.98 13.5h-1.5c-.57 0-.74-.45-1.76-1.49-.88-.87-1.28-.86-1.5-.86-.24 0-.31.07-.31.42v1.36c0 .3-.1.48-.9.48-1.32 0-2.78-.8-3.81-2.3-1.55-2.18-1.97-3.8-1.97-4.14 0-.21.07-.41.42-.41h1.5c.31 0 .43.15.55.49.61 1.77 1.63 3.32 2.05 3.32.16 0 .23-.07.23-.48V9.87c-.06-.9-.52-.97-.52-1.29 0-.18.14-.36.38-.36h2.36c.27 0 .36.14.36.48v2.6c0 .26.12.35.2.35.16 0 .29-.09.59-.4.9-1.01 1.54-2.58 1.54-2.58.09-.19.24-.37.55-.37h1.5c.46 0 .56.23.46.49-.19.88-.2.87-1.45 2.62-.23.34-.31.48 0 .86.22.27.93.91 1.4 1.46.86.97.64 1.72.64 1.72z"/>
    </svg>
  ),
  rt: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 7.5c0 .828-.448 1.5-1 1.5h-1v1h1c.552 0 1 .672 1 1.5S16.052 15 15.5 15H9v-2h5.5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5H13c-1.105 0-2-.895-2-2s.895-2 2-2h2.5c.552 0 1 .672 1 1.5zM9 9h2v6H9V9z"/>
    </svg>
  ),
  ok: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 4a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm3.5 7.5c-.5.5-1.2.8-2 1l1.8 1.8c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0L12 15.8l-1.9 1.9c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.8-1.8c-.8-.2-1.5-.5-2-1-.5-.5-.5-1.2 0-1.7.5-.5 1.2-.5 1.7 0 .5.5 1.1.7 1.8.7s1.3-.2 1.8-.7c.5-.5 1.2-.5 1.7 0 .4.5.4 1.2-.1 1.7z"/>
    </svg>
  ),
  tg: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.92c-.12.56-.46.7-.93.44l-2.57-1.9-1.24 1.2c-.14.14-.26.26-.52.26l.18-2.6 4.73-4.27c.2-.18-.04-.28-.32-.1L7.56 14.5l-2.51-.79c-.54-.17-.55-.54.12-.8l9.81-3.78c.45-.16.85.11.66.67z"/>
    </svg>
  ),
  dz: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 10.5a3.5 3.5 0 01-3.5 3.5V14a1.5 1.5 0 000-3V9a3.5 3.5 0 013.5 3.5zM12 9v2a1.5 1.5 0 010 3v2a3.5 3.5 0 010-7z"/>
    </svg>
  ),
  vv: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm-3.57 13.5L7 12l4.5-3.5v7zm5 0L12 12l4.5-3.5v7z"/>
    </svg>
  ),
};

const SOCIAL_LINKS = [
  { label: 'ВКонтакте', href: '#', icon: 'vk' },
  { label: 'Rutube', href: '#', icon: 'rt' },
  { label: 'Одноклассники', href: '#', icon: 'ok' },
  { label: 'Telegram', href: '#', icon: 'tg' },
  { label: 'Яндекс Дзен', href: '#', icon: 'dz' },
  { label: 'ВКонтакте видео', href: '#', icon: 'vv' },
];

const NAV_COLS = [
  {
    items: [
      'Об университете',
      'Бакалавриат/специалитет',
      'Магистратура',
      'Аспирантура/ординатура',
      'СПО',
      'Программы обучения',
      'Калькулятор ЕГЭ',
      'Навигатор поступления',
    ],
  },
];

export function Footer() {
  return (
    <footer class={styles.footer}>
      <div class={styles.inner}>
        <div class={styles.brand}>
          <div class={styles.logoWrap}>
            <img src={MarsuLogo} alt="МарГУ" width={44} height={44} />
            <div>
              <p class={styles.uniName}>Марийский</p>
              <p class={styles.uniName}>государственный</p>
              <p class={styles.uniName}>университет</p>
            </div>
          </div>
          <div class={styles.socials}>
            {SOCIAL_LINKS.map(s => (
              <a key={s.label} href={s.href} class={styles.social} aria-label={s.label}>
                <span class={styles.socialIcon}>{SOCIAL_ICONS[s.icon]}</span>
              </a>
            ))}
          </div>
        </div>

        <nav class={styles.nav}>
          {NAV_COLS.map((col, i) => (
            <ul key={i} class={styles.navCol}>
              {col.items.map(item => (
                <li key={item}>
                  <a href="#" class={styles.navLink}>{item}</a>
                </li>
              ))}
            </ul>
          ))}
        </nav>

        <div class={styles.contacts}>
          <p class={styles.contactsTitle}>ПРИЕМНАЯ КОМИССИЯ</p>
          <p class={styles.contactsAddr}>424000, г. Йошкар-Ола, пл. Ленина, 1</p>
          <div class={styles.contactRow}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4.5C2 3.7 2.7 3 3.5 3h1.2l1.5 3.5L4.8 8s1 2 3.2 3.2l1.5-1.4L13 11.3v1.2c0 .8-.7 1.5-1.5 1.5C5.5 14 2 8.5 2 4.5z" stroke="rgba(255,255,255,0.5)" stroke-width="1.2"/>
            </svg>
            <a href="tel:+78362641541" class={styles.contactLink}>+7 (836) 264-15-41</a>
            <a href="tel:688088" class={styles.contactLink}>688-088</a>
          </div>
          <div class={styles.contactRow}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.5)" stroke-width="1.2"/>
              <path d="M8 5v3.5l2 1" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
            <div class={styles.hours}>
              <span>пн–пт: 08:00 — 17:00</span>
              <span>сб: 09:00 — 13:00</span>
              <span>обед: 12:00 — 13:00</span>
            </div>
          </div>
        </div>
      </div>

      <div class={styles.copy}>
        <p>© 1972–2026 ФГБОУ ВО «Марийский государственный университет»</p>
      </div>
    </footer>
  );
}
