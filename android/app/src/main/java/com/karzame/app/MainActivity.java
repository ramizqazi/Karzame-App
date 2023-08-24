package com.karzamee.app;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import android.view.KeyEvent; // <--- import
import com.github.kevinejohn.keyevent.KeyEventModule; // <--- import

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.media.AudioAttributes;
import android.content.ContentResolver;
import android.net.Uri;
import android.app.NotificationChannel;
import android.os.Build;
import android.os.Bundle;

import androidx.core.app.NotificationCompat;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

   
@Override
protected void onCreate(Bundle savedInstanceState) {


if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
          NotificationChannel notificationChannel = new NotificationChannel("sound_channel", "Karzame", NotificationManager.IMPORTANCE_HIGH);
          notificationChannel.setShowBadge(true);
          notificationChannel.setDescription("");
          AudioAttributes att = new AudioAttributes.Builder()
                  .setUsage(AudioAttributes.USAGE_NOTIFICATION)
                  .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                  .build();
          notificationChannel.setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + getPackageName() + "/raw/ring"), att);
          notificationChannel.enableVibration(true);
          notificationChannel.setVibrationPattern(new long[]{400, 400});
          notificationChannel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
          NotificationManager manager = getSystemService(NotificationManager.class);
          manager.createNotificationChannel(notificationChannel);
      }





super.onCreate(savedInstanceState); 
}

  @Override
  protected String getMainComponentName() {
    return "Karzame";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
  }
  @Override  // <--- Add this method if you want to react to keyDown
  public boolean onKeyDown(int keyCode, KeyEvent event) {

  
    KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);

 
    super.onKeyDown(keyCode, event);
    return true;
  }

  @Override  // <--- Add this method if you want to react to keyUp
  public boolean onKeyUp(int keyCode, KeyEvent event) {
    KeyEventModule.getInstance().onKeyUpEvent(keyCode, event);
  
    super.onKeyUp(keyCode, event);
    return true; 
  }

  @Override
  public boolean onKeyMultiple(int keyCode, int repeatCount, KeyEvent event) {
      KeyEventModule.getInstance().onKeyMultipleEvent(keyCode, repeatCount, event);
      return super.onKeyMultiple(keyCode, repeatCount, event);
  }
 

}
