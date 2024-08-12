import { useState, useEffect } from 'react';
import Countries from './Components/Countries';
import axios from 'axios';


const App = () => {
	const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all';
	const [value, setValue] = useState(null);
	const [countriesNames, setCountriesNames] = useState([]);
	const [countryData, setCountryData] = useState([]);

	const handleChangeInput = (event) => {
		if (event.target.value) {
			let valueCapitalized = capitalizeValue(event.target.value);
			setValue(valueCapitalized);
		}
	};

	const capitalizeValue = (a) => {
		return a[0].toUpperCase() + a.slice(1);
	};

	useEffect(() => {
		if (value !== null) {
			axios.get(baseURL).then((response) => {
				const returnedCountries = response.data.filter((country) =>
					country.name.common.includes(value)
				);
				setCountryData(returnedCountries);
				const countriesNames = returnedCountries.map(
					(country) => country.name.common
				);
				setCountriesNames(countriesNames);
				setValue(null);
			});
		}
	}, [value]);

  console.log('country', countryData)

	return (
		<div>
			<h1>Data for countries</h1>
			<div>
				<label htmlFor='search'>find countries</label>
				<input id='search' onChange={handleChangeInput}></input>
			</div>
			<Countries countries={countriesNames} countryData={countryData} /> 
		</div>
	);
};

export default App;
