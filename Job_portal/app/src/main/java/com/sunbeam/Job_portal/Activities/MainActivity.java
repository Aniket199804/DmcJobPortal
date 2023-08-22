package com.sunbeam.Job_portal.Activities;

import androidx.annotation.DrawableRes;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.viewpager2.widget.ViewPager2;

import android.os.Bundle;

import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;
import com.sunbeam.Job_portal.Adapters.JobFragmentAdapter;
import com.sunbeam.Job_portal.R;

public class MainActivity extends AppCompatActivity {
    ViewPager2 viewPager2;
    TabLayout tabLayout;
    JobFragmentAdapter jobFragmentAdapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        viewPager2 = findViewById(R.id.viewPager);
        tabLayout = findViewById(R.id.tabLayout);
        jobFragmentAdapter = new JobFragmentAdapter(this);
        viewPager2.setAdapter(jobFragmentAdapter);

        new TabLayoutMediator(tabLayout, viewPager2, new TabLayoutMediator.TabConfigurationStrategy() {
            @Override
            public void onConfigureTab(@NonNull TabLayout.Tab tab, int position) {
                switch (position)
                {

                    case 0:
                        tab.setText("Home");
                        tab.setIcon(R.drawable.home_icon);
                                break;
                    case 1:
                        tab.setText("Applies");
                        tab.setIcon(R.drawable.applied_icon);
                        break;
                    case 2:
                        tab.setText("Profile");
                        tab.setIcon(R.drawable.account_icon);

                        break;


                }
            }
        }).attach();

    }
}