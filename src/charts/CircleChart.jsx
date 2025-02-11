'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CircleChart = () => {
    const data = {
        labels: ['Paid', 'Unpaid', 'Complete'],
        datasets: [
            {
                label: 'Payment Status',
                data: [300, 50, 100],
                backgroundColor: ['#2b004d', 'red', '#4db461'],
                hoverBackgroundColor: ['#2b004d', 'red', '#4db461'],
            },
        ],
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Doughnut data={data} options={{ maintainAspectRatio: false }} />
        </div>
    );
};

export default CircleChart;
