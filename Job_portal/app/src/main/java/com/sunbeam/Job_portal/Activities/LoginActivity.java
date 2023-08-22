package com.sunbeam.Job_portal.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sunbeam.Job_portal.Entity.Applicant;
import com.sunbeam.Job_portal.R;
import com.sunbeam.Job_portal.utils.RetroClient;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    EditText editEmail, editPassword;
    CheckBox checkBoxRememberMe;
    Button loginButton;
    TextView btnRegister;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        editEmail = findViewById(R.id.editEmail);
        editPassword = findViewById(R.id.editPassword);
        checkBoxRememberMe = findViewById(R.id.checkBoxRememberMe);
        loginButton = findViewById(R.id.btnLogin);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!editEmail.getText().toString().equals("") && !editPassword.getText().toString().equals(""))
                {
                    login(v);
                }else {
                    Toast.makeText(LoginActivity.this, "Please enter username and password", Toast.LENGTH_SHORT).show();
                }
            }
        });
        btnRegister = findViewById(R.id.btnRegister);
        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(LoginActivity.this, RegisterActivity.class));
            }
        });

    }



    public void login(View view) {
        Applicant account = new Applicant();
        account.setEmail(editEmail.getText().toString());
        account.setPassword(editPassword.getText().toString());

        if (checkBoxRememberMe.isChecked()) {
            getSharedPreferences("jobportal", MODE_PRIVATE).edit().putBoolean("login_status",true).apply();
        }

        RetroClient.getInstance().getApi().login(account).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                JsonArray array = response.body().getAsJsonObject().get("data").getAsJsonArray();
                if (array.size() != 0) {
                    JsonObject object = array.get(0).getAsJsonObject();
                    getSharedPreferences("jobportal", MODE_PRIVATE).edit()
                            .putInt("applicantId", object.get("applicant_id").getAsInt()).apply();
                    startActivity(new Intent(LoginActivity.this, MainActivity.class));
                    finish();
                } else
                    Toast.makeText(LoginActivity.this, "Invalid Credentials", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Toast.makeText(LoginActivity.this, "Something Went Wrong", Toast.LENGTH_SHORT).show();
            }
        });
    }

//    public void register(View view) {
//        startActivity(new Intent(this, RegisterActivity.class));
//    }
}