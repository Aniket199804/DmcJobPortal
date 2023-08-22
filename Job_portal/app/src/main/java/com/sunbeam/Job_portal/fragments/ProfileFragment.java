package com.sunbeam.Job_portal.fragments;

import android.Manifest;
import android.app.Activity;
import android.app.DatePickerDialog;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

import android.provider.MediaStore;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sunbeam.Job_portal.Activities.EducationalDetailsUpdateActivity;
import com.sunbeam.Job_portal.Activities.LoginActivity;
import com.sunbeam.Job_portal.Activities.ProfileDetailsActivity;
import com.sunbeam.Job_portal.Entity.Applicant;
import com.sunbeam.Job_portal.Entity.EducationalDetails;
import com.sunbeam.Job_portal.R;
import com.sunbeam.Job_portal.utils.API;
import com.sunbeam.Job_portal.utils.RealPathUtils;
import com.sunbeam.Job_portal.utils.RetroClient;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
public class ProfileFragment extends Fragment {

    Button completeDate,startDate,btnLogout;
    TextView updateEducation,txtdegree,txtuniversity,txtPercent,txtSkill,txtStartdate,txtCompdate;
    TextView textname1,textlastname1,txtmail,txtcontact,txtUpdate;
    Applicant applicant;
    EducationalDetails educationalDetails;
    ImageView imageView;
    ActivityResultLauncher<Intent> activityResultLauncher;
    Button btnCamera;
    String image;
    int applicantId;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onStart() {
        super.onStart();
        applicantId = getContext().getSharedPreferences("jobportal", Context.MODE_PRIVATE).getInt("applicantId",0);


        RetroClient.getInstance().getApi().getImgName(applicantId).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if(response.body().getAsJsonObject().get("status").getAsString().equals("success")) {
                    JsonArray array = response.body().getAsJsonObject().get("data").getAsJsonArray();
                    for (JsonElement ele: array)
                    {
                        String image1 = ele.getAsJsonObject().get("profileImg").getAsString();
                        Toast.makeText(getContext(), ""+image, Toast.LENGTH_SHORT).show();
                        Glide.with(getContext()).load(API.BASE_URL+"/"+image1).into(imageView);
                    }
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });


    }

    @Override
    public void onResume() {
        super.onResume();
        getPersonalProfileDetails();
        getEducationalDetails();








    }



    private void getEducationalDetails()
    {
            RetroClient.getInstance().getApi().getEducationalDetails(applicantId).enqueue(new Callback<JsonObject>() {
                @Override
                public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                    if(response.body().getAsJsonObject().get("status").getAsString().equals("success"))
                    {
                        JsonArray array = response.body().getAsJsonObject().get("data").getAsJsonArray();
                        for(JsonElement element : array)
                        {
                            educationalDetails = new EducationalDetails();
                            educationalDetails.setApplicant_id(applicantId);
                            educationalDetails.setDegree_name(element.getAsJsonObject().get("degree_name").getAsString());
                            educationalDetails.setUniversity_name(element.getAsJsonObject().get("university_name").getAsString());
                            educationalDetails.setPercentage(element.getAsJsonObject().get("percentage").getAsDouble());
                            educationalDetails.setSkill_set(element.getAsJsonObject().get("skill_set").getAsString());
                            educationalDetails.setStart_date(element.getAsJsonObject().get("start_date").getAsString());
                            educationalDetails.setCompletion_date(element.getAsJsonObject().get("completion_date").getAsString());
                            txtdegree.setText(educationalDetails.getDegree_name());
                            txtuniversity.setText(educationalDetails.getUniversity_name());
                            txtPercent.setText(String.valueOf(educationalDetails.getPercentage()));
                            txtSkill.setText(educationalDetails.getSkill_set());
                            startDate.setText(educationalDetails.getStart_date().substring(0,10));
                            completeDate.setText(educationalDetails.getCompletion_date().substring(0,10));
                        }
                    }
                }

                @Override
                public void onFailure(Call<JsonObject> call, Throwable t) {
                }
            });
    }


    private void getPersonalProfileDetails()
    {
        RetroClient.getInstance().getApi().getApplicantById(applicantId).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if(response.body().getAsJsonObject().get("status").getAsString().equals("success"))
                {
                    JsonArray array = response.body().getAsJsonObject().get("data").getAsJsonArray();
                    for(JsonElement element : array)
                    {
                        applicant = new Applicant();
                        applicant.setFirst_name(element.getAsJsonObject().get("first_name").getAsString());
                        applicant.setLast_name(element.getAsJsonObject().get("last_name").getAsString());
                        applicant.setEmail(element.getAsJsonObject().get("email").getAsString());
                        applicant.setContact_number(element.getAsJsonObject().get("contact_number").getAsString());

                        textname1.setText(""+applicant.getFirst_name());
                        textlastname1.setText(""+applicant.getLast_name());
                        txtmail.setText(""+applicant.getEmail());
                        txtcontact.setText(""+applicant.getContact_number());
                    }
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
            }
        });
    }
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        return inflater.inflate(R.layout.fragment_profile, container, false);
    }


    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        completeDate = view.findViewById(R.id.btnCompletedt);
        startDate = view.findViewById(R.id.btnStartdt);

        txtUpdate = view.findViewById(R.id.txtUpdate);
        textname1 = view.findViewById(R.id.textname1);
        textlastname1 = view.findViewById(R.id.textlastname1);
        txtmail = view.findViewById(R.id.txtmail);
        txtcontact = view.findViewById(R.id.txtcontact);
        updateEducation = view.findViewById(R.id.updateEducation);
        txtdegree = view.findViewById(R.id.txtdegree);
        txtuniversity = view.findViewById(R.id.txtuniversity);
        txtPercent = view.findViewById(R.id.txtPercent);
        txtSkill = view.findViewById(R.id.txtSkill);
        btnLogout = view.findViewById(R.id.btnLogout);

        imageView = view.findViewById(R.id.imgProfile);
        btnCamera = view.findViewById(R.id.btnCamera);



        btnCamera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(ContextCompat.checkSelfPermission(getContext(), Manifest.permission.READ_EXTERNAL_STORAGE)== PackageManager.PERMISSION_DENIED) {
                    requestPermissions(new String[]
                            {Manifest.permission.READ_EXTERNAL_STORAGE}, 1);

                    ActivityCompat.requestPermissions(getActivity(),new String[]{Manifest.permission.READ_MEDIA_IMAGES }, 22);            }


                if(ContextCompat.checkSelfPermission(getContext(), Manifest.permission.READ_MEDIA_IMAGES)== PackageManager.PERMISSION_DENIED) {
                    requestPermissions(new String[]
                            {Manifest.permission.READ_MEDIA_IMAGES}, 23);
                }



                changeProfileImage(v);
            }
        });

        activityResultLauncher= registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), new ActivityResultCallback<ActivityResult>() {
            @Override
            public void onActivityResult(ActivityResult result) {
                if(result.getResultCode()== Activity.RESULT_OK)
                {
                    Intent data = result.getData();
                    Uri uri = data.getData();
                    String path = RealPathUtils.getRealPath(getContext(),uri);
                    imageView.setImageURI(uri);
                    //Creating File to be upload over server
                    File file = new File(path);
                    RequestBody requestBody = RequestBody.create(MediaType.parse("image/jpg"), file);
                    MultipartBody.Part filePart = MultipartBody.Part.createFormData("image", file.getName(), requestBody);

                    RetroClient.getInstance().getApi().uploadImg(applicantId,filePart).enqueue(new Callback<JsonObject>() {
                        @Override
                        public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                            Toast.makeText(getContext(), "sucesss", Toast.LENGTH_SHORT).show();
                            imageView.setImageURI(uri);
                        }
                        @Override
                        public void onFailure(Call<JsonObject> call, Throwable t) {
                            Toast.makeText(getContext(), "fail", Toast.LENGTH_SHORT).show();
                        }
                    });
                }
            }
        });

        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                getContext().getSharedPreferences("jobportal", Context.MODE_PRIVATE).edit().putBoolean("login_status",false).apply();
                getContext().startActivity(new Intent(getContext(), LoginActivity.class));
            }
        });

        updateEducation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(educationalDetails == null)
                {
                    educationalDetails = new EducationalDetails();
                    educationalDetails.setApplicant_id(applicantId);
                    educationalDetails.setCompletion_date("NA");
                    educationalDetails.setStart_date("NA");
                    educationalDetails.setDegree_name("NA");
                    educationalDetails.setPercentage(0.0);
                    educationalDetails.setSkill_set("NA");
                    educationalDetails.setUniversity_name("NA");
                }
                Intent intent = new Intent(getContext(),EducationalDetailsUpdateActivity.class);
                intent.putExtra("educationalDetails",educationalDetails);
                getContext().startActivity(intent);
            }
        });

        txtUpdate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getContext(), ProfileDetailsActivity.class);
                intent.putExtra("applicant",applicant);
                startActivity(intent);
            }
        });
    }

    private void changeProfileImage(View v)
    {
        Intent iProfile = new Intent(Intent.ACTION_PICK);
        iProfile.setData(MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        activityResultLauncher.launch(iProfile);
    }



}