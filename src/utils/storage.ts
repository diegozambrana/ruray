export const getObjectFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setObjectToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
