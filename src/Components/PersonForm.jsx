const PersonForm = (props) => {
	return (
		<form onSubmit={props.addPerson}>
			<div>
				<label htmlFor='name'>Name:</label>
				<input
					id='name'
					value={props.newName}
					onChange={props.handleChangeName}
				/>
			</div>
			<div>
				<label htmlFor='number'>Number:</label>
				<input
					type='tel'
					id='number'
					value={props.newNumber}
					onChange={props.handleChangeNumber}
				/>
			</div>
			<button type='submit'>add</button>
		</form>
	);
};

export default PersonForm;
