import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { tokenSignal, clearToken } from '@/entities/auth/model';
import { fetchProfile } from '@/shared/api/index';
import { logout } from '@/shared/api/index';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const token = tokenSignal.value;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetchProfile(token)
      .then(setProfile)
      .catch(() => setProfile({ full_name: 'Абитуриент', email: '—', place: '—', education: '—' }))
      .finally(() => setLoading(false));
  }, [token]);

  const handleLogout = async () => {
    try { await logout(token); } catch {}
    clearToken();
  };

  if (!token) {
    return (
      <main class={styles.main}>
        <div class={styles.noAuth}>
          <h1>Войдите в аккаунт</h1>
          <p>Для просмотра личного кабинета необходимо авторизоваться</p>
          <a href="/" class={styles.backBtn}>← На главную</a>
        </div>
      </main>
    );
  }

  if (loading) {
    return <main class={styles.main}><div class={styles.loading}>Загрузка...</div></main>;
  }

  return (
    <main class={styles.main}>
      <div class={styles.container}>
        <div class={styles.card}>
          <div class={styles.avatar}>
            {profile?.full_name?.charAt(0) ?? 'А'}
          </div>
          <div class={styles.info}>
            <h1 class={styles.name}>{profile?.full_name}</h1>
            <p class={styles.email}>{profile?.email}</p>
          </div>
          <button class={styles.logoutBtn} onClick={handleLogout}>Выйти</button>
        </div>

        <div class={styles.details}>
          <ProfileRow label="Email" value={profile?.email} />
          <ProfileRow label="Место проживания" value={profile?.place} />
          <ProfileRow label="Учебное заведение" value={profile?.education} />
        </div>
      </div>
    </main>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div class={styles.row}>
      <span class={styles.rowLabel}>{label}</span>
      <span class={styles.rowValue}>{value || '—'}</span>
    </div>
  );
}
