import WidgetKit
import SwiftUI

struct DisplayWidgetEntry: TimelineEntry {
    let date: Date
    let intake: Int
    let goal: Int
}

struct DisplayWidgetProvider: TimelineProvider {
    func placeholder(in context: Context) -> DisplayWidgetEntry {
        DisplayWidgetEntry(date: Date(), intake: 1500, goal: 2000)
    }
    
    func getSnapshot(in context: Context, completion: @escaping (DisplayWidgetEntry) -> Void) {
        let intake = MMKVHelper.shared.getIntake()
        let goal = MMKVHelper.shared.getGoal()
        let entry = DisplayWidgetEntry(date: Date(), intake: intake, goal: goal)
        completion(entry)
    }
    
    func getTimeline(in context: Context, completion: @escaping (Timeline<DisplayWidgetEntry>) -> Void) {
        let intake = MMKVHelper.shared.getIntake()
        let goal = MMKVHelper.shared.getGoal()
        let entry = DisplayWidgetEntry(date: Date(), intake: intake, goal: goal)
        
        // Update every 15 minutes
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
}

struct DisplayWidgetView: View {
    var entry: DisplayWidgetEntry
    
    var body: some View {
        ZStack {
            Color(red: 0.95, green: 0.97, blue: 1.0)
            
            VStack(spacing: 8) {
                HStack {
                    Image(systemName: "drop.fill")
                        .foregroundColor(.blue)
                        .font(.system(size: 20))
                    Text("Water Intake")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(.primary)
                    Spacer()
                }
                
                Spacer()
                
                HStack(alignment: .lastTextBaseline, spacing: 4) {
                    Text("\(entry.intake)")
                        .font(.system(size: 36, weight: .bold))
                        .foregroundColor(.primary)
                    Text("ml")
                        .font(.system(size: 16, weight: .medium))
                        .foregroundColor(.secondary)
                }
                
                // Progress bar
                GeometryReader { geometry in
                    ZStack(alignment: .leading) {
                        RoundedRectangle(cornerRadius: 6)
                            .fill(Color.gray.opacity(0.2))
                            .frame(height: 12)
                        
                        RoundedRectangle(cornerRadius: 6)
                            .fill(
                                LinearGradient(
                                    gradient: Gradient(colors: [Color.blue, Color.cyan]),
                                    startPoint: .leading,
                                    endPoint: .trailing
                                )
                            )
                            .frame(width: geometry.size.width * progress, height: 12)
                    }
                }
                .frame(height: 12)
                
                Text(goalText)
                    .font(.system(size: 11))
                    .foregroundColor(.secondary)
                
                Spacer()
            }
            .padding(16)
        }
    }
    
    var progress: CGFloat {
        return min(1.0, CGFloat(entry.intake) / CGFloat(entry.goal))
    }
    
    var goalText: String {
        if entry.intake >= entry.goal {
            return "🎉 Goal reached!"
        } else {
            let remaining = entry.goal - entry.intake
            return "\(remaining) ml to reach \(entry.goal) ml goal"
        }
    }
}

struct DisplayWidget: Widget {
    let kind: String = "DisplayWidget"
    
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: DisplayWidgetProvider()) { entry in
            DisplayWidgetView(entry: entry)
        }
        .configurationDisplayName("Water Intake")
        .description("View your daily water intake progress")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}


