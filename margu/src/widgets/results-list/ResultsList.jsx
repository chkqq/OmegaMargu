import { h } from 'preact';
import { useState } from 'preact/hooks';
import { groupedSignal, statusSignal } from '@/entities/speciality/model';
import { FilterPanel } from '@/features/filter-results/FilterPanel';
import { SpecialityCard } from './SpecialityCard';
import styles from './ResultsList.module.css';

export function ResultsList() {
  const status = statusSignal.value;
  const groups = groupedSignal.value;
  const [filterOpen, setFilterOpen] = useState(false);

  if (status === 'idle') return null;

  return (
    <section id="results" class={styles.section}>
      <div class={styles.header}>
        <h2 class={styles.heading}>Результаты поиска</h2>
        {status === 'success' && (
          <button class={styles.filterBtn} onClick={() => setFilterOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4h14M5 9h8M8 14h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            Фильтр
          </button>
        )}
      </div>

      {status === 'loading' && (
        <div class={styles.loading}>
          <div class={styles.loadingDots}>
            <span /><span /><span />
          </div>
          <p>Подбираем программы...</p>
        </div>
      )}

      {status === 'empty' && <EmptyState />}
      {status === 'error' && <ErrorState />}

      {status === 'success' && (
        <div class={styles.groups}>
          {Object.entries(groups).map(([key, group]) => (
            <FacultyGroup key={key} name={group.name} items={group.items} />
          ))}
        </div>
      )}

      {status === 'success' && <NoMatchForm />}

      {filterOpen && <FilterPanel onClose={() => setFilterOpen(false)} />}
    </section>
  );
}

function FacultyGroup({ name, items }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div class={styles.group}>
      <button class={styles.groupHeader} onClick={() => setCollapsed(!collapsed)}>
        <span class={styles.groupName}>{name}</span>
        <div class={styles.groupMeta}>
          <span class={styles.groupCount}>{items.length}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </button>

      {!collapsed && (
        <div class={styles.cards}>
          {items.map(s => <SpecialityCard key={s.id} speciality={s} />)}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div class={styles.emptyState}>
      <div class={styles.emptyIcon}>📦</div>
      <p class={styles.emptyText}>
        Эх, сумма введённых баллов чуть ниже минимума Минобрнауки,
        и мы ничего не смогли найти для вас. Но это не конец пути!
      </p>
      <LeadForm title="Поможем с поступлением"
        subtitle="Получите персональный план поступления и бесплатную консультацию от приёмной комиссии" />
    </div>
  );
}

function ErrorState() {
  return (
    <div class={styles.emptyState}>
      <div class={styles.emptyIcon}>⚠️</div>
      <p class={styles.emptyText}>Произошла ошибка при загрузке. Попробуйте ещё раз.</p>
    </div>
  );
}

function NoMatchForm() {
  return (
    <div class={styles.noMatch}>
      <div class={styles.noMatchText}>
        <h3>Нет нужной программы?</h3>
        <p>Расскажем о каждом направлении и поможем определиться</p>
      </div>
      <LeadForm />
    </div>
  );
}

/** @param {{ title?: string, subtitle?: string }} props */
function LeadForm({ title, subtitle }) {
  const [sent, setSent] = useState(false);
  const [agreed, setAgreed] = useState(false);

  if (sent) return <p class={styles.sentMsg}>✓ Заявка отправлена! Мы свяжемся с вами.</p>;

  return (
    <div class={styles.leadForm}>
      {title && <h4 class={styles.leadTitle}>{title}</h4>}
      {subtitle && <p class={styles.leadSubtitle}>{subtitle}</p>}
      <input class={styles.leadInput} type="text" placeholder="Имя" />
      <input class={styles.leadInput} type="email" placeholder="Email" />
      {!title && <textarea class={styles.leadTextarea} placeholder="Ваше обращение" rows="3" />}
      <label class={styles.consentLabel}>
        <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
        <span>Я даю согласие на обработку персональных данных</span>
      </label>
      <button class={styles.leadBtn} disabled={!agreed} onClick={() => agreed && setSent(true)}>
        Отправить
      </button>
    </div>
  );
}
