package com.guerra.WaterCounter.widgets

import android.content.Context
import com.tencent.mmkv.MMKV
import java.text.SimpleDateFormat
import java.util.*

object MMKVHelper {
    private var mmkv: MMKV? = null

    fun initialize(context: Context) {
        if (mmkv == null) {
            MMKV.initialize(context)
            mmkv = MMKV.defaultMMKV()
        }
    }

    private fun dateKey(date: Date = Date()): String {
        val sdf = SimpleDateFormat("yyyy-MM-dd", Locale.US)
        return sdf.format(date)
    }

    private fun storageKey(key: String): String {
        return "intake:$key"
    }

    fun getIntake(context: Context, date: Date = Date()): Int {
        initialize(context)
        val key = dateKey(date)
        val storageKey = storageKey(key)
        val value = mmkv?.decodeString(storageKey) ?: "0"
        return value.toIntOrNull() ?: 0
    }

    fun setIntake(context: Context, value: Int, date: Date = Date()) {
        initialize(context)
        val key = dateKey(date)
        val storageKey = storageKey(key)
        mmkv?.encode(storageKey, value.toString())
    }

    fun addIntake(context: Context, amount: Int, date: Date = Date()) {
        val current = getIntake(context, date)
        setIntake(context, current + amount, date)
    }

    fun getGoal(context: Context): Int {
        initialize(context)
        val value = mmkv?.decodeString("settings:goal") ?: "2000"
        return value.toIntOrNull() ?: 2000
    }
}


