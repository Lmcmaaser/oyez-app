import React from 'react';
import ApiContext from '../ApiContext'
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';

let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
let dataPoints =  [];
let pick = require('object.pick'); // Returns a filtered copy of an object with only the specified keys
// function takes two arguments where the first one will object (which we are filtering) and second will be a collection of key names which we want to extract from a given object.

//create new array (displayArr?) and use it like dataPoints
// sum all reports for each stateid
// translate each state id into state name
export default class ShowAll extends React.Component {
  static contextType = ApiContext;
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     stateNameArr: []
  //   }
  // }

  barGraphArr() {
    let selectedValues = this.context.reports.map(function (report) {
      return report.stateid
    })
    console.log(selectedValues);
    // this.context.reports.map
    // let selectedValues = [...this.state.stateNameArr];
    // selectedValues = pick(us_states, ['name']);
    // console.log(selectedValues)

    // return us_states.filter((us_state) => {
    //   if (this.state.stateNameArr.length === 0)
    // })
    // for (let i = 0; i < this.context.us_states.length; i++) {
    //   //iterate over us_states array
    //   console.log(i);
    // }
  }
  //// Object.keys(arr).length;
  // idToName() {
  //   //pass in us_states array,
  //   pull out all
  // }


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
            name: this.context.us_states.find(state => state.stateid === report.stateid),
            count: 1
          });
        } else {
        existingValue.count++;
      }
    });

    for (let i = 0; i < selectedValues.length; i++) {
      dataPoints.push({
        label: selectedValues[i].name,
        y: 3
      });
    }
    const options = {
      title: {
        text: "All reported instances by state"
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
          <div>Section Displays graph</div>
          <CanvasJSChart options = {options}
				      onRef={ref => this.chart = ref}
			    />
        </div>
      </div>
    )
  }
}
