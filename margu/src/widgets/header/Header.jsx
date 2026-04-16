import { h } from 'preact';
import { useState } from 'preact/hooks';
import { themeSignal, toggleTheme } from '@/shared/lib/theme';
import { isAuthSignal } from '@/entities/auth/model';
import { AuthModal } from '@/features/auth/AuthModal';
import styles from './Header.module.css';
import MarsuLogo from '../../assets/marsu.svg'
const NAV_LINKS = [
  {
    label: 'Уровень образования',
    href: '#',
    dropdown: [
      { label: 'Бакалавриат/специалитет', href: '#' },
      { label: 'Магистратура', href: '#' },
      { label: 'Аспирантура/ординатура', href: '#' },
      { label: 'СПО', href: '#' },
    ],
  },
  { label: 'Программы обучения', href: '#' },
  { label: 'Калькулятор ЕГЭ', href: '/calculator' },
  { label: 'Навигатор поступления', href: '#' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const theme = themeSignal.value;
  const isAuth = isAuthSignal.value;
  const isCalc = typeof window !== 'undefined' && window.location.pathname === '/calculator';

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

        <nav class={styles.desktopNav}>
          {NAV_LINKS.map((link) => (
            <div key={link.label} class={styles.navItem}
              onMouseEnter={() => link.dropdown && setDropdownOpen(link.label)}
              onMouseLeave={() => setDropdownOpen(null)}>
              <a href={link.href}
                class={`${styles.navLink} ${(isCalc && link.href === '/calculator') ? styles.navLinkActive : ''}`}>
                {link.label}
                {link.dropdown && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4 }}>
                    <path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                )}
              </a>
              {link.dropdown && dropdownOpen === link.label && (
                <div class={styles.dropdown}>
                  {link.dropdown.map(item => (
                    <a key={item.label} href={item.href} class={styles.dropdownItem}>{item.label}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div class={styles.actions}>
          <button class={styles.themeBtn} onClick={toggleTheme} aria-label="Сменить тему">
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="4" stroke="currentColor" stroke-width="1.5"/>
                <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.2 3.2l1.4 1.4M13.4 13.4l1.4 1.4M3.2 14.8l1.4-1.4M13.4 4.6l1.4-1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15 9.5A6.5 6.5 0 0 1 8.5 3c0-.3 0-.6.04-.9A7 7 0 1 0 15.9 9.46 6.6 6.6 0 0 1 15 9.5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            )}
          </button>

          {isAuth ? (
            <a href="/profile" class={styles.profileBtn}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.4"/>
                <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              </svg>
              Кабинет
            </a>
          ) : (
            <button class={styles.loginBtn} onClick={() => setAuthOpen(true)}>Войти</button>
          )}

          <a href="#contact" class={styles.ctaBtn}>Оставить заявку</a>
          <button class={styles.burger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M6 6l10 10M16 6L6 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 6h14M4 11h14M4 16h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div class={styles.mobileMenu}>
          {NAV_LINKS.map(link => (
            <div key={link.label}>
              <a href={link.href} class={styles.mobileLink} onClick={() => setMenuOpen(false)}>{link.label}</a>
              {link.dropdown && link.dropdown.map(item => (
                <a key={item.label} href={item.href} class={styles.mobileSubLink} onClick={() => setMenuOpen(false)}>{item.label}</a>
              ))}
            </div>
          ))}
          <div class={styles.mobileActions}>
            <a href="#contact" class={styles.ctaBtn} onClick={() => setMenuOpen(false)}>Оставить заявку</a>
            {isAuth ? (
              <a href="/profile" class={styles.themeBtnMobile} onClick={() => setMenuOpen(false)}>👤 Личный кабинет</a>
            ) : (
              <button class={styles.themeBtnMobile} onClick={() => { setMenuOpen(false); setAuthOpen(true); }}>🔑 Войти / Регистрация</button>
            )}
            <button class={styles.themeBtnMobile} onClick={toggleTheme}>
              {theme === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема'}
            </button>
          </div>
          <div class={styles.mobileSocials}>
            {['ВК','RT','ОК','TG','★','🛡'].map(s => (
              <a key={s} href="#" class={styles.mobileSocial}>{s}</a>
            ))}
          </div>
        </div>
      )}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </header>
  );
}
