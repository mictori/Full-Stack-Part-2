const Filter = ({ filterNames }) => {
	return (
		<div>
			<label htmlFor='filter'>Filter shown with</label>
			<input 
        id='filter' 
        onChange={filterNames} 
      />
		</div>
	);
};

export default Filter;
