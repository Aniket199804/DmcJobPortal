package com.sunbeam.Job_portal.utils;

import com.google.gson.JsonObject;
import com.sunbeam.Job_portal.Entity.Applicant;
import com.sunbeam.Job_portal.Entity.Apply;
import com.sunbeam.Job_portal.Entity.EducationalDetails;

import okhttp3.MultipartBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Part;
import retrofit2.http.Path;

public interface API {

    public static final String BASE_URL = "http://192.168.48.56:4001";


    //ALL JOB RELATED APIS

    @GET("/jobapplied/")
    Call<JsonObject> getAllJobs();

    @GET("/searchjob")
    Call<JsonObject> getJobByJobNameorCompany();

    @POST("/jobapplied/apply")
    Call<JsonObject> applyForJob(@Body Apply apply);


    @GET("/jobapplied/applied/{id}")
    Call<JsonObject> getAllAppliedJobs(@Path("id")int id);

    @GET("/jobapplied/applied")
    Call<JsonObject> getAppliedDetails();

    @GET("/applicant/getapplicant/{id}")
    Call<JsonObject> getApplicantById(@Path("id")int id);
    //PROFILE SIDE APIS


    @PUT("/applicant/updateapplicant/{id}")
    Call<JsonObject> updateApplicant(@Body Applicant applicant,@Path("id") int id);

    @POST("/applicant/addeducationdetails")
    Call<JsonObject> addEducationalDetails(@Body EducationalDetails educationalDetails);

    @GET("/applicant/geteducation/{id}")
    Call<JsonObject> getEducationalDetails(@Path("id") int id);

    @POST("/applicant/login")
    Call<JsonObject> login(@Body Applicant applicant);



    @Multipart
    @POST("/applicant/uploadprofile/{id}")
    Call<JsonObject> uploadImg(@Path("id") int id, @Part MultipartBody.Part file);

    @GET("/applicant/getprofile/{id}")
    Call<JsonObject> getImgName(@Path("id") int id);
    //LOGIN REGISTER APIS

    @POST("/applicant/register")
    Call<JsonObject> register(@Body Applicant applicant);


}
