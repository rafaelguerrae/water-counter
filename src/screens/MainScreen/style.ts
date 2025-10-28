import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scroll: {
    paddingBottom: 32,
    gap: 16,
  },
  header: {
    gap: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  todayCard: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  todayAmount: {
    marginTop: 6,
    fontSize: 36,
  },
  actions: {
    gap: 12,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  presetsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pillBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  customRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  primaryBtn: {
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E86FF',
  },
  primaryBtnText: {
    color: 'white',
  },
  pressed: {
    opacity: 0.7,
  },
  analytics: {
    marginTop: 8,
    gap: 8,
  },
  list: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  listItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listDate: {
    fontVariant: ['tabular-nums'],
  },
  chart: {
    marginTop: 8,
    height: 160,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    gap: 8,
  },
  barContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    minWidth: 24,
    gap: 4,
  },
  bar: {
    width: 18,
    backgroundColor: '#2E86FF',
    borderRadius: 6,
  },
  barValue: {
    fontSize: 10,
    opacity: 0.8,
  },
  barDate: {
    fontSize: 10,
    opacity: 0.8,
    fontVariant: ['tabular-nums'],
  },
});
