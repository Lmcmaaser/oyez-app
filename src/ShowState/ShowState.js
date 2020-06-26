import React from 'react';
import ApiContext from '../ApiContext'
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default class ShowState extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      selectedState: []
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    const us_state = {
      stateid: event.target.stateid.value,
    }
    console.log(us_state); // returns {stateid: "44"}
    this.getPassedState(us_state);
  }

  getPassedState() {
    //pass in an object & iterate over us_states array of objects
    console.log(this.context.us_states); //shows all states
    for (let i = 0; i < this.context.us_states.length; i++) {
      //find obj's match in us_states
      if (us_state => us_state.stateid === this.context.us_states[i]) {
        return this.state.selectedState.push(this.context.us_states[i])
      }
    }
    console.log(this.state.selectedState);//should be an array with the user selected state, is not getting called
  }

  render() {
    // let passedState = this.getPassedState(us_state)
    // console.log(passedState);
    let dataPoints =  [];
    let selectedValues = [];
    this.context.reports.forEach(report => {
      let existingValue = selectedValues.find(value => value.stateid === report.stateid);
        if (existingValue === undefined) {
          selectedValues.push({
            stateid: report.stateid,
            date: this.context.us_states.find(us_state => us_state.stateid === report.stateid).date,
            count: 1
          });
        } else {
        existingValue.count++;
      }
    });
    console.log(selectedValues); // selectedValues = [{stateid: "44", date: undefined, count: 3}, {stateid: "3", date: undefined, count: 1}]

    for (let i = 0; i < selectedValues.length; i++) {
      dataPoints.push({
        label: selectedValues[i].date,
        y: selectedValues[i].count
      });
    }

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
                //onClick={event =>
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
