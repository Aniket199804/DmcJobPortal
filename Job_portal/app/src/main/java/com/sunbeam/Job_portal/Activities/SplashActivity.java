package com.sunbeam.Job_portal.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;

import com.sunbeam.Job_portal.R;

public class SplashActivity extends AppCompatActivity {
    ImageView imageView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        imageView = findViewById(R.id.imageview);
        Animation animation = AnimationUtils.loadAnimation(this,R.anim.fadeout);
        imageView.setAnimation(animation);
        animation.start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(2000);
                    if(getSharedPreferences("jobportal",MODE_PRIVATE).getBoolean("login_status",false))
                        startActivity(new Intent(SplashActivity.this,MainActivity.class));
                    else
                    {
                        startActivity(new Intent(SplashActivity.this,LoginActivity.class));
                    }

                    finish();
                }catch (InterruptedException e){
                    throw new RuntimeException(e);
                }
            }
        }).start();


    }
}