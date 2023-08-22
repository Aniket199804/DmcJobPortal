package com.sunbeam.Job_portal.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Toast;

import com.google.gson.JsonObject;
import com.sunbeam.Job_portal.Entity.EducationalDetails;
import com.sunbeam.Job_portal.R;
import com.sunbeam.Job_portal.utils.RetroClient;

import java.util.Calendar;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class EducationalDetailsUpdateActivity extends AppCompatActivity {

    EditText editdegreeName,edituniversityName,editpercentage,editSkills;
    Button btnStartdt,btnCompletedt,btnSave,btnCancel;
    EducationalDetails educationalDetails;

    int applicantId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_educational_details_update);

        editdegreeName = findViewById(R.id.editdegreeName);
        edituniversityName = findViewById(R.id.edituniversityName);
        editpercentage = findViewById(R.id.editpercentage);
        editSkills = findViewById(R.id.editSkills);
        btnStartdt = findViewById(R.id.btnStartdt);
        btnCompletedt = findViewById(R.id.btnCompletedt);
        btnSave = findViewById(R.id.btnSave);
        btnCancel = findViewById(R.id.btnCancel);

        applicantId = getSharedPreferences("jobportal", Context.MODE_PRIVATE).getInt("applicantId",0);




        educationalDetails = (EducationalDetails) getIntent().getSerializableExtra("educationalDetails");


        editdegreeName.setText(educationalDetails.getDegree_name());
        edituniversityName.setText(educationalDetails.getUniversity_name());
        editSkills.setText(educationalDetails.getSkill_set());
        editpercentage.setText(String.valueOf(educationalDetails.getPercentage()));
        if(educationalDetails.getStart_date().length()>9)
        {
            btnStartdt.setText(educationalDetails.getStart_date().substring(0,10));
        }
        else {
            btnStartdt.setText(educationalDetails.getStart_date());
        }


        if(educationalDetails.getCompletion_date().length()>9)
        {
            btnCompletedt.setText(educationalDetails.getCompletion_date().substring(0,10));
        }
        else {
            btnStartdt.setText(educationalDetails.getCompletion_date());
        }




        btnStartdt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Calendar c = Calendar.getInstance();

                int year = c.get(Calendar.YEAR);
                int month = c.get(Calendar.MONTH);
                int day = c.get(Calendar.DAY_OF_MONTH);

                DatePickerDialog datePickerDialog = new DatePickerDialog(EducationalDetailsUpdateActivity.this, new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
                        btnStartdt.setText(year + "-" + (month + 1) + "-" + dayOfMonth);
                    }
                },year,month,day);
                datePickerDialog.show();
            }
        });

        btnCompletedt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Calendar c = Calendar.getInstance();

                int year = c.get(Calendar.YEAR);
                int month = c.get(Calendar.MONTH);
                int day = c.get(Calendar.DAY_OF_MONTH);

                DatePickerDialog datePickerDialog = new DatePickerDialog(EducationalDetailsUpdateActivity.this, new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
                        btnCompletedt.setText(year + "-" + (month + 1) + "-" + dayOfMonth);
                    }
                },year,month,day);
                datePickerDialog.show();

            }
        });


        btnCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });


        btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                Double percent;
                String degree=editdegreeName.getText().toString();
                String uni=edituniversityName.getText().toString();
                if(editpercentage.getText().toString().equals("")){
                     percent = 0.0;
                }else {
                     percent = Double.parseDouble(editpercentage.getText().toString());
                }
                String skill=editSkills.getText().toString();
                String startdt=btnStartdt.getText().toString();
                String cmpltdt=btnCompletedt.getText().toString();

                EducationalDetails educationalDetails1 = validateData(degree,uni,percent,skill,startdt,cmpltdt);


                if (educationalDetails1!= null)
                {




                    RetroClient.getInstance().getApi().addEducationalDetails(educationalDetails1).enqueue(new Callback<JsonObject>() {
                        @Override
                        public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {

                            if(response.body().getAsJsonObject().get("status").getAsString().equals("success"))
                            {
                                Toast.makeText(EducationalDetailsUpdateActivity.this, "Updated Successfully", Toast.LENGTH_SHORT).show();
                                finish();

                            }

                        }

                        @Override
                        public void onFailure(Call<JsonObject> call, Throwable t) {
                            Toast.makeText(EducationalDetailsUpdateActivity.this, "fail", Toast.LENGTH_SHORT).show();
                        }
                    });
                }




            }
        });



    }

    private EducationalDetails validateData(String degree, String uni, Double percent, String skill, String startdt, String cmpltdt) {


        if (degree.equals("")) {
            Toast.makeText(this, "Please Enter Degree", Toast.LENGTH_SHORT).show();
        } else if (uni.equals("")) {
            Toast.makeText(this, "Please Enter University", Toast.LENGTH_SHORT).show();
        } else if (percent.equals(0)  && percent > 100 ) {
            Toast.makeText(this, "Please Enter Valid Percentage", Toast.LENGTH_SHORT).show();

        } else if (skill.equals("")) {
            Toast.makeText(this, "Skills Cannot Be Empty", Toast.LENGTH_SHORT).show();
        } else if (startdt.equals("")) {
            Toast.makeText(this, "Select Start Date", Toast.LENGTH_SHORT).show();
        } else if (cmpltdt.equals("")) {
            Toast.makeText(this, "Select Completion Date", Toast.LENGTH_SHORT).show();
        } else if (percent.equals(0.0)) {

            Toast.makeText(this, "Select Percentage", Toast.LENGTH_SHORT).show();
        }
        else {
            EducationalDetails educationalDetails = new EducationalDetails();
            educationalDetails.setApplicant_id(applicantId);
            educationalDetails.setDegree_name(degree);
            educationalDetails.setUniversity_name(uni);

            educationalDetails.setPercentage(percent);
            educationalDetails.setSkill_set(skill);
            educationalDetails.setStart_date(startdt);
            educationalDetails.setCompletion_date(cmpltdt);
            return educationalDetails;
        }

        return null;

        }

    }
