package com.sunbeam.Job_portal.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.Toast;

import com.google.gson.JsonObject;
import com.sunbeam.Job_portal.Entity.Applicant;
import com.sunbeam.Job_portal.R;
import com.sunbeam.Job_portal.utils.RetroClient;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterActivity extends AppCompatActivity {

    EditText editFirstName, editLastName, editEmail, editPassword, editConfirmPassword, editMobile;
    RadioButton male, female;
    Button btnRegister, btnCancel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);


        editFirstName = findViewById(R.id.editFirstName);
        editLastName = findViewById(R.id.editLastName);
        editEmail = findViewById(R.id.editEmail);
        editPassword = findViewById(R.id.editPassword);
        editConfirmPassword = findViewById(R.id.editConfirmPassword);
        editMobile = findViewById(R.id.editMobile);
        male =findViewById(R.id.rdoMale);
        female =findViewById(R.id.rdoFemale);
        btnRegister = findViewById(R.id.btnRegister);

        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                register(v);
            }
        });
        btnCancel = findViewById(R.id.btncancel);
        btnCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }

    private void register(View v)
    {
        Toast.makeText(this, "in register", Toast.LENGTH_SHORT).show();
        Applicant applicant = validateUser();

        if (applicant != null)
        {
            Toast.makeText(this, "kjasdkjbsakjdbs", Toast.LENGTH_SHORT).show();
            Log.e("account", applicant.toString());
            RetroClient.getInstance().getApi().register(applicant).enqueue(new Callback<JsonObject>() {
                @Override
                public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {

                    if (response.body().getAsJsonObject().get("status").getAsString().equals("success")) {
                        Toast.makeText(RegisterActivity.this, "User Registered Successfully", Toast.LENGTH_SHORT).show();
                        finish();
                    }

                }

                @Override
                public void onFailure(Call<JsonObject> call, Throwable t) {
                    Toast.makeText(RegisterActivity.this, "failure", Toast.LENGTH_SHORT).show();
                }
            });
        }

    }

    private Applicant validateUser() {

        String firstName= editFirstName.getText().toString();
        String lastName =editLastName.getText().toString();
        String email=editEmail.getText().toString();
        String phone =editMobile.getText().toString();
        String password = editPassword.getText().toString();
        String confirmPassword = editConfirmPassword.getText().toString();
        String gender = "";
        if (male.isChecked()) {
            gender = gender + "M";
        } else if (female.isChecked()) {
            gender = gender + "F";
        }
        Applicant account=dataValidation(firstName,lastName,email,phone,gender,password,confirmPassword);
        if (account!=null)
            return account;
        return null;
    }

    private Applicant dataValidation(String firstName, String lastName, String email, String phone, String gender, String password, String confirmPassword)
    {
        Applicant account= new Applicant();
        if (firstName.equals(""))
        {
            Toast.makeText(this, "First name cannot be empty", Toast.LENGTH_SHORT).show();

        } else if (lastName.equals(""))
        {
            Toast.makeText(this, "Last name cannot be empty", Toast.LENGTH_SHORT).show();
        }else if (email.equals(""))
        {
            Toast.makeText(this, "Email cannot be empty", Toast.LENGTH_SHORT).show();
        } else if (password.equals("") || confirmPassword.equals(""))
        {
            Toast.makeText(this, "Passwords cannot be empty", Toast.LENGTH_SHORT).show();
        } else if(phone.equals(""))
        {
            Toast.makeText(this, "Phone cannot be empty", Toast.LENGTH_SHORT).show();
        }else{
            account.setFirst_name(firstName);
            account.setLast_name(lastName);
            account.setEmail(email);
            account.setContact_number(phone);
            account.setGender(gender);
            if (password.equals(confirmPassword))
            {
                account.setPassword(password);
                return  account;
            }else
            {
                Toast.makeText(this, "Passwords should match", Toast.LENGTH_SHORT).show();
            }
        }
        return  null;
    }
}