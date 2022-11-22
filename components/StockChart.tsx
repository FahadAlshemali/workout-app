import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

import React from 'react';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);


const buildData = ({ chartData }: any) => ({
    labels: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
    ],
    datasets: [
        {
            label: '',
            data: chartData.data,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderColor: 'rgba(255, 255, 255, 1)',
            pointBackgroundColor: 'rgba(255, 255, 255, 1)',
            fill: 'start',
            tension: 0,
        },
    ],
});

const options = {
    plugins: {
        legend: {
            display: false,
        }
    },
    scales: {
        yAxes: {
            ticks: {
                color: 'rgba(255, 255, 255, 1)'
            },
            grid: {
                display: false,
                drawBorder: false,
            },
        },

        xAxes: {
            ticks: {
                color: 'rgba(255, 255, 255, 1)'
            },
            grid: {
                circular: true,
                borderColor: 'rgba(255, 255, 255, .2)',
                color: 'rgba(255, 255, 255, .2)',
                borderDash: [5, 5]
            },
        },
    },
    layout: {
        padding: {
            right: 10,
        },
    },
};


const StockChart = ({ info }: any) => {
    let weights = [];
    for (let i = 0; i < info?.length; i++) {
        weights.push(info[i].weight)
    }
    let dataa = { chartData:{ data: [...weights] }}
   
    const data = buildData(dataa);

    return (
        <>
            <div className="md:w-1/2  flex flex-col overflow-hidden">
                <div className="rounded-lg  px-5 pb-4 pt-8 mx-5 my-7 bg-indigo-600 text-white ">
                    <Line data={data} options={options} />
                </div>
            </div>
        </>
    );
};

export default StockChart;