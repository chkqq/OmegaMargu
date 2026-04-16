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

/** Calculator ЕГЭ CTA banner */
function CalcBanner() {
  return (
    <div class={styles.calcBanner}>
      <div class={styles.calcBannerText}>
        <h2>Калькулятор ЕГЭ</h2>
        <p>Узнай свои шансы по ЕГЭ за 30 секунд</p>
      </div>
      <a href="/calculator" class={styles.calcBannerBtn}>Открыть калькулятор →</a>
    </div>
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
