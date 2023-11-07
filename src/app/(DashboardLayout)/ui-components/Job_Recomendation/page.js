
'use client'
import React, { useState } from 'react';
import JobRecomendation from '@/app/(DashboardLayout)/components/dashboard/JobRecomendation';
import SkillBasedJob from '@/app/(DashboardLayout)/components/dashboard/SkillBasedJob';

const Page = () => {

    return (
        <div>
            <JobRecomendation/>
            <SkillBasedJob/>
        </div>
    );
};

export default Page;
