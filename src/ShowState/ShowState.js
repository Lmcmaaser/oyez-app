import React from 'react';
import ApiContext from '../ApiContext'
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default class ShowState extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props)
    this.state = {
      stateid: {
        value: '',
        touched: false
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const us_state = {
      stateid: event.target.stateid.value,
    }
    console.log(us_state);
    this.setState(us_state);
  }

  getFilteredReports = (reports) => {
    return reports.filter((report) => {
        if ((!this.state.stateid || this.state.stateid === report.stateid)) {
          return true;
        } else {
          return false;
        }
    });
  }

  render() {
    //date & number of reports
  let dataPoints =  [];
  let selectedValues = [];
  let existingValues = this.context.reports;
  let filteredReports = this.getFilteredReports(existingValues);
  console.log(filteredReports);
  let count = 0;

  for (let i = 0; i < filteredReports.length; i++) {
    count++
  }
  console.log(count);

  for (let i = 0; i < filteredReports.length; i++) {
    selectedValues.push({
      label: filteredReports[i].date
    })
  } // [{label: "2020-06-24"}]
  console.log(selectedValues);

  for (let i = 0; i < selectedValues.length; i++) {
    let labelValues = Object.values(selectedValues[i]);
  }
  let labelValues = Object.values(selectedValues);
  console.log(labelValues);




    const options = {
			theme: "light2",
			title: {
				text: "Reports Over Time"
          //{ message: `Reports Over Time for the state of '${us_state.stateid}'`}
			},
			axisY: {
				title: "Number of Reports",
				includeZero: true
			},
			data: [{
				type: "line",
				xValueFormatString: "0000-00-00",
				y: " ",
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
