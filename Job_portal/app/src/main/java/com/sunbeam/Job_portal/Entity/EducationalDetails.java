package com.sunbeam.Job_portal.Entity;

import java.io.Serializable;

public class EducationalDetails implements Serializable
{
    int applicant_id;
    String degree_name;
    String university_name;
    String start_date;
    String completion_date;
    Double percentage;
    String skill_set;

    public EducationalDetails()
    {

    }

    public EducationalDetails(int applicant_id, String degree_name, String university_name, String start_date, String completion_date, Double percentage, String skill_set) {
        this.applicant_id = applicant_id;
        this.degree_name = degree_name;
        this.university_name = university_name;
        this.start_date = start_date;
        this.completion_date = completion_date;
        this.percentage = percentage;
        this.skill_set = skill_set;
    }

    public int getApplicant_id() {
        return applicant_id;
    }

    public void setApplicant_id(int applicant_id) {
        this.applicant_id = applicant_id;
    }

    public String getDegree_name() {
        return degree_name;
    }

    public void setDegree_name(String degree_name) {
        this.degree_name = degree_name;
    }

    public String getUniversity_name() {
        return university_name;
    }

    public void setUniversity_name(String university_name) {
        this.university_name = university_name;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getCompletion_date() {
        return completion_date;
    }

    public void setCompletion_date(String completion_date) {
        this.completion_date = completion_date;
    }

    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }

    public String getSkill_set() {
        return skill_set;
    }

    public void setSkill_set(String skill_set) {
        this.skill_set = skill_set;
    }


    @Override
    public String toString() {
        return "Educational_Details{" +
                "applicant_id=" + applicant_id +
                ", degree_name='" + degree_name + '\'' +
                ", university_name='" + university_name + '\'' +
                ", start_date='" + start_date + '\'' +
                ", completion_date='" + completion_date + '\'' +
                ", percentage=" + percentage +
                ", skill_set='" + skill_set + '\'' +
                '}';
    }
}
