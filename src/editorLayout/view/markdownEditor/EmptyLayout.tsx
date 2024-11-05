import styles from "./EmptyLayout.module.css";
import React from "react";

const NoFilesIllustration = ({ width = 400, height = 400 }) => (
  <div className={styles["illustration-container"]}>
    <svg width={width} height={height} viewBox="0 0 400 400" fill="none">
      {/* Фоновый круг */}
      <circle cx="200" cy="200" r="180" fill="#F3F4F6" />

      {/* Грустный компьютер */}
      <rect x="100" y="140" width="200" height="150" rx="10" fill="#E5E7EB" />
      <rect x="120" y="160" width="160" height="100" rx="5" fill="#D1D5DB" />
      <rect x="160" y="290" width="80" height="20" fill="#E5E7EB" />
      <rect x="140" y="310" width="120" height="10" rx="5" fill="#E5E7EB" />

      {/* Экран компьютера */}
      <path
        d="M140 180H260"
        stroke="#9CA3AF"
        strokeWidth="4"
        strokeDasharray="8 8"
      />
      <path
        d="M140 200H260"
        stroke="#9CA3AF"
        strokeWidth="4"
        strokeDasharray="8 8"
      />
      <path
        d="M140 220H220"
        stroke="#9CA3AF"
        strokeWidth="4"
        strokeDasharray="8 8"
      />

      {/* Грустное лицо */}
      <circle cx="180" cy="200" r="5" fill="#6B7280" />
      <circle cx="220" cy="200" r="5" fill="#6B7280" />
      <path
        d="M185 230C185 230 200 220 215 230"
        stroke="#6B7280"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Летающие файлы */}
      <g transform="rotate(-15 220 100)">
        <rect x="220" y="100" width="40" height="50" rx="5" fill="#60A5FA" />
        <path d="M230 120H250" stroke="white" strokeWidth="2" />
        <path d="M230 130H250" stroke="white" strokeWidth="2" />
      </g>

      <g transform="rotate(15 150 80)">
        <rect x="150" y="80" width="40" height="50" rx="5" fill="#34D399" />
        <path d="M160 100H180" stroke="white" strokeWidth="2" />
        <path d="M160 110H180" stroke="white" strokeWidth="2" />
      </g>

      <g transform="rotate(-5 260 150)">
        <rect x="260" y="150" width="40" height="50" rx="5" fill="#F87171" />
        <path d="M270 170H290" stroke="white" strokeWidth="2" />
        <path d="M270 180H290" stroke="white" strokeWidth="2" />
      </g>

      {/* Текст */}
      <text
        x="200"
        y="350"
        textAnchor="middle"
        fill="#6B7280"
        fontFamily="Arial"
        fontSize="16"
        fontWeight="bold"
      >
        Ни один файл не выбран
      </text>
      <text
        x="200"
        y="370"
        textAnchor="middle"
        fill="#9CA3AF"
        fontFamily="Arial"
        fontSize="14"
      >
        Выберите файл из списка
      </text>

      {/* Декоративные элементы */}
      <circle cx="100" cy="100" r="10" fill="#60A5FA" opacity="0.5" />
      <circle cx="300" cy="100" r="15" fill="#34D399" opacity="0.5" />
      <circle cx="80" cy="300" r="12" fill="#F87171" opacity="0.5" />
      <circle cx="320" cy="280" r="8" fill="#FBBF24" opacity="0.5" />

      {/* Пунктирная окружность */}
      <circle
        cx="200"
        cy="200"
        r="190"
        stroke="#E5E7EB"
        strokeWidth="4"
        strokeDasharray="15 10"
      />
    </svg>
  </div>
);

const EmptyLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.stub}>
        <NoFilesIllustration />
      </div>
    </div>
  );
};

export { EmptyLayout };
