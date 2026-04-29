import { h } from 'preact';
import { Hero } from '@/widgets/hero/Hero';
import { Professions } from '@/widgets/professions/Professions';
import { EducationLevels } from '@/widgets/education-levels/EducationLevels';
import { EduDirections } from '@/widgets/edu-directions/EduDirections';
import { StatsCampus } from '@/widgets/stats-campus/StatsCampus';
import { StudentStories } from '@/widgets/student-stories/StudentStories';
import { Partners } from '@/widgets/partners/Partners';
import { ContactForm } from '@/widgets/contact-form/ContactForm';
import styles from './HomePage.module.css';
import calculatorBg from '@/assets/design/calculator-bg.png';

/** Calculator ЕГЭ CTA banner */
function CalcBanner() {
  return (
    <a href="/calculator" class={styles.calcBanner} aria-label="Открыть калькулятор ЕГЭ">
      <img src={calculatorBg} alt="" class={styles.calcBannerImg} />
      <span class={styles.calcPanel}>
        <span class={styles.calcTitle}>Калькулятор<br/>ЕГЭ</span>
        <span class={styles.calcText}>Узнай свои шансы<br/>по ЕГЭ за 30 секунд</span>
        <span class={styles.calcButton}>
          Открыть калькулятор
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4 11h14M13 6l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </span>
    </a>
  );
}

export function HomePage() {
  return (
    <main class={styles.main}>
      <div class={styles.container}>
        <Hero />
        <Professions />
        <EducationLevels />
        <CalcBanner />
        <EduDirections />
        <StatsCampus />
        <StudentStories />
        <Partners />
        <ContactForm />
      </div>
    </main>
  );
}
