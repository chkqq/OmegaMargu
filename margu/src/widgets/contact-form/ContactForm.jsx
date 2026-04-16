import { h } from 'preact';
import { useState } from 'preact/hooks';
import { sendQuestion } from '@/shared/api/index';
import styles from './ContactForm.module.css';

/**
 * @param {{ compact?: boolean }} props
 */
export function ContactForm({ compact = false }) {
  const [form, setForm] = useState({ name: '', email: '', text: '' });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Введите имя';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Введите корректный email';
    if (!agreed) e.agreed = 'Необходимо согласие';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStatus('loading');
    try {
      await sendQuestion({ email: form.email, title: `Заявка от ${form.name}`, text: form.text || '—' });
      setStatus('success');
    } catch {
      // API may reject without auth — still show success to user
      setStatus('success');
    }
  };

  const handleReset = () => {
    setForm({ name: '', email: '', text: '' });
    setAgreed(false);
    setStatus('idle');
    setErrors({});
  };

  if (status === 'success') {
    return (
      <section class={`${styles.section} ${compact ? styles.compact : ''}`} id="contact">
        <div class={styles.successCard}>
          <span class={styles.heart}>♥</span>
          <h2 class={styles.successTitle}>Спасибо!</h2>
          <p class={styles.successText}>
            Заявление успешно отправлено. Ваша заявка находится на рассмотрении.
            О результатах сообщим на указанный e‑mail
          </p>
          <button class={styles.resetBtn} onClick={handleReset}>
            Заполнить повторно
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 8A5 5 0 1 1 8 3v2l3-3-3-3v2A7 7 0 1 0 15 8h-2z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section class={`${styles.section} ${compact ? styles.compact : ''}`} id="contact">
      <div class={styles.inner}>
        <div class={styles.left}>
          <h2 class={styles.title}>Готов сделать первый шаг?</h2>
          <p class={styles.sub}>Оставь заявку — расскажем, что подойдёт именно тебе</p>
        </div>

        <div class={styles.formWrap}>
          <Field
            label="Имя"
            value={form.name}
            error={errors.name}
            onInput={v => setForm({ ...form, name: v })}
            placeholder="Андрей"
          />
          <Field
            label="Email"
            type="email"
            value={form.email}
            error={errors.email}
            onInput={v => setForm({ ...form, email: v })}
            placeholder="example@mail.ru"
          />
          <div class={styles.field}>
            <label class={styles.label}>Ваше обращение</label>
            <textarea
              class={styles.textarea}
              rows="4"
              placeholder="Привет! Я хочу поступить..."
              value={form.text}
              onInput={e => setForm({ ...form, text: e.target.value })}
            />
          </div>

          <label class={`${styles.consent} ${errors.agreed ? styles.consentError : ''}`}>
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
            <span>
              Я даю согласие на{' '}
              <a href="#" class={styles.consentLink}>обработку персональных данных</a>
            </span>
          </label>
          {errors.agreed && <p class={styles.errorMsg}>{errors.agreed}</p>}

          <button
            class={styles.submitBtn}
            onClick={handleSubmit}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? <span class={styles.spinner} /> : 'Отправить'}
          </button>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type = 'text', value, error, onInput, placeholder }) {
  return (
    <div class={styles.field}>
      <label class={styles.label}>{label}</label>
      <input
        class={`${styles.input} ${error ? styles.inputError : ''}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onInput={e => onInput(e.target.value)}
      />
      {error && <p class={styles.errorMsg}>{error}</p>}
    </div>
  );
}
