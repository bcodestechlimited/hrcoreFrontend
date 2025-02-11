import { useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";

const DonutChart = ({ labels, data }) => {
	const [series, setSeries] = useState(
		data?.map(item => Number(item)) || [17, 70]
	);

	const [options, setOptions] = useState({
		labels: labels || ["In progress", "In progress", "In progress"],
		dataLabels: {
			enabled: false,
		},
		chart: {
			type: "donut",
			id: "apexchart-example",
		},
		pie: {
			customScale: 1,
			dataLabels: {
				offset: 0,
				minAngleToShowLabel: 10,
			},
			donut: {
				size: "100%",
				background: "transparent",
				labels: {
					show: false,
					name: {
						show: true,
						fontSize: "12px",
						fontFamily: "Helvetica, Arial, sans-serif",
						fontWeight: 600,
						// color: undefined,
						offsetY: -10,
						formatter: function (val) {
							val = "Total students";
							return val;
						},
					},
					value: {
						show: true,
						fontSize: "12px",
						fontFamily: "Helvetica, Arial, sans-serif",
						fontWeight: 400,
						color: undefined,
						offsetY: 16,
						formatter: function (val) {
							val = 10;
							return val;
						},
					},
					total: {
						show: false,
						showAlways: false,
						label: "Total",
						fontSize: "12px",
						fontFamily: "Helvetica, Arial, sans-serif",
						fontWeight: 600,
						color: "#373d3f",
						formatter: function (w) {
							return w.globals.seriesTotals.reduce((a, b) => {
								return a + b;
							}, 0);
						},
					},
				},
			},
		},
		legend: {
			show: true,
			position: "top",
		},
	});

	useEffect(() => {
		if (data) setSeries(data?.map(item => Number(item)));
		if (labels) setOptions({ ...options, labels });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, labels]);

	return (
		<Chart
			options={options}
			series={series}
			type="donut"
			width="100%"
			height={350}
			className="mx-auto"
		/>
	);
};

export default DonutChart;
