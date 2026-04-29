import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { ScoreForm } from '@/widgets/score-form/ScoreForm';
import { ResultsList } from '@/widgets/results-list/ResultsList';
import { fetchCalculatorSubjects } from '@/shared/api/index';
import { setSubjects } from '@/entities/subject/model';
import styles from './CalculatorPage.module.css';

export function CalculatorPage() {
  useEffect(() => {
    let active = true;

    fetchCalculatorSubjects()
      .then(subjects => {
        if (active) setSubjects(subjects);
      })
      .catch(error => {
        console.warn('Не удалось загрузить предметы калькулятора:', error);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main class={styles.main}>
      <div class={styles.container}>
        <div class={styles.hero}>
          <h1 class={styles.title}>Калькулятор ЕГЭ</h1>
          <p class={styles.subtitle}>
            Введите реальные или предполагаемые результаты экзаменов —
            получите список подходящих программ и оцените шансы на поступление
          </p>
        </div>

        <ScoreForm />
        <ResultsList />
      </div>
    </main>
  );
}
