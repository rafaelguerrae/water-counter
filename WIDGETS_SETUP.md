# Water Counter Widgets Setup Guide

This guide shows how to set up home screen widgets for iOS and Android.

## Features

Two widgets are available:

1. **Display Widget**: Shows today's intake and progress bar toward your goal
2. **Quick Action Widget**: Tap to add 250ml instantly

Both widgets share storage with the app using MMKV.

## iOS Setup

### 1. Install Dependencies

```bash
cd ios
pod install
```

### 2. Configure Xcode Project

Open `ios/WaterCounter.xcworkspace` in Xcode:

#### Add Widget Extension Target

1. File → New → Target
2. Select "Widget Extension"
3. Name: `WaterCounterWidgets`
4. Organization: `com.guerra`
5. Bundle Identifier: `com.guerra.WaterCounter.WaterCounterWidgets`
6. Click "Finish"
7. When prompted "Activate 'WaterCounterWidgets' scheme?", click "Activate"

#### Configure Widget Target Files

1. Delete the auto-generated widget files in the WaterCounterWidgets folder
2. In Xcode's Project Navigator, right-click `WaterCounterWidgets` folder → "Add Files to WaterCounter"
3. Navigate to `ios/WaterCounterWidgets/` and add all Swift files:
   - `WaterCounterWidgets.swift`
   - `WaterWidgetProvider.swift`
   - `QuickActionProvider.swift`
   - `MMKVHelper.swift`
4. Make sure "WaterCounterWidgets" target is checked
5. Add the `Assets.xcassets`, `Info.plist`, and `WaterCounterWidgets.entitlements` files

#### Enable App Groups

1. Select the `WaterCounter` project in Project Navigator
2. Select `WaterCounter` target → Signing & Capabilities
3. Click "+ Capability" → select "App Groups"
4. Click "+" and add: `group.com.guerra.WaterCounter`
5. Select `WaterCounterWidgets` target → Signing & Capabilities
6. Click "+ Capability" → select "App Groups"
7. Click "+" and add: `group.com.guerra.WaterCounter`

#### Link MMKV to Widget Target

1. Select the project in Project Navigator
2. Select `WaterCounterWidgets` target
3. Build Phases → Link Binary With Libraries
4. Click "+" → Add `MMKV.framework` from the list

### 3. Build and Run

```bash
cd ..
npx expo run:ios
```

### 4. Add Widgets to Home Screen

1. Long-press on the home screen
2. Tap the "+" icon in the top-left
3. Search for "Water Counter"
4. Choose "Water Intake" (display) or "Quick Add 250ml" (quick action)
5. Tap "Add Widget"

## Android Setup

### 1. Build the App

```bash
npx expo run:android
```

### 2. Add Widgets to Home Screen

1. Long-press on the home screen
2. Tap "Widgets"
3. Find "WaterCounter" in the list
4. Long-press and drag either:
   - "Water Intake" (display widget)
   - "Quick Add 250ml" (quick action widget)
5. Drop it on your home screen

## Widget Behavior

### Display Widget

- **Updates**: Every 15 minutes automatically
- **Shows**:
  - Today's total intake in ml
  - Progress bar toward goal
  - Remaining ml to reach goal
  - "🎉 Goal reached!" when complete
- **Tapping**: Opens the app (iOS only)

### Quick Action Widget

- **Tapping**: Adds 250ml and opens the app
- **Updates**: Display widgets refresh immediately after tap
- **Deep Link**: Uses `watercounter://add250` scheme

## Customizing Goal

The goal is configurable through MMKV storage. To add a UI for this:

```typescript
import { setGoal } from '@/src/lib/localStorage';

// Set a custom goal (e.g., 3000ml)
setGoal(3000);
```

The default goal is 2000ml.

## Storage Keys

Widgets and app share these MMKV keys:

- **Intake data**: `intake:YYYY-MM-DD` (e.g., `intake:2025-10-28`)
- **Goal setting**: `settings:goal`

## Troubleshooting

### iOS

**Widgets not updating:**
- Rebuild the app after making changes
- Widgets update on their schedule; force by removing and re-adding

**"No such module 'MMKV'" error:**
- Run `pod install` in the `ios` directory
- Make sure MMKV is linked to the WaterCounterWidgets target

**App Groups not working:**
- Verify both targets have the same App Group identifier
- Check that entitlements files are included in target membership

### Android

**Widgets not appearing:**
- Check that receivers are registered in AndroidManifest.xml
- Verify widget XML files are in the correct res folders

**Data not syncing:**
- Make sure MMKV is initialized in widget providers
- Check that storage keys match between app and widgets

**Build errors:**
- Run `cd android && ./gradlew clean`
- Rebuild: `npx expo run:android`

## File Structure

```
ios/
├── WaterCounterWidgets/
│   ├── WaterCounterWidgets.swift
│   ├── WaterWidgetProvider.swift
│   ├── QuickActionProvider.swift
│   ├── MMKVHelper.swift
│   ├── Info.plist
│   ├── WaterCounterWidgets.entitlements
│   └── Assets.xcassets/
└── Podfile (updated with widget target)

android/app/src/main/
├── java/com/guerra/WaterCounter/widgets/
│   ├── DisplayWidgetProvider.kt
│   ├── QuickActionWidgetProvider.kt
│   └── MMKVHelper.kt
├── res/
│   ├── layout/
│   │   ├── widget_display.xml
│   │   └── widget_quick_action.xml
│   ├── drawable/
│   │   ├── widget_background.xml
│   │   ├── widget_quick_action_background.xml
│   │   └── widget_progress_drawable.xml
│   └── xml/
│       ├── display_widget_info.xml
│       └── quick_action_widget_info.xml
└── AndroidManifest.xml (updated with receivers)
```

## Development Notes

- iOS widgets use WidgetKit and SwiftUI
- Android widgets use AppWidgetProvider
- Both platforms share MMKV storage with the main app
- Deep links handled via `watercounter://` scheme
- Widgets are stateless; all data comes from MMKV


