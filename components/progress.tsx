import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import React from 'react'
import StockChart from './StockChart';

const Progress = (userProgressChart: any) => {
    
    // let weights = [];
    // for (let i = 0; i < userProgressChart?.userProgressChart?.users?.length; i++){
    //     weights.push("sdsds")
    // }
    return (
        <div className="min-w-screen min-h-screen ">
            <div  className="flex flex-wrap  min-w-screen min-h-screen" >
                {userProgressChart?.userProgressChart?.map((chart: any) => (
                        <StockChart info={chart.users} key={userProgressChart.id} />
                ))}
            </div>
        </div>
    )
}

export default Progress;

export const getServerSideProps = withPageAuth({
    redirectTo: '/login',
});