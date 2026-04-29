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
import calcBanner from '@/assets/design/calc-banner.png';
import calcBannerMobile from '@/assets/design/calc-banner-mobile.png';

/** Calculator ЕГЭ CTA banner */
function CalcBanner() {
  return (
    <a href="/calculator" class={styles.calcBanner} aria-label="Открыть калькулятор ЕГЭ">
      <picture>
        <source media="(max-width: 767px)" srcSet={calcBannerMobile} />
        <img src={calcBanner} alt="" class={styles.calcBannerImg} />
      </picture>
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
