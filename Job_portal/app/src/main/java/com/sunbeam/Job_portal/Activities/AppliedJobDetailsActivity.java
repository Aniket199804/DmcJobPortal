package com.sunbeam.Job_portal.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.JsonObject;
import com.sunbeam.Job_portal.Entity.Apply;
import com.sunbeam.Job_portal.Entity.Job;
import com.sunbeam.Job_portal.R;
import com.sunbeam.Job_portal.utils.RetroClient;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AppliedJobDetailsActivity extends AppCompatActivity {
    TextView textCompanyName,textPosition,textSkill,textLocation,textDate,textIsActive,textDescription,textJobType;
    Button btnApply,btnCancel;

    Job job;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_applied_job_details);
        textCompanyName = findViewById(R.id.companyName);
        textPosition = findViewById(R.id.position);
        textSkill = findViewById(R.id.skill);
        textLocation = findViewById(R.id.location);
        textDate = findViewById(R.id.createdDate);
        textIsActive = findViewById(R.id.isActive);
        textDescription = findViewById(R.id.textDescription);
        textJobType = findViewById(R.id.jobType);

        btnApply = findViewById(R.id.btnApply);
        btnCancel = findViewById(R.id.btnCancel);

        job = (Job) getIntent().getSerializableExtra("job");


        textCompanyName.setText(job.getCompany_name());
        textPosition.setText("Positions: "+String.valueOf(job.getPosition()));
        textDate.setText(job.getCreated_date().substring(0,10));
        textSkill.setText("Skills: "+job.getSkill_set_required());
        textLocation.setText(job.getJob_location());
        textIsActive.setText(job.isIs_active()? "IS ACTIVE : YES":"IS ACTIVE : NO");
        textDescription.setText(job.getJob_description());
        textJobType.setText(job.getJob_type());

        btnCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        btnApply.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(AppliedJobDetailsActivity.this, "ALREADY APPLIED", Toast.LENGTH_SHORT).show();
            }
        });
    }
}