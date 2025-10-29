//
//  WaterCounterWidgetsLiveActivity.swift
//  WaterCounterWidgets
//
//  Created by Rafael Guerra Evangelista on 28/10/25.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct WaterCounterWidgetsAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct WaterCounterWidgetsLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: WaterCounterWidgetsAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension WaterCounterWidgetsAttributes {
    fileprivate static var preview: WaterCounterWidgetsAttributes {
        WaterCounterWidgetsAttributes(name: "World")
    }
}

extension WaterCounterWidgetsAttributes.ContentState {
    fileprivate static var smiley: WaterCounterWidgetsAttributes.ContentState {
        WaterCounterWidgetsAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: WaterCounterWidgetsAttributes.ContentState {
         WaterCounterWidgetsAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: WaterCounterWidgetsAttributes.preview) {
   WaterCounterWidgetsLiveActivity()
} contentStates: {
    WaterCounterWidgetsAttributes.ContentState.smiley
    WaterCounterWidgetsAttributes.ContentState.starEyes
}
