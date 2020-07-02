import React from 'react';
import ApiContext from '../ApiContext';
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
//import './ShowZipCode.css';

//user selects a zipcode, graph displays the diagnosis_type and date for all reports with that zipcode
export default class ShowZipCode extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props)
    this.state = {
      zipcodeid: {
        value: '',
        touched: false
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const zip = {
      zipcodeid: event.target.zipcodeid.value,
    }
    console.log(zip); //shows: zipcodeid: "8e748f78-b9ae-11ea-b3de-0242ac130004"}
    this.setState(zip);
  }

  getFilteredReports = (reports) => {
    return reports.filter((report) => {
        if ((!this.state.zipcodeid || this.state.zipcodeid === report.zipcodeid)) {
          return true;
        } else {
          return false;
        }
    });
  }

  render() {
    let dataPoints =  [];
    let existingValues = this.context.reports;
    let selfCount = 0;
    let testCount = 0;
    let doctorCount = 0;
    let filteredReports = this.getFilteredReports(existingValues)
    let labelTest = {label: "test"};
    let labelDoc = {label: "doctor"};
    let labelSelf = {label: "self"};
    let testPoints = {};
    let doctorPoints = {};
    let selfPoints = {};
    let count = 0;

    //count how many reports total for zip code
    for (let i = 0; i < filteredReports.length; i++) {
      count++
    }
    console.log(count);

    // count how many reports for each diagnosis type
    for (let i = 0; i < filteredReports.length; i++) {
      if (filteredReports[i].diagnosis_type === 'test') {
        testCount++
      } else if (filteredReports[i].diagnosis_type === 'doctor') {
        doctorCount++
      } else if (filteredReports[i].diagnosis_type === 'self') {
        selfCount++
      }
    }

    // translate diagnosis_type counts to percentages
    let testNumber = {y: (testCount/count*100).toFixed(2)};
    let selfNumber = {y: (selfCount/count*100).toFixed(2)};
    let doctorNumber = {y: (doctorCount/count*100).toFixed(2)};

    //combine x and y axis into 1 object {label: '', y: ''}
    testPoints = Object.assign(labelTest, testNumber);
    doctorPoints = Object.assign(labelDoc, doctorNumber);
    selfPoints = Object.assign(labelSelf, selfNumber);

    // add desired objects to dataPoints array
    dataPoints.push(testPoints, doctorPoints, selfPoints);
    console.log(dataPoints);


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
				dataPoints: dataPoints
			}]
		}
    return (
      <div>
      <form className="form-group" onSubmit={event => this.handleSubmit(event)}>
        <fieldset>
          <legend>Report Form</legend>
          <label className="zip" htmlFor="zip">Select a Zip Code*</label>
          <select
            name="zipcodeid"
            required
            aria-label="select zip code"
          >
            {this.context.zipcodes.map(zipcode =>
              <option key={zipcode.zipcodeid} value={zipcode.zipcodeid}>{zipcode.code}</option>
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
      <h3>
        All Reported Instances
      </h3>
        <div className="results_group">
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
