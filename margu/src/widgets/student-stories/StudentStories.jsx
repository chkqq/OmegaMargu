import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './StudentStories.module.css';
import story1 from '@/assets/design/story-1.png'
import story2 from '@/assets/design/story-2.png';
import story3 from '@/assets/design/story-3.png';
import story4 from '@/assets/design/story-4.png';

const STORIES = [
  {
    id: 1,
    imageUrl: story1,
    name: 'Алина',
    description: 'магистратура по маркетингу: почему вернулась к нам после бакалавриата',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 2,
    imageUrl: story2,
    name: 'Ильдар',
    description: 'выпускник IT: как устроился в компанию мечты ещё до диплома',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 3,
    imageUrl: story3,
    name: 'Маша',
    description: '2 курс дизайна: как нашла стажировку мечты',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 4,
    imageUrl: story4,
    name: 'Максим',
    description: 'выпускник меда: как сменил направление медицины во время обучения',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];

export function StudentStories() {
  const [stories] = useState(STORIES);
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section class={styles.section}>
      <h2 class={styles.heading}>Истории студентов:<br/>без сценария и красивых слов</h2>

      <div class={styles.grid}>
        {stories.map(story => (
          <div key={story.id ?? story.feedbackId ?? story.cn} class={styles.card} onClick={() => story.videoUrl && setActiveVideo(story.videoUrl)}>
            <div class={styles.imgWrap}>
              <img src={story.imageUrl} alt="" class={styles.img} />
              <span class={styles.playBtn}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M8 5.5v11l8-5.5-8-5.5z" fill="currentColor"/>
                </svg>
              </span>
              <span class={styles.overlay}>
                <span class={styles.storyName}>{story.name},</span>
                <span class={styles.storyDesc}>{story.description}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {activeVideo && (
        <div class={styles.modal} onClick={() => setActiveVideo(null)}>
          <div class={styles.modalInner} onClick={e => e.stopPropagation()}>
            <button class={styles.modalClose} onClick={() => setActiveVideo(null)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <div class={styles.videoWrap}>
              <iframe
                src={activeVideo}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                class={styles.iframe}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
