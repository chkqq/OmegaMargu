import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { ImagePlaceholder } from '@/shared/ui/ImagePlaceholder';
import { fetchStudentFeedback } from '@/shared/api/index';
import { MOCK_STORIES } from '@/shared/api/mockHome';
import styles from './StudentStories.module.css';

export function StudentStories() {
  const [stories, setStories] = useState(MOCK_STORIES);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    fetchStudentFeedback()
      .then(data => data.info?.length && setStories(data.info.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <section class={styles.section}>
      <h2 class={styles.heading}>Истории студентов:<br/>без сценария и красивых слов</h2>

      <div class={styles.grid}>
        {stories.map(story => (
          <div key={story.id} class={styles.card} onClick={() => story.videoUrl && setActiveVideo(story.videoUrl)}>
            <div class={styles.imgWrap}>
              <ImagePlaceholder
                label={`Фото — ${story.name ?? story.cn}`}
                src={story.imageUrl}
                aspectRatio="3/4"
                className={styles.img}
              />
              {story.videoUrl && (
                <div class={styles.playBtn}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.6)"/>
                    <path d="M10 8l6 4-6 4V8z" fill="white"/>
                  </svg>
                </div>
              )}
              <div class={styles.overlay}>
                <p class={styles.storyName}>{story.name ?? story.cn}</p>
                <p class={styles.storyDesc}>{story.description ?? story.text}</p>
              </div>
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
