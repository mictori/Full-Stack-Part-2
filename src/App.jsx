import { useState, useEffect } from 'react';
import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Contacts from './Components/Contacts';
import personsService from './Services/Persons';
import Notification from './Components/Notification';
import ErrorNotification from './Components/ErrorNotification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [shownNames, setShownNames] = useState('');
	const [notification, setNotification] = useState(null);
	const [errorNotification, setErrorNotification] = useState(null);

	const namesToShow = shownNames ? shownNames : persons;

	useEffect(() => {
		personsService.getAll().then((initialContacts) => {
			setPersons(initialContacts);
		});
	}, []);

	//Getting value from input
	const handleChangeName = (event) => {
		setNewName(event.target.value);
	};

	const handleChangeNumber = (event) => {
		setNewNumber(event.target.value);
	};

	//Filtering by name 
	const filterNames = (event) => {
		const filteredNames = persons.filter((person) =>
			person.name.toLowerCase().includes(event.target.value.toLowerCase())
		);
		setShownNames(filteredNames);
	};

	//Adding new person
	const addPerson = (event) => {
		event.preventDefault();
		setShownNames('');

		const newNameObject = {
			name: newName,
			number: newNumber,
			id: String(persons.length + 1),
		};

		const existingPerson = checkExistingPerson(newNameObject);
		if (!existingPerson) {
			personsService
				.create(newNameObject)
				.then((createdObject) => {
				setPersons(persons.concat(createdObject));
			});
		} else {
			if (existingPerson.number === newNumber) {
				setNotification(`${newName} is already added to phonebook`);
				setTimeout(() => {
					setNotification(null)
				}, 5000);
			} else {
				if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
					const changedPerson = {...existingPerson, number: newNumber}
					personsService
						.update(changedPerson.id, changedPerson)
						.then(returnedPerson => {
							setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
						})
						.catch(error => {
							setErrorNotification(`Error! ${existingPerson.name} is already removed from phonebook`)
						})
						setTimeout(() => {
							setErrorNotification(null)
						}, 5000);
						setPersons(persons.filter(person => person.id !== existingPerson.id))
				}
			}
		}

		setNewName('');
		setNewNumber('');
	};

	const checkExistingPerson = (person) => {
		return persons.find(
			(obj) => obj.name.toLowerCase() === person.name.toLowerCase()
		)
	}

	//Deleting person
	const removePerson = (id) => {
		console.log(id);
		const personToRemove = persons.find((person) => person.id === id);
		if (confirm(`Delete ${personToRemove.name} from Phonebook?`)) {
			personsService.remove(id);
			setPersons(persons.filter((person) => person.id !== id));
			setNotification('Number deleted!');
			setTimeout(() => {
				setNotification(null)
			}, 3000);
		}
	};
	return (
		<div>
			<h1>Phonebook</h1>
			<div className='notification'>
				<Notification message={notification} />  
				<ErrorNotification message={errorNotification} />
			</div>
			<Filter filterNames={filterNames} />
			<h2>Add a new</h2>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				newNumber={newNumber}
				handleChangeName={handleChangeName}
				handleChangeNumber={handleChangeNumber}
			/>
			<h2>Numbers</h2>
			<Contacts namesToShow={namesToShow} removePerson={removePerson} />
		</div>
	);
};

export default App;
