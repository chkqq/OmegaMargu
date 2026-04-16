import { h } from 'preact';
import { useState } from 'preact/hooks';
import { login, register } from '@/shared/api/index';
import { setToken } from '@/entities/auth/model';
import styles from './AuthModal.module.css';

/**
 * @param {{ onClose: () => void }} props
 */
export function AuthModal({ onClose }) {
  const [tab, setTab] = useState('login'); // login | register
  const [form, setForm] = useState({ username: '', password: '', full_name: '', email: '', place: '', education: '', new_password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const patch = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleLogin = async () => {
    if (!form.username || !form.password) { setError('Заполните все поля'); return; }
    setLoading(true); setError('');
    try {
      const data = await login({ username: form.username, password: form.password });
      setToken(data.token);
      onClose();
    } catch (e) {
      setError(e?.message ?? 'Неверный логин или пароль');
    } finally { setLoading(false); }
  };

  const handleRegister = async () => {
    if (!form.full_name || !form.email || !form.password) { setError('Заполните обязательные поля'); return; }
    setLoading(true); setError('');
    try {
      await register({ full_name: form.full_name, email: form.email, password: form.password, place: form.place, education: form.education });
      setSuccess('Регистрация прошла успешно! Проверьте почту.');
    } catch (e) {
      setError(e?.message ?? 'Ошибка регистрации');
    } finally { setLoading(false); }
  };

  return (
    <div class={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div class={styles.modal}>
        <button class={styles.close} onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <div class={styles.tabs}>
          <button class={`${styles.tab} ${tab === 'login' ? styles.tabActive : ''}`} onClick={() => { setTab('login'); setError(''); setSuccess(''); }}>Войти</button>
          <button class={`${styles.tab} ${tab === 'register' ? styles.tabActive : ''}`} onClick={() => { setTab('register'); setError(''); setSuccess(''); }}>Регистрация</button>
        </div>

        {error && <p class={styles.error}>{error}</p>}
        {success && <p class={styles.successMsg}>{success}</p>}

        {tab === 'login' ? (
          <div class={styles.form}>
            <AuthField label="Email / Логин" value={form.username} onInput={v => patch('username', v)} placeholder="email@mail.ru" />
            <AuthField label="Пароль" type="password" value={form.password} onInput={v => patch('password', v)} placeholder="••••••••" />
            <button class={styles.submitBtn} onClick={handleLogin} disabled={loading}>
              {loading ? <span class={styles.spinner} /> : 'Войти'}
            </button>
          </div>
        ) : (
          <div class={styles.form}>
            <AuthField label="ФИО *" value={form.full_name} onInput={v => patch('full_name', v)} placeholder="Иванов Иван Иванович" />
            <AuthField label="Email *" type="email" value={form.email} onInput={v => patch('email', v)} placeholder="email@mail.ru" />
            <AuthField label="Пароль *" type="password" value={form.password} onInput={v => patch('password', v)} placeholder="••••••••" />
            <AuthField label="Место проживания" value={form.place} onInput={v => patch('place', v)} placeholder="г. Йошкар-Ола" />
            <AuthField label="Учебное заведение" value={form.education} onInput={v => patch('education', v)} placeholder="Школа №1" />
            <button class={styles.submitBtn} onClick={handleRegister} disabled={loading}>
              {loading ? <span class={styles.spinner} /> : 'Зарегистрироваться'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AuthField({ label, type = 'text', value, onInput, placeholder }) {
  return (
    <div class={styles.field}>
      <label class={styles.fieldLabel}>{label}</label>
      <input
        class={styles.fieldInput}
        type={type}
        value={value}
        placeholder={placeholder}
        onInput={e => onInput(e.target.value)}
      />
    </div>
  );
}
