package com.sunbeam.Job_portal.utils;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetroClient
{
    private static RetroClient retroClient = null;
    private API api;


    private RetroClient ()
    {
        api = new Retrofit.Builder().addConverterFactory(GsonConverterFactory.create()).baseUrl(api.BASE_URL).build().create(API.class);


    }

    public static RetroClient getInstance()
    {
        if(retroClient == null)
        {
            retroClient = new RetroClient();

        }
        return  retroClient;
    }

    public  API getApi()
    {
        return api;
    }
}
