import WidgetKit
import SwiftUI

struct QuickActionEntry: TimelineEntry {
    let date: Date
}

struct QuickActionProvider: TimelineProvider {
    func placeholder(in context: Context) -> QuickActionEntry {
        QuickActionEntry(date: Date())
    }
    
    func getSnapshot(in context: Context, completion: @escaping (QuickActionEntry) -> Void) {
        let entry = QuickActionEntry(date: Date())
        completion(entry)
    }
    
    func getTimeline(in context: Context, completion: @escaping (Timeline<QuickActionEntry>) -> Void) {
        let entry = QuickActionEntry(date: Date())
        // Update once per hour (widget is static except when tapped)
        let nextUpdate = Calendar.current.date(byAdding: .hour, value: 1, to: Date())!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
}

struct QuickActionView: View {
    var entry: QuickActionEntry
    
    var body: some View {
        ZStack {
            LinearGradient(
                gradient: Gradient(colors: [Color.blue, Color.cyan]),
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            
            VStack(spacing: 8) {
                Image(systemName: "plus.circle.fill")
                    .font(.system(size: 32))
                    .foregroundColor(.white)
                
                Text("Add 250ml")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.white)
                
                Image(systemName: "drop.fill")
                    .font(.system(size: 20))
                    .foregroundColor(.white.opacity(0.8))
            }
        }
    }
}

struct QuickActionWidget: Widget {
    let kind: String = "QuickActionWidget"
    
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: QuickActionProvider()) { entry in
            QuickActionView(entry: entry)
                .widgetURL(URL(string: "watercounter://add250")!)
        }
        .configurationDisplayName("Quick Add 250ml")
        .description("Tap to quickly add 250ml to your daily intake")
        .supportedFamilies([.systemSmall])
    }
}


