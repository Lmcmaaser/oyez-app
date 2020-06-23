import React from 'react';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError';
import './report.css';

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
      how: {
        value: '',
        touched: false
      },
      household: {
        value: '',
        touched: false
      }
    }
  }
  render() {
    return (
      <div class='main_content'>
        <h3>Submit a Report</h3>
        <form class="form-group">
          <fieldset>
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
            <label>How were you diagnosed?</label>
              <input type="radio"/>
              <input type="radio"/>
              <input type="radio"/>
            <label>When were you diagnosed<?/label>
              <input
                type="text"
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
