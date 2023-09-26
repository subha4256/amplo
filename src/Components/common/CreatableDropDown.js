import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';
//import { colourOptions } from '../data';

export default class CreatableDropDown extends Component {
  handleChange = (newValue) => {
    //console.group('Value Changed');
    //console.log(newValue);
    this.props.handleValueChange(newValue);
    //console.log(`action: ${actionMeta.action}`);
    //console.groupEnd();
  };
  /*handleInputChange = (inputValue) => {
    console.group('Input Changed');
    console.log(inputValue);
    //console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };*/
  render() {
    return (
      <CreatableSelect
        isClearable
        onChange={this.handleChange}
        //onInputChange={this.handleInputChange}
        options={this.props.templates}
      />
    );
  }
}