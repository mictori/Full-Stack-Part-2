const Person = ({ person, removePerson }) => {
	return (
		<tr key={person.id}>
			<td style={{fontWeight: 600, letterSpacing: 0.1}}>{person.name}</td>
			<td>{person.number}</td>
			<td>
				<button onClick={() => removePerson(person.id)}>delete</button>
			</td>
		</tr>
	);
};

export default Person;
