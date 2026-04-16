import { h } from 'preact';
import styles from './ImagePlaceholder.module.css';

/**
 * Placeholder for images that need to be filled in
 * @param {{ label?: string, aspectRatio?: string, className?: string, src?: string, alt?: string }} props
 */
export function ImagePlaceholder({ label = 'Фото', aspectRatio = '16/9', className = '', src, alt }) {
  if (src) {
    return <img src={src} alt={alt ?? label} class={`${styles.img} ${className}`} style={{ aspectRatio }} />;
  }

  return (
    <div class={`${styles.placeholder} ${className}`} style={{ aspectRatio }}>
      <div class={styles.inner}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="6" width="28" height="20" rx="3" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="11" cy="13" r="3" stroke="currentColor" stroke-width="1.5"/>
          <path d="M2 22l7-5 5 4 5-6 11 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>{label}</span>
      </div>
    </div>
  );
}
