import React from 'react';
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class ShowZipCode extends React.Component {
  render() {
    const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Diagnosis Types"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: 18, label: "Direct" },
					{ y: 49, label: "Organic Search" },
					{ y: 9, label: "Paid Search" },
					{ y: 5, label: "Referral" },
					{ y: 19, label: "Social" }
				]
			}]
		}
    return (
      <div>
        <h3>
          All Reported Instances
        </h3>
        <div class='results_group'>
          <div>Section Displays graph</div>
          <div class="canvas">
            <CanvasJSChart options = {options}
              onRef={ref => this.chart = ref}
            />
          </div>
        </div>
      </div>
    )
  }
}
