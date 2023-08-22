package com.sunbeam.Job_portal.Entity;

import java.io.Serializable;

public class Job implements Serializable {
    private int job_id;
    private int posted_by_id;
    private String company_name;
    private String job_type;
    private String created_date;
    private String job_description;
    private boolean is_active;
    private String skill_set_required;
    private int position;
    private String job_location;

    public Job() {
        System.out.println("This is default constructor");
    }

    public Job(int job_id, int posted_by_id, String company_name, String job_type, String created_date, String job_description, boolean is_active, String skill_set_required, int position, String job_location)
    {
        this.job_id = job_id;
        this.posted_by_id = posted_by_id;
        this.company_name = company_name;
        this.job_type = job_type;
        this.created_date = created_date;
        this.job_description = job_description;
        this.is_active = is_active;
        this.skill_set_required = skill_set_required;
        this.position = position;
        this.job_location = job_location;
    }

    public int getJob_id() {
        return job_id;
    }

    public void setJob_id(int job_id) {
        this.job_id = job_id;
    }

    public int getPosted_by_id() {
        return posted_by_id;
    }

    public void setPosted_by_id(int posted_by_id) {
        this.posted_by_id = posted_by_id;
    }

    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    public String getJob_type() {
        return job_type;
    }

    public void setJob_type(String job_type) {
        this.job_type = job_type;
    }

    public String getCreated_date() {
        return created_date;
    }

    public void setCreated_date(String created_date) {
        this.created_date = created_date;
    }

    public String getJob_description() {
        return job_description;
    }

    public void setJob_description(String job_description) {
        this.job_description = job_description;
    }

    public boolean isIs_active() {
        return is_active;
    }

    public void setIs_active(boolean is_active) {
        this.is_active = is_active;
    }

    public String getSkill_set_required() {
        return skill_set_required;
    }

    public void setSkill_set_required(String skill_set_required) {
        this.skill_set_required = skill_set_required;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public String getJob_location() {
        return job_location;
    }

    public void setJob_location(String job_location) {
        this.job_location = job_location;
    }

    @Override
    public String toString() {
        return "Job{" +
                "job_id=" + job_id +
                ", posted_by_id=" + posted_by_id +
                ", company_name='" + company_name + '\'' +
                ", job_type='" + job_type + '\'' +
                ", created_date='" + created_date + '\'' +
                ", job_description='" + job_description + '\'' +
                ", is_active=" + is_active +
                ", skill_set_required='" + skill_set_required + '\'' +
                ", position=" + position +
                ", job_location='" + job_location + '\'' +
                '}';
    }
}
