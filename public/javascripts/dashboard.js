$(document).ready(function(){

	/**
	 * Highchart for displaying devices used
	 */

	$.getJSON('/api/device/getAllDevices', function (data) {

		var series = [];
		
		for (var i=0 ; i< data.length; i++) {
			var x =new Date(data[i].device_util_startTime);
			var y =new Date(data[i].device_util_endTime);
			if(i==0){
				series.push({"name" : data[i].device_name, "y" : data[i].device_energy_consumption,
					sliced: true, selected: true});
			}else{
				series.push({"name" : data[i].device_name, "y" : data[i].device_energy_consumption});
			}
		}

		Highcharts.chart('highchart1', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: hc_title1
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
			},
			series: [{
				name: hc_subtitle1,
				colorByPoint: true,
				data: series
			}]
		});
		
		/**
		 * Highcharts for displaying something needs to be decided
		 */
		Highcharts.chart('highchart2', {
			title: {
				text: 'Combination chart'
			},
			xAxis: {
				categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
			},
			labels: {
				items: [{
					html: 'Total fruit consumption',
					style: {
						left: '50px',
						top: '18px',
						color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
					}
				}]
			},
			series: [{
				type: 'column',
				name: 'Jane',
				data: [3, 2, 1, 3, 4]
			}, {
				type: 'column',
				name: 'John',
				data: [2, 3, 5, 7, 6]
			}, {
				type: 'column',
				name: 'Joe',
				data: [4, 3, 3, 9, 0]
			}, {
				type: 'spline',
				name: 'Average',
				data: [3, 2.67, 3, 6.33, 3.33],
				marker: {
					lineWidth: 2,
					lineColor: Highcharts.getOptions().colors[3],
					fillColor: 'white'
				}
			}
			]
		});

	});

	/**
	 * Highchart for displaying timeline view of energy consumption
	 */
	$.getJSON('/api/device/getAllDevicesEnergy', function (data) {
		
		var series = [];
		
		$("#currentDate" ).text(moment().format('L'));
		$("#energyConsumed" ).text(data[data.length-1].energy_consumed);
		$("#timeUsed" ).text(data[data.length-1].time_usage);
		$("#devicesUsed" ).text(data[data.length-1].devices_used);
		
		for (var i=0 ; i< data.length; i++) {
			var startDateTime = new Date(data[i].energy_date);
			var date = moment(startDateTime, "MM/DD/YYYY HH:mm").unix()*1000;
			series.push([date,data[i].energy_consumed]);
		}
		
		var chart = Highcharts.stockChart('highchart3', {

			chart: {
				height: 400
			},

			title: {
				text: hc_title3
			},

			rangeSelector: {
				selected: 1
			},

			series: [{
				name: hc_subtitle3,
				data: series,
				type: 'area',
				threshold: null,
				tooltip: {
					valueDecimals: 2
				}
			}],

			responsive: {
				rules: [{
					condition: {
						maxWidth: 500
					},
					chartOptions: {
						chart: {
							height: 300
						},
						subtitle: {
							text: null
						},
						navigator: {
							enabled: false
						}
					}
				}]
			}
		});
		
		
	});

});