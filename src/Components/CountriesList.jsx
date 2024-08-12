import { useState } from 'react';
import CountryData from './CountryData';

const CountriesList = ({ countries, countryData }) => {
	const [shownData, setShownData] = useState(false);
	return (
		<div className='countries--list'>
			{countries.map((country) => (
				<div key={country}>
					<p>{country}</p>
					<button
						onClick={() => setShownData((prevShown) => !prevShown)}
					>
						{!shownData ? 'show more' : 'show less'}
					</button>
					<div>
						{shownData && (
							<CountryData
								countryData={countryData.filter(
									(c) => c.name.common === country
								)}
							/>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default CountriesList;
