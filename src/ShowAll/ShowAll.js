import React from 'react';
import ApiContext from '../ApiContext'
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';

let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
let dataPoints =  [];

//create new array (displayArr?) and use it like dataPoints
// sum all reports for each stateid
// translate each state id into state name
export default class ShowAll extends React.Component {
  static contextType = ApiContext;
  //create an array of objects with state name as key and report number as value.
  render() {
    console.log(this.context.us_states); //shows
    console.log(this.context.reports); //shows

    let selectedValues = [];
    this.context.reports.forEach(report => {
      let existingValue = selectedValues.find(value => value.stateid === report.stateid);
        if (existingValue === undefined) {
          selectedValues.push({
            stateid: report.stateid,
            name: this.context.us_states.find(us_state => us_state.stateid === report.stateid).name,
            count: 1
          });
        } else {
        existingValue.count++;
      }
    });
    console.log(selectedValues);

    for (let i = 0; i < selectedValues.length; i++) {
      dataPoints.push({
        label: selectedValues[i].name,
        y: selectedValues[i].count
      });
    }
    const options = {
      title: {
        text: "Self-reported Instances of COVID-19 by State"
      },
      data: [
        {

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
          <CanvasJSChart options = {options}
				      onRef={ref => this.chart = ref}
			    />
        </div>
      </div>
    )
  }
}
