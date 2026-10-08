export function getInitials(name, fallback = '?') {
  const parts = (name ?? '').trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return fallback.charAt(0).toUpperCase();

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}
