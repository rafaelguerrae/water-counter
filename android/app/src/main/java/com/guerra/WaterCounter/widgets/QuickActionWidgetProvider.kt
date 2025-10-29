package com.guerra.WaterCounter.widgets

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import com.guerra.WaterCounter.MainActivity
import com.guerra.WaterCounter.R

class QuickActionWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        
        if (intent.action == ACTION_ADD_WATER) {
            // Add 250ml
            MMKVHelper.addIntake(context, 250)
            
            // Update all display widgets
            val appWidgetManager = AppWidgetManager.getInstance(context)
            val displayWidgetIds = appWidgetManager.getAppWidgetIds(
                android.content.ComponentName(context, DisplayWidgetProvider::class.java)
            )
            for (widgetId in displayWidgetIds) {
                DisplayWidgetProvider.updateAppWidget(context, appWidgetManager, widgetId)
            }
            
            // Open the app
            val mainIntent = Intent(context, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                data = android.net.Uri.parse("watercounter://add250")
            }
            context.startActivity(mainIntent)
        }
    }

    companion object {
        const val ACTION_ADD_WATER = "com.guerra.WaterCounter.ADD_WATER"

        fun updateAppWidget(
            context: Context,
            appWidgetManager: AppWidgetManager,
            appWidgetId: Int
        ) {
            val views = RemoteViews(context.packageName, R.layout.widget_quick_action)

            val intent = Intent(context, QuickActionWidgetProvider::class.java).apply {
                action = ACTION_ADD_WATER
            }
            val pendingIntent = PendingIntent.getBroadcast(
                context,
                0,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )

            views.setOnClickPendingIntent(R.id.widget_quick_action_button, pendingIntent)

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}


