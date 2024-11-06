import styles from "./EmptyLayout.module.css";
import React from "react";

const NoFilesIllustration = ({ width = 400, height = 400 }) => (
  <div className={styles["illustration-container"]}>
    <svg width={width} height={height} viewBox="0 0 400 400" fill="none">
      {/* Обновленный фоновый круг */}
      <circle cx="200" cy="200" r="180" fill="#F8FAFC" />
      
      {/* Обновленный компьютер */}
      <rect x="100" y="140" width="200" height="150" rx="16" fill="#E2E8F0" />
      <rect x="120" y="160" width="160" height="100" rx="8" fill="#CBD5E1" />
      <rect x="160" y="290" width="80" height="20" fill="#E2E8F0" />
      <rect x="140" y="310" width="120" height="10" rx="5" fill="#E2E8F0" />

      {/* Анимированные линии кода */}
      <g className={styles.codelines}>
        <path d="M140 180H260" stroke="#94A3B8" strokeWidth="3" strokeDasharray="8 8" />
        <path d="M140 200H260" stroke="#94A3B8" strokeWidth="3" strokeDasharray="8 8" />
        <path d="M140 220H220" stroke="#94A3B8" strokeWidth="3" strokeDasharray="8 8" />
      </g>

      {/* Обновленные декоративные элементы */}
      <circle cx="100" cy="100" r="12" fill="#60A5FA" opacity="0.6">
        <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="300" cy="100" r="16" fill="#34D399" opacity="0.6">
        <animate attributeName="r" values="16;18;16" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="300" r="14" fill="#F87171" opacity="0.6">
        <animate attributeName="r" values="14;16;14" dur="2.2s" repeatCount="indefinite" />
      </circle>

      {/* Текст */}
      <text
        x="200"
        y="350"
        textAnchor="middle"
        fill="#475569"
        fontFamily="system-ui"
        fontSize="18"
        fontWeight="600"
      >
        Ни один файл не выбран
      </text>
      <text
        x="200"
        y="375"
        textAnchor="middle"
        fill="#64748B"
        fontFamily="system-ui"
        fontSize="14"
      >
        Выберите файл из списка слева
      </text>
    </svg>
  </div>
);

const EmptyLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <NoFilesIllustration />
      </div>
    </div>
  );
};

export { EmptyLayout };
