import { h } from 'preact';
import { useSignal } from '@preact/signals';
import { subjectsSignal, scoresSignal, totalScoreSignal, extraPointsSignal, setScore, setExtraPoints, getPayload } from '@/entities/subject/model';
import { setResults, setError, setLoading } from '@/entities/speciality/model';
import { fetchCalculatorResults } from '@/shared/api/index';
import { SubjectInput } from '@/features/subject-input/SubjectInput';
import styles from './ScoreForm.module.css';

const EXTRA_POINTS_INFO = 'медаль +5 баллов\nГТО +5 баллов\nволонтерство +5 баллов';

export function ScoreForm() {
  const subjects = subjectsSignal.value;
  const scores = scoresSignal.value;
  const total = totalScoreSignal.value;
  const extra = extraPointsSignal.value;
  const showTooltip = useSignal(false);
  const loading = useSignal(false);

  const handleSubmit = async () => {
    loading.value = true;
    setLoading();
    const payload = getPayload();

    try {
      const data = await fetchCalculatorResults(payload);
      setResults(data.specialities ?? []);
    } catch (err) {
      setError(err?.message ?? 'Не удалось получить результаты калькулятора');
    } finally {
      loading.value = false;
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <section class={styles.section}>
      <div class={styles.grid}>
        {subjects.map(subject => (
          <SubjectInput
            key={subject.id}
            id={subject.id}
            label={subject.value}
            value={scores[subject.id] ?? null}
            minScore={subject.minScore}
          />
        ))}

        {/* Extra points */}
        <div class={`${styles.extraRow}`}>
          <span class={styles.extraLabel}>
            Доп. баллы
            <button
              class={styles.infoBtn}
              onClick={() => showTooltip.value = !showTooltip.value}
              aria-label="Информация о дополнительных баллах"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
                <path d="M8 7v5M8 5.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
            {showTooltip.value && (
              <div class={styles.tooltip}>
                {EXTRA_POINTS_INFO.split('\n').map(line => <p key={line}>{line}</p>)}
                <a href="#" class={styles.tooltipLink}>подробнее</a>
              </div>
            )}
          </span>
          <input
            class={styles.extraInput}
            type="number"
            min="0"
            max="15"
            placeholder="0"
            value={extra || ''}
            onInput={e => setExtraPoints(Math.min(15, parseInt(e.target.value) || 0))}
          />
        </div>
      </div>

      <div class={styles.footer}>
        <p class={styles.total}>
          Твой суммарный бал: <strong>{total}</strong>
        </p>
        <button
          class={styles.submitBtn}
          onClick={handleSubmit}
          disabled={loading.value || total === 0}
        >
          {loading.value ? (
            <span class={styles.spinner} />
          ) : (
            'Узнать мои шансы'
          )}
        </button>
      </div>
    </section>
  );
}
