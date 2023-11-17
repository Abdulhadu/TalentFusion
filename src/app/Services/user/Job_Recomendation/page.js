
'use client'
import React, { useState } from 'react';
import JobRecomendation from '@/app/Services/components/dashboard/JobRecomendation';
import SkillBasedJob from '@/app/Services/components/dashboard/SkillBasedJob';

const Page = () => {

    return (
        <div>
            <JobRecomendation/>
            <SkillBasedJob/>
        </div>
    );
};

export default Page;
