export function deleteKeyFromObject<T extends Record<string, unknown>, K extends keyof T>(obj: T, key: K, value: T[K]) {
  const newObj = { ...obj };

  if (key in obj && obj[key] === value)
    delete newObj[key];
  else
    newObj[key] = value

  return newObj;
}