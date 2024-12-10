//A hook from React used to create a piece of state in the component. State helps store values that can change (like the search query).
import React, { useState } from 'react'

//AsyncPaginate: A component from the react-select-async-paginate library that helps with creating a dropdown list that loads options dynamically (as the user types).
import { AsyncPaginate } from 'react-select-async-paginate'

//they contain information about where to fetch the city data from (like a link to the API) and the configuration needed to make the request
import { GEO_API_URL, geoApiOptions } from '../../api';

//This is the main component. It accepts a prop called onSearchChange (a function passed from a parent component) to handle the search result when a user selects a city.
const Search = ({ onSearchChange }) => {

  //This line creates a piece of state called search that will hold the current value of the city the user is searching for.
  // setSearch is a function that allows you to update this state.
  // Initially, the state is set to null (meaning no search has been made yet).
  const [search, setSearch] = useState(null);

  //loadOptions is an asynchronous function that is triggered when the user types something into the search box. It sends a request to an external API to get a list of cities.
  //The value the user types into the search bar
  const loadOptions = async (inputValue) => {
    //The fetch function makes a request to the API with a URL that includes: minPopulation=100000000: This filters the cities to only those with a population of at least 100 million. namePrefix=${inputValue} : This means the API will search for cities whose names start with what the user typed
    return fetch(
      `${GEO_API_URL}/cities?namePrefix=${inputValue}`, geoApiOptions
    )
      //After getting the data, it converts the response into JSON
      .then((response) => response.json())

      //then maps through the list of cities to create an array of objects that the dropdown will show. Each object contains: value: label:
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              //value: A combination of latitude and longitude.
              value: `${city.latitude} ${city.longitude}`,
              //label: The city’s name and country code (for example, "New York, US").
              label: `${city.name}, ${city.countryCode}`,
            }
          })
        }
      })
      //If there’s an error during the fetch, it will be logged to the console.
      .catch((err) => console.error(err))
  }

  //When the user selects a city from the list, this function is called. It updates the search state with the selected city’s data (setSearch(searchData)). 
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    //It also calls the onSearchChange function (passed from the parent component) to let the parent know about the selected city.
    onSearchChange(searchData);
  }

  return (
    //This is the component that provides the dropdown list. It handles searching as the user types and fetching the city options dynamically
    <AsyncPaginate
      placeholder="Search for city"
      //This means there will be a delay of 600 milliseconds after the user stops typing before the search starts.
      debounceTimeout={600}
      value={search}

      //This tells the component to call the handleOnChange function when a user selects a city
      onChange={handleOnChange}

      //This links the loadOptions function to fetch city options based on the user’s input.
      loadOptions={loadOptions}
    />
  )
}

export default Search;
