import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './Header.module.css';

import MarsuLogo from  '../../assets/marsu.svg'
const NAV_LINKS = [
  { label: 'Уровень образования', href: '#' },
  { label: 'Программы обучения', href: '#' },
  { label: 'Калькулятор ЕГЭ', href: '/calculator', active: true },
  { label: 'Навигатор поступления', href: '#' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header class={styles.header}>
      <div class={styles.inner}>
        <a href="/" class={styles.logo}>
          <div class={styles.logoIcon}>
            <img src={MarsuLogo} alt="МарГУ" width={44} height={44} />
          </div>
          <div class={styles.logoText}>
            <span class={styles.logoName}>Марийский</span>
            <span class={styles.logoSub}>государственный университет</span>
          </div>
        </a>

        <nav class={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              class={`${styles.navLink} ${link.active ? styles.navLinkActive : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#" class={styles.ctaBtn}>Оставить заявку</a>
        </nav>

        <button
          class={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <span class={`${styles.burgerLine} ${menuOpen ? styles.burgerOpen : ''}`} />
          <span class={`${styles.burgerLine} ${menuOpen ? styles.burgerOpen : ''}`} />
          <span class={`${styles.burgerLine} ${menuOpen ? styles.burgerOpen : ''}`} />
        </button>
      </div>
    </header>
  );
}
