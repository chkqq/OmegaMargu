import { h } from 'preact';
import styles from './Footer.module.css';
import MarsuLogo from  '../../assets/marsu.svg'
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
    ],
  },
  {
    items: [
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
                <span class={styles.socialIcon}>{s.icon.toUpperCase().slice(0, 2)}</span>
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
