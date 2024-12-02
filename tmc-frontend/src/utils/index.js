export const parseLocalStorageValue = (key) => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (err) {
    console.error("Failed to parse - Invalid JSON", err);
    return null;
  }
};
