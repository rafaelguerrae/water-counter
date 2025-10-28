import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { dateKey, getByKey, setByKey } from '@/src/lib/localStorage';
import { styles } from './style'

export function MainScreen() {
  const [todayTotal, setTodayTotal] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [last7, setLast7] = useState<{ date: string; total: number }[]>([]);
  const maxVal = useMemo(() => {
    const vals = last7.map((d) => d.total);
    const m = Math.max(0, ...vals);
    return m <= 0 ? 1 : m;
  }, [last7]);

  const loadData = () => {
    const key = dateKey();
    const current = getByKey(key);
    setTodayTotal(current);

    const days: { date: string; total: number }[] = [];
    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const k = dateKey(d);
      const total = getByKey(k);
      days.push({ date: k, total });
    }
    setLast7(days);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addWater = (amount: number) => {
    if (!Number.isFinite(amount) || amount <= 0) return;
    const key = dateKey();
    const newTotal = todayTotal + amount;
    setByKey(key, newTotal);
    setTodayTotal(newTotal);
    setLast7((prev) => {
      const idx = prev.findIndex((x) => x.date === key);
      if (idx === -1) return prev;
      const next = [...prev];
      next[idx] = { date: key, total: newTotal };
      return next;
    });
    setCustomAmount('');
  };

  const presets = [250, 500, 1000];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText type="title">Water Counter</ThemedText>
          <ThemedText type="subtitle">Track your daily intake</ThemedText>
        </View>

        <View style={styles.todayCard}>
          <ThemedText type="subtitle">Today</ThemedText>
          <ThemedText type="title" style={styles.todayAmount}>{todayTotal} ml</ThemedText>
        </View>

        <View style={styles.actions}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Quick add</ThemedText>
          <View style={styles.presetsRow}>
            {presets.map((amt) => (
              <Pressable key={amt} onPress={() => addWater(amt)} style={({ pressed }) => [styles.pillBtn, pressed && styles.pressed]}>
                <ThemedText type="defaultSemiBold">{amt} ml</ThemedText>
              </Pressable>
            ))}
          </View>

          <View style={styles.customRow}>
            <TextInput
              value={customAmount}
              onChangeText={setCustomAmount}
              keyboardType="number-pad"
              placeholder="Custom (ml)"
              style={styles.input}
            />
            <Pressable
              onPress={() => addWater(Number(customAmount))}
              style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
            >
              <ThemedText type="defaultSemiBold" style={styles.primaryBtnText}>Add</ThemedText>
            </Pressable>
          </View>
        </View>

        <View style={styles.analytics}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Last 7 days</ThemedText>
          <View style={styles.chart}>
            {last7.map((d) => {
              const pct = Math.min(1, d.total / maxVal);
              const h = Math.max(6, Math.round(120 * pct));
              const label = d.date.slice(5); // MM-DD
              return (
                <View key={d.date} style={styles.barContainer}>
                  <ThemedText style={styles.barValue}>{d.total > 0 ? `${d.total}` : ''}</ThemedText>
                  <View style={[styles.bar, { height: h }]} />
                  <ThemedText style={styles.barDate}>{label}</ThemedText>
                </View>
              );
            })}
          </View>
          <View style={styles.list}>
            {last7.map((d) => (
              <View key={d.date} style={styles.listItem}>
                <ThemedText style={styles.listDate}>{d.date}</ThemedText>
                <ThemedText>{d.total} ml</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
