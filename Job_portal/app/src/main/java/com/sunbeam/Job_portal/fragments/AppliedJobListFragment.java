package com.sunbeam.Job_portal.fragments;

import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sunbeam.Job_portal.Adapters.AppliedJobRecyclerViewAdapter;
import com.sunbeam.Job_portal.Adapters.JobListRecyclerViewAdapter;
import com.sunbeam.Job_portal.Entity.Job;
import com.sunbeam.Job_portal.R;
import com.sunbeam.Job_portal.utils.RetroClient;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class AppliedJobListFragment extends Fragment {

    RecyclerView recyclerView;
    List<Job> jobListApplied;
    AppliedJobRecyclerViewAdapter recyclerViewAdapter;
    Job job;

    int applicantId;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_applied_job_list, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        jobListApplied = new ArrayList<>();
        recyclerView = view.findViewById(R.id.recyclerViewApplied);
        recyclerViewAdapter = new AppliedJobRecyclerViewAdapter(getContext(),jobListApplied);
        recyclerView.setAdapter(recyclerViewAdapter);
        recyclerView.setLayoutManager(new GridLayoutManager(getContext(),1));


        applicantId = getContext().getSharedPreferences("jobportal", Context.MODE_PRIVATE).getInt("applicantId",0);


    }

    @Override
    public void onResume() {
        super.onResume();
        getAppliedJobs();
    }

    private void getAppliedJobs()
    {
        jobListApplied.clear();

        RetroClient.getInstance().getApi().getAllAppliedJobs(applicantId).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {


                if(response.body().getAsJsonObject().get("status").getAsString().equals("success"))
                {
                    JsonArray jsonArray = response.body().getAsJsonObject().get("data").getAsJsonArray();

                    for(JsonElement element : jsonArray) {
                        job = new Job();


                        job.setJob_description(element.getAsJsonObject().get("job_description").getAsString());
                        job.setJob_id(element.getAsJsonObject().get("job_id").getAsInt());
                        job.setJob_location(element.getAsJsonObject().get("job_location").getAsString());
                        job.setIs_active(element.getAsJsonObject().get("is_active").getAsBoolean());
                        job.setCreated_date(element.getAsJsonObject().get("created_date").getAsString());
                        job.setPosted_by_id(element.getAsJsonObject().get("posted_by_id").getAsInt());
                        job.setJob_type(element.getAsJsonObject().get( "job_type").getAsString());
                        job.setSkill_set_required(element.getAsJsonObject().get("skill_set_required").getAsString());
                        job.setPosition(element.getAsJsonObject().get("position").getAsInt());
                        job.setCompany_name(element.getAsJsonObject().get("company_name").getAsString());


                        jobListApplied.add(job);


                    }
                    recyclerViewAdapter.notifyDataSetChanged();



                }

            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });

    }
}