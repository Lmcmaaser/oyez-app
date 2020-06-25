import React from 'react';
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default class ShowState extends React.Component {
  render() {
    const options = {
			title: {
				text: ""
			},
    }
    return (
      <div>
        <h3>
          All Reported Instances
        </h3>
        <div class='results_group'>
          <div>Section Displays graph</div>
          <div class="canvas">Will use CanvasJS React Component (https://canvasjs.com/) to generate charts</div>
        </div>
      </div>
    )
  }
}
