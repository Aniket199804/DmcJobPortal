package com.sunbeam.Job_portal.Adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.sunbeam.Job_portal.Activities.AppliedJobDetailsActivity;
import com.sunbeam.Job_portal.Activities.JobDetailsActivity;
import com.sunbeam.Job_portal.Entity.Job;
import com.sunbeam.Job_portal.R;

import java.util.List;

public class AppliedJobRecyclerViewAdapter extends RecyclerView.Adapter<AppliedJobRecyclerViewAdapter.MyViewHolder> {
    Context context;
    List<Job> jobList;

    public AppliedJobRecyclerViewAdapter(Context context, List<Job> jobList) {
        this.context = context;
        this.jobList = jobList;
    }

    @NonNull
    @Override
    public AppliedJobRecyclerViewAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType)
    {
        View view = LayoutInflater.from(context).inflate(R.layout.joblist_layout,null);

        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AppliedJobRecyclerViewAdapter.MyViewHolder holder, int position) {
        holder.textJobType.setText(jobList.get(position).getJob_type());
        holder.textLocation.setText(jobList.get(position).getJob_location());
        holder.textCompanyName.setText(jobList.get(position).getCompany_name());
        holder.textPostedOn.setText(jobList.get(position).getCreated_date().substring(0,10));

    }

    @Override
    public int getItemCount() {
        return jobList.size();
    }

    class MyViewHolder extends RecyclerView.ViewHolder
    {


        TextView textJobType,textLocation,textCompanyName,textPostedOn;


        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            textCompanyName = itemView.findViewById(R.id.textCompanyName);
            textJobType = itemView.findViewById(R.id.textJobType);
            textLocation = itemView.findViewById(R.id.textLocation);
            textPostedOn = itemView.findViewById(R.id.textPostedDt);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Job job = jobList.get(getAdapterPosition());
                    Intent intent = new Intent(context, AppliedJobDetailsActivity.class);
                    intent.putExtra("job",job);
                    context.startActivity(intent);
                }
            });

        }
    }
}
