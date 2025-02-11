import { useEffect } from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const DistributedChart = ({ item, labels, data }) => {
	const [series, setSeries] = useState([
		{
			name: "Total",
			data: data || [12, 13, 14, 15],
		},
	]);

	const [options, setOptions] = useState({
		chart: {
			height: 150,
			type: "bar",
		},
		plotOptions: {
			bar: {
				borderRadius: 10,
				dataLabels: {
					position: "top", // top, center, bottom
				},
				height: 150,
			},
		},
		dataLabels: {
			enabled: true,
			formatter: function (val) {
				return val;
			},
			offsetY: -20,
			style: {
				fontSize: "12px",
				colors: ["#304758"],
			},
		},

		xaxis: {
			categories: labels || ["Sales", "Tutors", "Courses", "Students"],
			position: "bottom",
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			crosshairs: {
				fill: {
					type: "gradient",
					gradient: {
						colorFrom: "#D8E3F0",
						colorTo: "#BED1E6",
						stops: [0, 100],
						opacityFrom: 0.4,
						opacityTo: 0.5,
					},
				},
			},
			tooltip: {
				enabled: true,
			},
		},
		yaxis: {
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			labels: {
				show: false,
				formatter: function (val) {
					return val;
				},
			},
		},
		title: {
			text: "STAFF POSITION",
			floating: true,
			offsetY: 0,
			align: "left",
			style: {
				color: "#444",
			},
		},
	});

	useEffect(() => {
		if (data) setSeries([{ ...series, data }]);
		if (labels) setOptions({ ...options, labels });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, labels]);

	return (
		<ReactApexChart options={options} series={series} type="bar" height={350} />
	);
};

export default DistributedChart;
