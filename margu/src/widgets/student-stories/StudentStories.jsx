import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './StudentStories.module.css';
import story1 from '@/assets/design/story-1.png'
import story2 from '@/assets/design/story-2.png';
import story3 from '@/assets/design/story-3.png';

const STORIES = [
  { id: 1, imageUrl: story1, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 2, imageUrl: story2, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 3, imageUrl: story3, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
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
