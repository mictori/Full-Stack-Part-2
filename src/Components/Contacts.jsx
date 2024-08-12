import Person from './Person';

const Contacts = ({ namesToShow, removePerson }) => {
	return (
		<table>
			<tbody>
				{namesToShow.map((person) => (
					<Person 
						key={person.id} 
						person={person} 
						removePerson={removePerson}
					/>
				))}
			</tbody>
		</table>
	);
};

export default Contacts;
