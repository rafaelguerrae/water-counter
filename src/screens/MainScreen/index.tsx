import { useEffect, useMemo, useState, useCallback } from 'react';
import { Pressable, ScrollView, TextInput, View, StatusBar, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { dateKey, getByKey, setByKey, getGoal } from '@/src/lib/localStorage';
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

  const addWater = useCallback((amount: number) => {
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
  }, [todayTotal]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Handle deep links from widgets
    const handleDeepLink = (event: { url: string }) => {
      const url = event.url;
      if (url.includes('add250')) {
        addWater(250);
      }
    };

    // Handle initial URL (when app is opened from widget)
    Linking.getInitialURL().then((url) => {
      if (url && url.includes('add250')) {
        addWater(250);
      }
    });

    // Listen for deep links while app is running
    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, [addWater]);

  const presets = [250, 500, 750, 1000];
  const goalAmount = getGoal();
  const progress = Math.min(1, todayTotal / goalAmount);
  const progressPercent = Math.round(progress * 100);

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Image source={require('@/src/assets/images/icon.png')} style={styles.logo} />

          <View style={styles.todayCard}>
            <ThemedText style={styles.todayLabel}>Today&apos;s Total</ThemedText>
            <ThemedText style={styles.todayAmount}>{todayTotal}</ThemedText>
            <ThemedText style={styles.todayUnit}>ml</ThemedText>
            
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
              </View>
            </View>
            
            <ThemedText style={styles.goalText}>
              {todayTotal >= goalAmount 
                ? '🎉 Goal reached!' 
                : `${goalAmount - todayTotal} ml to reach ${goalAmount} ml goal`}
            </ThemedText>
          </View>

          <View style={styles.actions}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Quick Add</ThemedText>
            <View style={styles.presetsRow}>
              {presets.map((amt) => (
                <Pressable 
                  key={amt} 
                  onPress={() => addWater(amt)} 
                  style={({ pressed }) => [styles.presetBtn, pressed && styles.pressed]}
                >
                  <ThemedText style={styles.presetAmount}>{amt}</ThemedText>
                  <ThemedText style={styles.presetLabel}>ml</ThemedText>
                </Pressable>
              ))}
            </View>

            <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, styles.customTitle]}>Custom Amount</ThemedText>
            <View style={styles.customRow}>
              <TextInput
                value={customAmount}
                onChangeText={setCustomAmount}
                keyboardType="number-pad"
                placeholder="Enter amount"
                placeholderTextColor="#999"
                style={styles.input}
              />
              <Pressable
                onPress={() => addWater(Number(customAmount))}
                style={({ pressed }) => [styles.addBtn, pressed && styles.pressed]}
              >
                <ThemedText style={styles.addBtnText}>Add</ThemedText>
              </Pressable>
            </View>
          </View>

          <View style={styles.analytics}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Last 7 Days</ThemedText>
            <View style={styles.chartCard}>
              <View style={styles.chart}>
                {last7.map((d) => {
                  const pct = Math.min(1, d.total / maxVal);
                  const h = Math.max(8, Math.round(140 * pct));
                  const label = d.date.slice(5);
                  const isToday = d.date === dateKey();
                  return (
                    <View key={d.date} style={styles.barContainer}>
                      <ThemedText style={styles.barValue}>{d.total > 0 ? d.total : ''}</ThemedText>
                      <View style={[styles.bar, { height: h }, isToday && styles.barToday]} />
                      <ThemedText style={[styles.barDate, isToday && styles.barDateToday]}>{label}</ThemedText>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
