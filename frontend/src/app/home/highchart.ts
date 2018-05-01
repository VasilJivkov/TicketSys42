import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

// Generate the chart
Highcharts.chart('container', {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'Comapnies in our ticketsystem'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        style: {
          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
        }
      }
    }
  },
  series: [{
    name: 'Comapnies',
    colorByPoint: true,
    data: [{
      name: 'Honeybee',
      y: 61.41,
      sliced: true,
      selected: true
    }, {
      name: 'Tick42',
      y: 11.84
    }, {
      name: 'Leanplum',
      y: 10.85
    },
    ]
  }]
});
