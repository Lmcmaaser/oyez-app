import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError';
import './Report.css';

//To Do: add a success message
export default class Report extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props)
    this.state = {
      code: {
        value: '',
        touched: false
      },
      date: {
        value: '',
        touched: false
      },
      diagnosis_type: {
        value: '',
        touched: false
      },
      household: {
        value: '',
        touched: false
      }
    }
  }

  updateZipCode(code) {
    console.log(code);
    this.setState({code: {value: code, touched: true}});
  }
  updateDate(date) {
    console.log(date);
    this.setState({date: {value: date, touched: true}});
  }
  updateDiagnosisType(diagnosis_type) {
    console.log(diagnosis_type);
    this.setState({diagnosis_type: {value: diagnosis_type, touched: true}});
  }
  updateHousehold(household) {
    this.setState({household: {value: household, touched: true}});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { diagnosis_type, date, household} = this.state;
    const { code } = this.state;
    const uuid = uuidv4();
    const zipcode = {
      zipcodeid: uuid,
      code: code.value
    }
    const report = {
      reportid: uuid,
      stateid: event.target.stateid.value,
      diagnosis_type: diagnosis_type.value,
      date: date.value,
      household: household.value
    }
    console.log(report);
    console.log(zipcode);
    this.context.addReport(report);
    this.context.addZipCode(zipcode);
    this.resetForm();
  }

  resetForm() {
    this.setState({
      code: {
        value: '',
        touched: false
      },
      date: {
        value: '',
        touched: false
      },
      diagnosis_type: {
        value: '',
        touched: false
      },
      household: {
        value: '',
        touched: false
      }
    })
    document.querySelector('input[name="diagnosis_type"]:checked').checked = false;
  }

  validateZipCode() {
    const zip_code = this.state.code.value.trim();
    if (zip_code.length > 5) {
      return "Zip code can only be 5 digits long"
    } else if (!zip_code.match(/[0-9]/)) {
      return "Zip code may only contain numbers"
    }
  }

  validateHousehold() {
    const household = this.state.household.value.trim();
    if (!household.match(/[0-9]/)) {
      return "Your response may only contain a numbers"
    }
  }

  render() {
    const zipCodeError = this.validateZipCode();
    const householdError = this.validateHousehold();
    return (
      <div>
        <h3>Submit a Report</h3>
        <form className="form-group" onSubmit={event => this.handleSubmit(event)}>
          <fieldset>
            <legend>Report Form</legend>
              <label className="reportState" htmlFor="reportState">What state do you live in? *</label>
              <select
                name="stateid"
                required
                aria-label="select state"
              >
                {this.context.us_states.map(us_state =>
                  <option key={us_state.stateid} value={us_state.stateid}>{us_state.name}</option>
                )}
              </select>
              <label>What is your zip code?</label>
                <input
                  type="text"
                  required
                  name="code"
                  id="code"
                  aria-label="input zip code"
                  value={this.state.code.value}
                  onChange={event => this.updateZipCode(event.target.value)}
                />
                  {this.state.code.touched && (
                    <ValidationError message={zipCodeError} />
                  )}
              <label className="raido_label" htmlFor="diagnosis_type">
                How were you diagnosed?
              </label>
                <label htmlFor="container">
                  <input
                    type="radio"
                    id="test"
                    name="diagnosis_type"
                    value="test"
                    aria-label="select test diagnosis type"
                    onChange={event => this.updateDiagnosisType(event.target.value)}
                  />
                  <span className="checkmark"></span>
                 Tested positive</label>
                <label htmlFor="container">
                  <input
                    type="radio"
                    id="doctor"
                    name="diagnosis_type"
                    value="doctor"
                    aria-label="select doctor diagnosis type"
                    onChange={event => this.updateDiagnosisType(event.target.value)}
                  />
                  <span className="checkmark"></span>
                A doctor's professional assessment of my symptoms (diagnosis made without a test)</label>
                <label htmlFor="container">
                  <input
                    type="radio"
                    id="self"
                    name="diagnosis_type"
                    value="self"
                    aria-label="select self diagnosis type"
                    onChange={event => this.updateDiagnosisType(event.target.value)}
                  />
                  <span className="checkmark"></span>
                I self-diagnosed based on my symptoms</label>
                <div>If you were tested and diagnosed by your doctor, select the tested option.</div>
              <label>When were you diagnosed? </label>
                <input
                  type="date"
                  required
                  name="date"
                  id="date"
                  aria-label="date of diagnosis"
                  value={this.state.date.value}
                  onChange={event => this.updateDate(event.target.value)}
                />
              <label>
                How many people live with you in your household?
              </label>
                <input
                  type="text"
                  required
                  name="household"
                  id="household"
                  aria-label="number people in your hosuehold"
                  value={this.state.household.value}
                  onChange={event => this.updateHousehold(event.target.value)}
                />
                  {this.state.household.touched && (
                    <ValidationError message={householdError} />
                  )}

              <button
                type="submit"
                className="submit-button"
                aria-label="submit-button"
                disabled={
                this.validateZipCode() ||
                this.validateHousehold()
                }
              >
                Submit
              </button>
          </fieldset>
        </form>
      </div>
    )
  }
}
