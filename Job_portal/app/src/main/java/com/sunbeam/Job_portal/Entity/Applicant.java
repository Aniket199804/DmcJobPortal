package com.sunbeam.Job_portal.Entity;

import java.io.Serializable;

public class Applicant implements Serializable {
    int applicant_id;
    String first_name;
    String last_name;
    String email;
    String password;
    String gender;
    String contact_number;
    String registration_date;
    String image;
    String extra_col2;

    public  Applicant()
    {

    }
    public Applicant(int applicant_id, String first_name, String last_name, String email, String password, String gender, String contact_number, String registration_date, String image, String extra_col2) {
        this.applicant_id = applicant_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.contact_number = contact_number;
        this.registration_date = registration_date;
        this.image = image;
        this.extra_col2 = extra_col2;
    }

    public int getApplicant_id() {
        return applicant_id;
    }

    public void setApplicant_id(int applicant_id) {
        this.applicant_id = applicant_id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public  String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getContact_number() {
        return contact_number;
    }

    public void setContact_number(String contact_number) {
        this.contact_number = contact_number;
    }

    public String getRegistration_date() {
        return registration_date;
    }

    public void setRegistration_date(String registration_date) {
        this.registration_date = registration_date;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String extra_col1) {
        this.image = image;
    }

    public String getExtra_col2() {
        return extra_col2;
    }

    public void setExtra_col2(String extra_col2) {
        this.extra_col2 = extra_col2;
    }

    @Override
    public String toString() {
        return "Applicant_account{" +
                "applicant_id=" + applicant_id +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", gender='" + gender + '\'' +
                ", contact_number=" + contact_number +
                ", registration_date='" + registration_date + '\'' +
                ", image='" + image + '\'' +
                ", extra_col2='" + extra_col2 + '\'' +
                '}';
    }
}
