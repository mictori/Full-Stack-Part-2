const CountryData = ({ countryData }) => {
	return (
		<div>
			{countryData.map((country) => {
				return (
					<div key={country}>
						<h2>{country.name.common}</h2>
						<p>Capital: {country.capital}</p>
						<p>Area: {country.area}</p>
						<h3>Languages</h3>
						<ul>
							{Object.values(country.languages).map((val) => (
								<li key={val}>{val}</li>
							))}
						</ul>
						<img src={country.flags.png} className='flag--img' />
					</div>
				);
			})}
		</div>
	);
};

export default CountryData;
