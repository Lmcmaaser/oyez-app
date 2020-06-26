import React from 'react';
import ApiContext from '../ApiContext'
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default class ShowState extends React.Component {
  static contextType = ApiContext;

  handleSubmit(event) {
    event.preventDefault();
    const us_state = {
      stateid: event.target.stateid.value,
    }
    console.log(us_state);
  }

  render() {
    let dataPoints =[];
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
        <form className="form-group" onSubmit={event => this.handleSubmit(event)}>
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
              <button
                type="submit"
                className="submit-button"
                aria-label="submit-button"
              >
                Submit
              </button>
          </fieldset>
        </form>
        <div className='results_group'>
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
