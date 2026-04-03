import { h } from 'preact';
import { ScoreForm } from '@/widgets/score-form/ScoreForm';
import { ResultsList } from '@/widgets/results-list/ResultsList';
import styles from './CalculatorPage.module.css';

export function CalculatorPage() {
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
