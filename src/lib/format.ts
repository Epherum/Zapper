export function formatShortId(id?: string | null, prefix = "T") {
  if (!id) return "";
  const clean = id.replace(/-/g, "");
  const short = clean.slice(0, 6).toUpperCase();
  return prefix ? `${prefix}-${short}` : short;
}
