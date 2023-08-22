package com.sunbeam.Job_portal.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.gson.JsonObject;
import com.sunbeam.Job_portal.Entity.Applicant;
import com.sunbeam.Job_portal.R;
import com.sunbeam.Job_portal.utils.RetroClient;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfileDetailsActivity extends AppCompatActivity {

    EditText editfirstName,editlastName,editEmail,editcontactNo;

    Button btnSave,btnCancel;

    Applicant applicant;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_details);



        editfirstName = findViewById(R.id.editfirstName);
        editlastName = findViewById(R.id.editlastName);

        editEmail = findViewById(R.id.editEmail);
        editcontactNo = findViewById(R.id.editcontactNo);

        btnCancel = findViewById(R.id.btnCancel);
        btnSave = findViewById(R.id.btnSave);

        applicant = (Applicant) getIntent().getSerializableExtra("applicant");

        editEmail.setText(applicant.getEmail());
        editcontactNo.setText(applicant.getContact_number());
        editfirstName.setText(applicant.getFirst_name());
        editlastName.setText(applicant.getLast_name());

        int applicantId = getSharedPreferences("jobportal",MODE_PRIVATE).getInt("applicantId",0);


        btnCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });


        btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                String firstName= editfirstName.getText().toString();
                String lastName = editlastName.getText().toString();
                String email= editEmail.getText().toString();
                String contact = editcontactNo.getText().toString();
                Applicant applicant = validateData(firstName,lastName,email,contact);


                if(applicant!=null)
                {
                    ///////Retrofit code to be import here
                    Applicant applicant1 = new Applicant();
                    applicant1.setEmail(editEmail.getText().toString());
                    applicant1.setContact_number(editcontactNo.getText().toString());
                    applicant1.setLast_name(editlastName.getText().toString());
                    applicant1.setFirst_name(editfirstName.getText().toString());

                    RetroClient.getInstance().getApi().updateApplicant(applicant1,applicantId).enqueue(new Callback<JsonObject>() {
                        @Override
                        public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {


                            if(response.body().getAsJsonObject().get("status").getAsString().equals("success"))
                            {
                                Toast.makeText(ProfileDetailsActivity.this, "Updated Successfully", Toast.LENGTH_SHORT).show();
                                finish();
                            }

                        }

                        @Override
                        public void onFailure(Call<JsonObject> call, Throwable t) {




                        }
                    });
                }



            }
        });




    }

    private Applicant validateData(String firstName, String lastName, String email, String contact) {
        if (firstName.equals(""))
        {
            Toast.makeText(this, "Please enter first name", Toast.LENGTH_SHORT).show();
        } else if (lastName.equals(""))
        {
            Toast.makeText(this, "Please enter first name", Toast.LENGTH_SHORT).show();
        } else if (email.equals("") || !email.contains("@") || !email.contains(".") )
        {
            Toast.makeText(this, "Please enter valid email", Toast.LENGTH_SHORT).show();
        } else if (contact.length() != 10) {
            Toast.makeText(this, "Please enter valid Contact", Toast.LENGTH_SHORT).show();
        }else {
            Applicant applicant = new Applicant();

            applicant.setFirst_name(firstName);
            applicant.setLast_name(lastName);
            applicant.setEmail(email);
            applicant.setContact_number(contact);
            return  applicant;
        }
        return null;
    }
}