import { createMMKV, MMKV } from 'react-native-mmkv';
import { Platform } from 'react-native';

const storage = createMMKV({
  id: 'mmkv.default',
  ...(Platform.OS === 'ios' && {
    appGroupID: 'group.com.guerra.WaterCounter',
  }),
});

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

const GOAL_KEY = 'settings:goal';
const DEFAULT_GOAL = 2000;

export function getGoal(): number {
  const stored = storage.getString(GOAL_KEY);
  return stored ? Number(stored) : DEFAULT_GOAL;
}

export function setGoal(value: number) {
  storage.set(GOAL_KEY, String(value));
}

