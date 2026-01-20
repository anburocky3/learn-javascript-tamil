export function isObjEmpty(obj: Record<string, unknown>): boolean {
  // Check if the object is null or undefined first, to prevent errors
  if (obj === null || typeof obj !== "object") {
    return false; // Or handle as appropriate for your use case
  }
  return Object.keys(obj).length === 0;
}
