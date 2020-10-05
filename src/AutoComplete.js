import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export class Autocomplete extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  };
  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: '',
    searchObj: '',
    displayWindow: 'none',
  };


 displayWindow() {
        let classes = "windowView ";
        classes += (this.state.displayWindow === 'block') ? "block" : "none";
        return classes;
}

loadCountry = (country) => {
 let newObj = {};   
 const url = 'https://api.covid19api.com/dayone/country/'
        
            axios.get(url + country)
        
                .then(res => {
                    console.log(res.data)
                    let data = res.data;
                    let newArr = [];
                     
                     var lastItem = data[data.length - 1];

                         newObj.country = lastItem.Country;
                         var slicedDate = lastItem.Date.slice(0, 10);
                         newObj.date = slicedDate;
                         newObj.confirmed = lastItem.Confirmed;
                         newObj.deaths = lastItem.Deaths;
                         newObj.recovered = lastItem.Recovered;
                    
                 
                }) 
    this.setState({
     
      searchObj: newObj
    });
        
   return newObj;
}

  onChange = (e) => {
    console.log('onChanges');

    const { options } = this.props;
    const userInput = e.currentTarget.value;
    this.loadCountry(userInput);
    const filteredOptions = options.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value,
      displayWindow: 'block',
    });
  };

  onClick = (e) => {
    
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
  };
  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
   
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption]
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
      
     
       
    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, userInput }
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Option!</em>
          </div>
        );
      }
    }

    const DisplayData = this.state.displayWindow === 'block'  ? (
                    <div className={ this.displayWindow() }>
                          <p><b>Country:</b> {this.state.searchObj.country}</p>
                          <p><b>Date: </b>{this.state.searchObj.date}</p>
                          <p><b>Confirmed: </b>{this.state.searchObj.confirmed}</p>
                          <p><b>Deaths:</b> {this.state.searchObj.deaths}</p>
                          <p><b>Recovered:</b> {this.state.searchObj.recovered}</p>
                    </div>
                ): (''); 
    return (
      <React.Fragment>
        <div className="search">
          <input
            type="search"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            placeholder="Type a country"
          />
          <input type="submit" value="" className="search-btn" />
        </div>
        {optionList}
       
        {DisplayData}
      </React.Fragment>
    );
  }
}

export default Autocomplete;
