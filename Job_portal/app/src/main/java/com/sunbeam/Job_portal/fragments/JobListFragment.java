package com.sunbeam.Job_portal.fragments;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.SearchView;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sunbeam.Job_portal.Adapters.JobListRecyclerViewAdapter;
import com.sunbeam.Job_portal.Entity.Job;
import com.sunbeam.Job_portal.R;
import com.sunbeam.Job_portal.utils.RetroClient;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class JobListFragment extends Fragment {

    List<Job> jobList;
    JobListRecyclerViewAdapter jobListRecyclerViewAdapter;
    RecyclerView recyclerView;
    Job job;
    SearchView searchView,searchViewFilterCity;

    public JobListFragment() {
        // Required empty public constructor
    }




    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        return inflater.inflate(R.layout.fragment_job_list, container, false);
    }



    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        jobList = new ArrayList<>();
        recyclerView = view.findViewById(R.id.recyclerViewJobList);
        jobListRecyclerViewAdapter = new JobListRecyclerViewAdapter(getContext(),jobList);
        recyclerView.setAdapter(jobListRecyclerViewAdapter);
        recyclerView.setLayoutManager(new GridLayoutManager(getContext(),1));
        searchView = view.findViewById(R.id.searchView);
        searchView.clearFocus();
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {

                filterList(newText);
                return true;
            }
        });

        searchViewFilterCity = view.findViewById(R.id.searchViewFilterCity);
        searchViewFilterCity.clearFocus();
        searchViewFilterCity.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {


                filterCityList(newText);
                return true;
            }
        });

    }

    private void filterCityList(String text)
    {
        List<Job> filterJobCityList = new ArrayList<>();


        for(Job job1 : jobList)
        {
            if(job1.getJob_location().toLowerCase().contains(text.toLowerCase()))
            {
                filterJobCityList.add(job1);
            }
        }


        if(filterJobCityList.isEmpty())
        {
            Toast.makeText(getContext(), "NOT FOUND", Toast.LENGTH_SHORT).show();
        }
        else {
            jobListRecyclerViewAdapter.setFilteredList(filterJobCityList);
        }
    }

    private void filterList(String text)
    {
        List<Job> filterJobList = new ArrayList<>();

        for(Job job1 : jobList)
        {
            if(job1.getJob_type().toLowerCase().contains(text.toLowerCase()) || job1.getCompany_name().toLowerCase().contains(text.toLowerCase()))
            {
                filterJobList.add(job1);
            }
        }

        if(filterJobList.isEmpty())
        {
            Toast.makeText(getContext(), "NOT FOUND", Toast.LENGTH_SHORT).show();
        }
        else {
            jobListRecyclerViewAdapter.setFilteredList(filterJobList);
        }

    }

    @Override
    public void onStart() {
        super.onStart();
        getJobList();
    }

    private void getJobList()
    {
        jobList.clear();

        RetroClient.getInstance().getApi().getAllJobs().enqueue(new Callback<JsonObject>() {
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


                       jobList.add(job);


                    }
                    jobListRecyclerViewAdapter.notifyDataSetChanged();



                }

            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });


    }
}