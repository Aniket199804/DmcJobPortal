package com.sunbeam.Job_portal.Adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sunbeam.Job_portal.Activities.AppliedJobDetailsActivity;
import com.sunbeam.Job_portal.Activities.JobDetailsActivity;
import com.sunbeam.Job_portal.Entity.Apply;
import com.sunbeam.Job_portal.Entity.Job;
import com.sunbeam.Job_portal.R;
import com.sunbeam.Job_portal.utils.RetroClient;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class JobListRecyclerViewAdapter extends RecyclerView.Adapter<JobListRecyclerViewAdapter.MyViewHolder> {

    Context context;
    List<Job> jobList;



    public JobListRecyclerViewAdapter(Context context, List<Job> jobList) {
        this.context = context;
        this.jobList = jobList;

    }

    @NonNull
    @Override
    public JobListRecyclerViewAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.joblist_layout,null);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull JobListRecyclerViewAdapter.MyViewHolder holder, int position) {
        holder.textJobType.setText(jobList.get(position).getJob_type());
        holder.textLocation.setText(jobList.get(position).getJob_location());
        holder.textCompanyName.setText(jobList.get(position).getCompany_name());
        holder.textPostedOn.setText(jobList.get(position).getCreated_date().substring(0,10));

    }

    @Override
    public int getItemCount() {
        return jobList.size();
    }

    public void setFilteredList(List<Job> filterJobList)
    {
        this.jobList = filterJobList;
        notifyDataSetChanged();
    }

    class MyViewHolder extends RecyclerView.ViewHolder{

        TextView textJobType,textLocation,textCompanyName,textPostedOn;
        List<Apply> applyList;
        Apply apply;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            textCompanyName = itemView.findViewById(R.id.textCompanyName);
            textJobType = itemView.findViewById(R.id.textJobType);
            textLocation = itemView.findViewById(R.id.textLocation);
            textPostedOn = itemView.findViewById(R.id.textPostedDt);
            applyList = new ArrayList<>();
            int applicantId = context.getSharedPreferences("jobportal",Context.MODE_PRIVATE).getInt("applicantId",0);
            
            
            RetroClient.getInstance().getApi().getAppliedDetails().enqueue(new Callback<JsonObject>() {
                @Override
                public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {

                    if(response.body().getAsJsonObject().get("status").getAsString().equals("success"))
                    {
                        JsonArray jsonArray = response.body().getAsJsonObject().get("data").getAsJsonArray();

                        for(JsonElement element : jsonArray) {
                           
                            apply = new Apply();
                            apply.setApplicant_id(element.getAsJsonObject().get("applicant_id").getAsInt());
                            apply.setJob_id(element.getAsJsonObject().get("job_id").getAsInt());
                            apply.setJob_applied_id(element.getAsJsonObject().get("job_applied_id").getAsInt());
                            apply.setPosted_by_id(element.getAsJsonObject().get("posted_by_id").getAsInt());

                            applyList.add(apply);
                            
                        }
                    }
                    
                }

                @Override
                public void onFailure(Call<JsonObject> call, Throwable t) {

                }
            });
            final boolean[] isApplied = {false};
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Job job = jobList.get(getAdapterPosition());
                    Toast.makeText(context, "clicked"+job.getJob_id(), Toast.LENGTH_SHORT).show();
                    Toast.makeText(context, ""+applyList.size(), Toast.LENGTH_SHORT).show();
                    for (Apply ele : applyList)
                    {
                        //use shared preferneces
                        if(  ele.getJob_id() == job.getJob_id() && ele.getPosted_by_id() == job.getPosted_by_id() && ele.getApplicant_id() == applicantId )
                        {
                             isApplied[0] = true;
                        }

                    }

                    if(isApplied[0])
                    {
                        Toast.makeText(context, "already applied", Toast.LENGTH_SHORT).show();
                        Intent intent = new Intent(context, AppliedJobDetailsActivity.class);
                        intent.putExtra("job",job);
                        context.startActivity(intent);
                    }
                    else {
                        Toast.makeText(context, "not applied", Toast.LENGTH_SHORT).show();
                        Intent intent = new Intent(context, JobDetailsActivity.class);
                        intent.putExtra("job",job);
                        context.startActivity(intent);
                    }


                }
            });
            
                


        }
    }
}
