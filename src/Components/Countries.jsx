import CountryData from './CountryData';
import CountriesList from './CountriesList';

const Countries = ({ countries, countryData }) => {
	if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	}
	if (countries.length === 1) {
		return <CountryData countryData={countryData} countries={countries} />;
	}
	if (countries.length > 1) {
		return (
			<CountriesList countries={countries} countryData={countryData} />
		);
	}
};

export default Countries;
