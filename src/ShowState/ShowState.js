import React from 'react';
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

let dataPoints =[];
export default class ShowState extends React.Component {
  render() {
    const options = {
			theme: "light2",
			title: {
				text: "State Reports Over Time"
			},
			axisY: {
				title: "Price in USD",
				prefix: "$",
				includeZero: false
			},
			data: [{
				type: "line",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.00",
				dataPoints: dataPoints
			}]
		}
    return (
      <div>
        <h3>
          All Reported Instances
        </h3>
        <div className='results_group'>
          <div>Section Displays graph</div>
          <div className="canvas">
            <CanvasJSChart options = {options}
				      onRef={ref => this.chart = ref}
			      />
          </div>
        </div>
      </div>
    )
  }
}
