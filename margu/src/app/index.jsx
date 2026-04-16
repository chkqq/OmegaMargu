import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import Router from 'preact-router';
import { Header } from '@/widgets/header/Header';
import { Footer } from '@/widgets/footer/Footer';
import { HomePage } from '@/pages/home/HomePage';
import { CalculatorPage } from '@/pages/calculator/CalculatorPage';
import { AboutPage } from '@/pages/about/AboutPage';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { AuthModal } from '@/features/auth/AuthModal';
import { isAuthSignal } from '@/entities/auth/model';
import '@/shared/ui/globals.css';

function NotFound() {
  return (
    <main style={{ padding: '80px 20px', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '64px', marginBottom: '16px' }}>404</h1>
      <p style={{ color: 'var(--clr-text-secondary)', marginBottom: '24px' }}>Страница не найдена</p>
      <a href="/" style={{ color: 'var(--clr-accent)', fontWeight: 700 }}>← На главную</a>
    </main>
  );
}

function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const isAuth = isAuthSignal.value;

  return (
    <div>
      <Header onAuthClick={() => setAuthOpen(true)} isAuth={isAuth} />
      <Router>
        <HomePage path="/" />
        <CalculatorPage path="/calculator" />
        <AboutPage path="/about" />
        <ProfilePage path="/profile" />
        <NotFound default />
      </Router>
      <Footer />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </div>
  );
}

render(<App />, document.getElementById('app'));
