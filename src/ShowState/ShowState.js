import React from 'react';
import ApiContext from '../ApiContext'
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

let dataPoints =[];
export default class ShowState extends React.Component {
  static contextType = ApiContext;
  render() {
    const options = {
			theme: "light2",
			title: {
				text: "State Reports Over Time"
			},
			axisY: {
				title: "Number of Reports",
				// prefix: "$",
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
        <form>
          <fieldset>
            <legend>Select state</legend>
              <label className="reportState" htmlFor="reportState">Select a State*</label>
              <select
                name="stateid"
                required
                aria-label="select state"
              >
                {this.context.us_states.map(us_state =>
                  <option key={us_state.stateid} value={us_state.stateid}>{us_state.name}</option>
                )}
              </select>
          </fieldset>
        </form>
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
