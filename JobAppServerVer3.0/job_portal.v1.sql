create database job_portal_db;

use job_portal_db;


create table applicant_account
(

    applicant_id int auto_increment,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    password varchar(255),
    gender char(1),
    contact_number varchar(255),
    registration_date date,
    profileImg varchar(255) default 'byDefault.png',
    extra_col2 varchar(255),
    primary key (applicant_id)    

);




create table educational_details
(

    applicant_id int,
    degree_name varchar(255),
    university_name varchar(255),
    start_date date,
    completion_date date,
    percentage double,
    primary key(applicant_id),
    skill_set varchar(255),
    extra_col1 varchar(255),
    extra_col2 varchar(255),
    foreign key (applicant_id) references applicant_account(applicant_id) ON DELETE CASCADE

);



create table recruiter_account
(

    recruiter_id int auto_increment,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    password varchar(255),
    contact_number varchar(255),
    company_name varchar(255) unique,
    registration_date date,
    extra_col1 varchar(255),
    extra_col2 varchar(255),
    primary key (recruiter_id)
);


create table job_post 
(

    job_id int auto_increment,
    posted_by_id int,
    company_name varchar(255),
    job_type varchar(255),
    created_date date,
    job_description varchar(255),
    is_active boolean,
    skill_set_required varchar(255),
    position int, 
    job_location varchar(255),
    extra_col1 varchar(255),
    extra_col2 varchar(255),
    primary key (job_id,posted_by_id,job_type),
    foreign key (posted_by_id) references recruiter_account (recruiter_id) ON DELETE CASCADE,
    foreign key (company_name) references recruiter_account (company_name) ON DELETE CASCADE  

);



create table job_applied
(
    job_applied_id int auto_increment,
    applicant_id int,
    posted_by_id int,
    job_id int,
    selected boolean default 0,
    extra_col1 varchar(255),
    extra_col2 varchar(255),
    primary key (job_applied_id),
    foreign key (applicant_id) references applicant_account (applicant_id) ON DELETE CASCADE,
    foreign key (posted_by_id) references recruiter_account (recruiter_id) ON DELETE CASCADE,
    foreign key (job_id) references job_post(job_id) ON DELETE CASCADE

);








insert into applicant_account (first_name,last_name,email,password,gender,contact_number,registration_date,extra_col2)values("Abhishek","Thakare","abhi@gmail.com","pass1","M","77488",NOW(),NULL);

insert into applicant_account(first_name,last_name,email,password,gender,contact_number,registration_date,extra_col2) values("Hemant","Gatade","hemant@gmail.com","pass2","M","9748",NOW(),NULL);

insert into applicant_account (first_name,last_name,email,password,gender,contact_number,registration_date,extra_col2)values("Aniket","Fulzele","ani@gmail.com","pass3","M","9977",NOW(),NULL);

insert into applicant_account(first_name,last_name,email,password,gender,contact_number,registration_date,extra_col2) values("Vishal","Bhole","vishal@gmail.com","pass4","M","77388",NOW(),NULL);

insert into applicant_account(first_name,last_name,email,password,gender,contact_number,registration_date,extra_col2) values("Shruti","Kale","shruti@gmail.com","pass5","F","79488",NOW(),NULL);

insert into applicant_account (first_name,last_name,email,password,gender,contact_number,registration_date,extra_col2)values("Priyanka","Pasalkar","priy@gmail.com","pass6","F","71488",NOW(),NULL);

insert into applicant_account(first_name,last_name,email,password,gender,contact_number,registration_date,extra_col2) values("Pawan","Ubhe","pawan@gmail.com","pass7","M","72488",NOW(),NULL);

insert into applicant_account(first_name,last_name,email,password,gender,contact_number,registration_date,extra_col2) values("Aharta","Dhude","aharta@gmail.com","pass8","M","77788",NOW(),NULL);

insert into applicant_account (first_name,last_name,email,password,gender,contact_number,registration_date,extra_col2)values("Prasad","Dugade","prasad@gmail.com","pass9","M","77888",NOW(),NULL);

insert into applicant_account(first_name,last_name,email,password,gender,contact_number,registration_date,extra_col2) values("Surekha","Thambe","surekha@gmail.com","pass10","F","77688",NOW(),NULL);









insert into educational_details values(1,"BE","Pune","2013-02-01","2020-05-18",70.21,"Java",NULL,NULL);

