import React from 'react';
import ApiContext from '../ApiContext'
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';

let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
let dataPoints =  [];
export default class ShowAll extends React.Component {
  static contextType = ApiContext;

  //maybe?
  static defaultProps = {
    match: {
      params: {}
    }
  }

  // componentDidMount(){
	// 	let chart = this.chart;
  //     let [ reports ] = this.context;
	// 		for (let i = 0; i < reports.length; i++) {
	// 			dataPoints.push({
	// 				label: reports[i].stateid,
	// 				y: 3
	// 			});
	// 		}
	// 		chart.render();
	// }
  render() {
    // let [ reports ] = this.context; //local copy of reports array

    //create new array (displayArr?) and use it like dataPoints
    // sum all reports for each stateid
    // translate each state id into state name
  			for (let i = 0; i < this.context.reports.length; i++) {
  				dataPoints.push({
  					label: this.context.reports[i].stateid,
  					y: 3
  				});
  			}
    const options = {
			title: {
				text: "All reported instances by state"
			},
      data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: dataPoints
			}
			]
		}
    return (
      <div>
        <h3>
          All Reported Instances
        </h3>
        <div className='results_group'>
          <div>Section Displays graph</div>
          <CanvasJSChart options = {options}
				      onRef={ref => this.chart = ref}
			    />
        </div>
      </div>
    )
  }
}
