# Xcode Widget Extension Setup Checklist

Follow these steps to complete the iOS widget setup in Xcode.

## ⚠️ Important: Manual Xcode Configuration Required

The widget files have been created, but you need to configure the Xcode project manually.

## Steps

### 1. Install CocoaPods Dependencies

```bash
cd ios
pod install
cd ..
```

### 2. Open Xcode

```bash
open ios/WaterCounter.xcworkspace
```

### 3. Create Widget Extension Target

1. **File** → **New** → **Target**
2. Choose **Widget Extension**
3. Configure:
   - **Product Name**: `WaterCounterWidgets` (Xcode will name the target `WaterCounterWidgetsExtension`)
   - **Team**: Your Apple Developer Team
   - **Organization Identifier**: `com.guerra`
   - **Bundle Identifier**: `com.guerra.WaterCounter.WaterCounterWidgetsExtension`
   - **Language**: Swift
   - **Project**: WaterCounter
4. Click **Finish**
5. When prompted "Activate 'WaterCounterWidgetsExtension' scheme?", click **Activate**

### 4. Delete Auto-Generated Files

In the Project Navigator, delete these auto-generated files from the `WaterCounterWidgetsExtension` folder:
- `WaterCounterWidgets.swift` (the auto-generated one)
- `WaterCounterWidgetsBundle.swift` (if created)
- Any other Swift files Xcode created

### 5. Add Your Widget Files

1. Right-click the `WaterCounterWidgetsExtension` folder in Xcode
2. Select **Add Files to "WaterCounter"...**
3. Navigate to `ios/WaterCounterWidgets/` in your project
4. Select ALL files:
   - ☑️ `WaterCounterWidgets.swift`
   - ☑️ `WaterWidgetProvider.swift`
   - ☑️ `QuickActionProvider.swift`
   - ☑️ `MMKVHelper.swift`
   - ☑️ `Info.plist`
   - ☑️ `WaterCounterWidgets.entitlements`
   - ☑️ `Assets.xcassets` folder
5. **Important**: Check "Copy items if needed"
6. **Target Membership**: Check **WaterCounterWidgetsExtension** only
7. Click **Add**

### 6. Enable App Groups for Main App

1. Select **WaterCounter** project in Project Navigator
2. Select **WaterCounter** target (not the widgets target)
3. Go to **Signing & Capabilities** tab
4. Click **+ Capability** button
5. Select **App Groups**
6. Click the **+** button in the App Groups section
7. Add: `group.com.guerra.WaterCounter`
8. Ensure the checkbox is **checked**

### 7. Enable App Groups for Widget Extension

1. Still in Project Navigator, select **WaterCounterWidgetsExtension** target
2. Go to **Signing & Capabilities** tab
3. Click **+ Capability** button
4. Select **App Groups**
5. Click the **+** button in the App Groups section
6. Add: `group.com.guerra.WaterCounter` (same as above)
7. Ensure the checkbox is **checked**

### 8. Add Widget Target to Podfile

1. Close Xcode
2. Open `ios/Podfile` in a text editor
3. Add the widget target (match the main app's framework settings):
```ruby
target 'WaterCounterWidgetsExtension' do
  pod 'MMKV'
end
```
5. Save the file
6. Run `pod install` in the `ios` directory:
```bash
cd ios
pod install
cd ..
```
7. Reopen Xcode workspace:
```bash
open ios/WaterCounter.xcworkspace
```

### 9. Set Deployment Target

1. Select **WaterCounterWidgets** target
2. Go to **General** tab
3. Set **Minimum Deployments** to **iOS 15.0** or higher

### 10. Verify Build Settings

For **WaterCounterWidgets** target:

1. Go to **Build Settings** tab
2. Search for "Framework Search Paths"
3. Ensure it includes: `$(inherited)` and `"${PODS_CONFIGURATION_BUILD_DIR}/MMKV"`
4. Search for "Swift Optimization Level"
5. For Debug: Set to **No Optimization [-Onone]**

### 11. Configure Info.plist

1. Select **WaterCounterWidgets** target
2. Go to **Info** tab
3. Verify these keys exist (should be from the Info.plist file):
   - `NSExtension` → `NSExtensionPointIdentifier` = `com.apple.widgetkit-extension`

### 12. Build and Test

1. Select the **WaterCounter** scheme (not WaterCounterWidgets)
2. Select your device or simulator
3. Click **Build** (⌘B)
4. Fix any errors that appear
5. Click **Run** (⌘R)

### 13. Add Widgets to Home Screen

On your device/simulator:
1. Long-press the home screen
2. Tap the **+** button (top-left)
3. Search for "Water Counter"
4. You should see two widgets:
   - **Water Intake** (display widget)
   - **Quick Add 250ml** (quick action)
5. Add them to your home screen

## Troubleshooting

### "No such module 'MMKV'"

**Solution**:
1. Make sure you uncommented the widget target in Podfile (step 8)
2. Run `pod install` again from the `ios` directory
3. Close and reopen Xcode workspace
4. Clean build folder: **Product** → **Clean Build Folder** (⇧⌘K)
5. Rebuild

### "App Groups not found"

**Solution**:
1. Check both targets have identical App Group identifier
2. Verify App Groups capability is enabled for both targets
3. Check that entitlements files are properly configured

### Widgets not showing in widget gallery

**Solution**:
1. Make sure you're running the main **WaterCounter** scheme, not the widget scheme
2. Rebuild the entire app
3. Try restarting the simulator/device
4. Check that Info.plist has the correct NSExtension configuration

### Widget shows "Unable to Load"

**Solution**:
1. Check that MMKV is properly initialized in MMKVHelper.swift
2. Verify App Groups are correctly configured
3. Check device logs in Xcode: **Window** → **Devices and Simulators**
4. Rebuild and reinstall the app

## Verification Checklist

- [ ] Initial `pod install` completed successfully
- [ ] Widget extension target created in Xcode
- [ ] Widget Swift files added to target
- [ ] App Groups enabled for main app
- [ ] App Groups enabled for widget extension
- [ ] Same App Group ID used for both
- [ ] Podfile widget target uncommented
- [ ] Second `pod install` completed (after target creation)
- [ ] App builds without errors
- [ ] Widgets appear in widget gallery
- [ ] Display widget shows current intake
- [ ] Quick action widget adds 250ml when tapped

## Next Steps

Once iOS setup is complete, you can build for Android:

```bash
npx expo run:android
```

Android widgets work automatically with the files already configured.

