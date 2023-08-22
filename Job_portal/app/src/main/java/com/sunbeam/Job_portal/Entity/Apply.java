package com.sunbeam.Job_portal.Entity;

import java.io.Serializable;

public class Apply implements Serializable
{
    private int job_applied_id;
    private int applicant_id;
    private int posted_by_id;
    private int job_id;
    private boolean selected;


    public Apply(){}

    public Apply(int job_applied_id, int applicant_id, int posted_by_id, int job_id, boolean selected) {
        this.job_applied_id = job_applied_id;
        this.applicant_id = applicant_id;
        this.posted_by_id = posted_by_id;
        this.job_id = job_id;
        this.selected = selected;
    }

    public int getApplicant_id() {
        return applicant_id;
    }


    public int getJob_applied_id() {
        return job_applied_id;
    }

    public void setJob_applied_id(int job_applied_id) {
        this.job_applied_id = job_applied_id;
    }

    public void setApplicant_id(int applicant_id) {
        this.applicant_id = applicant_id;
    }

    public int getPosted_by_id() {
        return posted_by_id;
    }

    public void setPosted_by_id(int posted_by_id) {
        this.posted_by_id = posted_by_id;
    }

    public int getJob_id() {
        return job_id;
    }

    public void setJob_id(int job_id) {
        this.job_id = job_id;
    }

    public boolean isSelected() {
        return selected;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }
}
