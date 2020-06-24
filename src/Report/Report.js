import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError';
import './Report.css';

export default class Report extends React.Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props)
    this.state = {
      state_name: {
        value: '',
        touched: false
      },
      zip_code: {
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

  updateStateName(state_name) {
    this.setState({state_name: {value: state_name, touched: true}});
  }
  updateZipCode(zip_code) {
    this.setState({zip_code: {value: zip_code, touched: true}});
  }
  updateDate(date) {
    this.setState({date: {value: date, touched: true}});
  }
  updateDiagnosisType(diagnosis_type) {
    this.setState({diagnosis_type: {value: diagnosis_type, touched: true}});
  }
  updateHousehold(household) {
    this.setState({household: {value: household, touched: true}});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { state_name, zip_code, diagnosis_type, date, household} = this.state;
    const uuid = uuidv4();
    const report = {
      reortid: uuid,
      state_name: state_name.value,
      diagnosis_type: diagnosis_type.value,
      zip_code: zip_code.value,
      date: date.value,
      household: household.value
    }
    this.context.addReport(report);
  }

  validateZipCode() {
    const zip_code = this.state.zip_code.value.trim();
    if (zip_code.length === 0) {
      return "Zip code is required"
    } else if (zip_code.length > 5) {
      return "Zip code can only be 5 digits long"
    } else if (!zip_code.match(/[0-9]/)) {
      return "Zip code may only contain numbers"
    }
  }

  render() {
    const zipCodeError = this.validateZipCode();
    return (
      <div>
        <h3>Submit a Report</h3>
        <form className="form-group" onSubmit={event => this.handleSubmit(event)}>
          <fieldset>
            <legend>Report Form</legend>
              <label>What state do you live in?</label>
                <input
                  type="text"
                  required
                  name="state_name"
                  id="state_name"
                  aria-label="input state"
                  value={this.state.state_name.value}
                  onChange={event => this.updateStateName(event.target.value)}
                />
              <label>What is your zip code?</label>
                <input
                  type="text"
                  required
                  name="zip_code"
                  id="zip_code"
                  aria-label="input zip code"
                  value={this.state.zip_code.value}
                  onChange={event => this.updateZipCode(event.target.value)}
                />
                  {this.state.zip_code.touched && (
                    <ValidationError message={zipCodeError} id="zip_code_error" />
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
              <button
                type="submit"
                className="submit-button"
                aria-label="submit-button"
                // disabled={
                // this.validateName() ||
                // this.validateAge()
                // }
              >
                Submit
              </button>
          </fieldset>
        </form>
      </div>
    )
  }
}
