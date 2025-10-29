package com.guerra.WaterCounter.widgets

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.widget.RemoteViews
import com.guerra.WaterCounter.R
import kotlin.math.min
import kotlin.math.roundToInt

class DisplayWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    companion object {
        fun updateAppWidget(
            context: Context,
            appWidgetManager: AppWidgetManager,
            appWidgetId: Int
        ) {
            val intake = MMKVHelper.getIntake(context)
            val goal = MMKVHelper.getGoal(context)
            val progress = min(1f, intake.toFloat() / goal.toFloat())
            val progressPercent = (progress * 100).roundToInt()

            val views = RemoteViews(context.packageName, R.layout.widget_display)
            views.setTextViewText(R.id.widget_intake_amount, intake.toString())
            views.setTextViewText(R.id.widget_intake_unit, "ml")
            views.setProgressBar(R.id.widget_progress_bar, 100, progressPercent, false)
            
            val goalText = if (intake >= goal) {
                "🎉 Goal reached!"
            } else {
                val remaining = goal - intake
                "$remaining ml to reach $goal ml goal"
            }
            views.setTextViewText(R.id.widget_goal_text, goalText)

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}


