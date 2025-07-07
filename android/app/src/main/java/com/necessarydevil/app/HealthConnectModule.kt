// package com.events.necessarydevilapp
package com.necessarydevil.app


import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.provider.Settings
import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class HealthConnectModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "HealthConnectModule"
    }

    @ReactMethod
    fun openHealthConnectPermissions() {
        val context = reactApplicationContext
        val packageManager = context.packageManager
        val healthConnectPackage = "com.google.android.apps.healthdata"

        // Check if Health Connect is installed
        val isInstalled = try {
            packageManager.getPackageInfo(healthConnectPackage, 0)
            true
        } catch (e: PackageManager.NameNotFoundException) {
            false
        }

        if (isInstalled) {
            val intent = Intent().apply {
                action = Settings.ACTION_APPLICATION_DETAILS_SETTINGS
                data = Uri.parse("package:$healthConnectPackage")
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }
            context.startActivity(intent)
        } else {
            Toast.makeText(context, "Health Connect is not installed", Toast.LENGTH_LONG).show()
        }
    }
    @ReactMethod
    fun openPermissionsRationale() {
        val activity = currentActivity ?: return
        val intent = Intent(activity, PermissionsRationaleActivity::class.java)
        activity.startActivity(intent)
    }
}
