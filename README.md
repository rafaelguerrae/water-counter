# Water Counter

Track your daily water intake with a simple, beautiful interface.

## Features

- 📊 Track daily water intake in ml
- 🎯 Customizable daily goal (default 2000ml)
- 📈 View last 7 days history with chart
- ⚡ Quick add presets (250ml, 500ml, 750ml, 1000ml)
- 📝 Custom amount input
- 📱 **iOS and Android home screen widgets**

## Widgets

Two widget types available:

1. **Display Widget**: Shows today's intake and progress bar
2. **Quick Action Widget**: Tap to add 250ml instantly

See [WIDGETS_SETUP.md](WIDGETS_SETUP.md) for setup instructions.

## Installation

```bash
npm install
npx expo prebuild
```

### iOS

```bash
npx expo run:ios
```

### Android

```bash
npx expo run:android
```

## Tech Stack

- React Native (Expo)
- TypeScript
- MMKV for fast local storage
- Native widgets (iOS WidgetKit, Android AppWidget)