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

  duplicateDates = (arr) => {
    const dups = {}
    arr.forEach(date => {
      if(Object.keys(dups).includes(date.label)) {
        dups[date.label]++
      } else {
        dups[date.label] = 1
      }
    })
    return dups
  }

  render() {
  //date & number of reports
    let dataPoints =  [];
    let selectedValues = [];
    let existingValues = this.context.reports;
    let filteredReports = this.getFilteredReports(existingValues);

    for (let i = 0; i < filteredReports.length; i++) {
      selectedValues.push({
        label: filteredReports[i].date
      })
    } // [{label: "2020-06-24"}...etc] contains duplicate values
    console.log(selectedValues);

    //remove duplicate date labels
    let jsonObject = selectedValues.map(JSON.stringify);
    let uniqueSet = new Set(jsonObject);
    let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    console.log(uniqueArray); //[{label: "2020-06-24"}, {label: "2020-06-20"}, {label: "2020-06-15"}]

    let dateOccurences = this.duplicateDates(selectedValues);
    console.log(dateOccurences); // {2020-06-15: 1, 2020-06-20: 2, 2020-06-24: 1}
    let dateCount = Object.values(dateOccurences);
    let yObj = [];
    for (let i = 0; i < dateCount.length; i++) {
      yObj.push({
        y: dateCount[i]
      });
    }
    console.log(yObj); //[{y:1}, {y: ...etc.]

    //merges label objects and y objects
    dataPoints = uniqueArray.map((label, i) => {
      return {
        ...label,
        ...yObj[i]
      }
    })
    console.log(dataPoints); // returns [{label: "2020-06-24", y: 1, x: 0}, {label: "2020-06-20", y: 2, x: 1}, {label: "2020-06-15", y: 1, x: 2}] which seems to work. 

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
				y: "",
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
