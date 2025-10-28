import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();

export const dateKey = (d: Date = new Date()) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const storageKeyFor = (key: string) => `intake:${key}`;

export function getByKey(key: string): number {
  return Number(storage.getString(storageKeyFor(key)) ?? '0');
}

export function setByKey(key: string, value: number) {
  storage.set(storageKeyFor(key), String(value));
}

