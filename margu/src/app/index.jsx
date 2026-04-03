import { h, render } from 'preact';
import Router from 'preact-router';
import { Header } from '@/widgets/header/Header';
import { Footer } from '@/widgets/footer/Footer';
import { CalculatorPage } from '@/pages/calculator/CalculatorPage';
import '@/shared/ui/globals.css';

function NotFound() {
  return (
    <main style={{ padding: '80px 20px', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', marginBottom: '16px' }}>404</h1>
      <p style={{ color: 'var(--clr-text-secondary)', marginBottom: '24px' }}>Страница не найдена</p>
      <a href="/calculator" style={{ color: 'var(--clr-accent)', fontWeight: 700 }}>← На калькулятор</a>
    </main>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Router>
        <CalculatorPage path="/calculator" />
        <NotFound default />
      </Router>
      <Footer />
    </div>
  );
}

render(<App />, document.getElementById('app'));
