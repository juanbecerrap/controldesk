function BrandMark({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M9 21.5V10.5h6.2c2.9 0 4.8 1.5 4.8 3.9 0 1.7-.9 2.9-2.4 3.5l3 3.6h-3.4l-2.5-3.2H12v3.2H9Zm3-5.7h3c1.2 0 1.9-.6 1.9-1.4s-.7-1.4-1.9-1.4h-3v2.8Z"
        fill="var(--color-brand-mark, #fff)"
      />
    </svg>
  );
}

export default BrandMark;
