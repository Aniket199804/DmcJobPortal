package com.sunbeam.Job_portal.Adapters;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.viewpager2.adapter.FragmentStateAdapter;

import com.sunbeam.Job_portal.fragments.AppliedJobListFragment;
import com.sunbeam.Job_portal.fragments.JobListFragment;
import com.sunbeam.Job_portal.fragments.ProfileFragment;

public class JobFragmentAdapter extends FragmentStateAdapter {
    public JobFragmentAdapter(@NonNull FragmentActivity fragmentActivity) {
        super(fragmentActivity);
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {
        switch (position)
        {

            case 0:
                return new JobListFragment();
            case 1:
                return new AppliedJobListFragment();
            case 2:
                return new ProfileFragment();



        }
        return null;
    }

    @Override
    public int getItemCount() {
        return 3;
    }
}