insert into educational_details values(2,"BE","Pune","2013-02-01","2020-05-18",71.11,"C++",NULL,NULL);

insert into educational_details values(3,"MSC","Pune","2013-02-01","2020-05-18",72.21,"C",NULL,NULL);

insert into educational_details values(4,"BE","Pune","2013-02-01","2020-05-18",73.31,"Swift",NULL,NULL);

insert into educational_details values(5,"BE","Pune","2013-02-01","2020-05-18",74.41,"JavaScript",NULL,NULL);

insert into educational_details values(6,"BE","Pune","2013-02-01","2020-05-18",75.51,"Java",NULL,NULL);

insert into educational_details values(7,"BE","Pune","2013-02-01","2020-05-18",76.61,"C++",NULL,NULL);

insert into educational_details values(8,"BE","Pune","2013-02-01","2020-05-18",77.71,"C",NULL,NULL);

insert into educational_details values(9,"BE","Pune","2013-02-01","2020-05-18",78.81,"Swift",NULL,NULL);

insert into educational_details values(10,"BE","Pune","2013-02-01","2020-05-18",79.91,"Javascript",NULL,NULL);






insert into recruiter_account values(1,"rect1","rect1","email","pass",1234,"company",NOW(),NULL,NULL);

insert into recruiter_account values(2,"rect2fname","rect2lname","rect2email","pass1",1234,"company1",NOW(),NULL,NULL);

insert into recruiter_account values(3,"rect3fname","rect3lname","rect3email","pass2",12345,"company2",NOW(),NULL,NULL);

insert into recruiter_account values(4,"rect4fname","rect4lname","rect4email","pass3",123456,"company3",NOW(),NULL,NULL);

insert into recruiter_account values(5,"rect5fname","rect5lname","rect5email","pass5",1234567,"company4",NOW(),NULL,NULL);

insert into recruiter_account values(6,"rect6fname","rect6lname","rect6email","pass6",1234,"company6",NOW(),NULL,NULL);

insert into recruiter_account values(7,"rect7fname","rect7lname","rect7email","pass7",12347654,"company7",NOW(),NULL,NULL);

insert into recruiter_account values(8,"rect8fname","rect8lname","rect8email","pass8",1234765,"company8",NOW(),NULL,NULL);

insert into recruiter_account values(9,"rect9fname","rect9lname","rect9email","pass9",123454,"company9",NOW(),NULL,NULL);

insert into recruiter_account values(10,"rect10fname","rect10lname","rect10email","pass10",143234,"company10",NOW(),NULL,NULL);










insert into job_post values(1,1,"company","job_type",NOW(),"description",0,"java",10,"pune",NULL,NULL);


insert into job_post values(2,2,"company1","ful-time",NOW(),"manager",0,"c++",5,"banglore",NULL,NULL);

insert into job_post values(3,3,"company2","ful-time",NOW(),"manager",0,"c++",5,"banglore",NULL,NULL);

insert into job_post values(4,4,"company3","part-time",NOW(),"developer",0,"c++",7,"indore",NULL,NULL);

insert into job_post values(5,5,"company4","ful-time",NOW(),"executive",0,"c++",5,"banglore",NULL,NULL);

insert into job_post values(6,6,"company5","ful-time",NOW(),"tester",0,"java",9,"delhi",NULL,NULL);

insert into job_post values(7,7,"company6","part-time",NOW(),"executive",0,"c++",8,"banglore",NULL,NULL);

insert into job_post values(8,8,"company7","ful-time",NOW(),"manager",0,"python",5,"delhi",NULL,NULL);

insert into job_post values(9,9,"company8","part-time",NOW(),"tester",0,"c++",3,"banglore",NULL,NULL);

insert into job_post values(10,10,"company9","ful-time",NOW(),"executive",0,"c++",5,"pune",NULL,NULL);




insert into job_applied values(1,1,1,1,1,NULL,Null);

insert into job_applied values(2,1,2,2,0,NULL,Null);

insert into job_applied values(3,1,3,3,0,NULL,Null);

insert into job_applied values(4,1,4,4,0,NULL,Null);

insert into job_applied values(5,1,5,5,1,NULL,Null);

insert into job_applied values(6,1,6,6,1,NULL,Null);

insert into job_applied values(7,1,7,7,0,NULL,Null);

insert into job_applied values(8,1,8,8,1,NULL,Null);

insert into job_applied values(9,1,9,9,0,NULL,Null);

insert into job_applied values(10,1,10,10,1,NULL,Null);















