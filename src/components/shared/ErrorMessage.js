import React from 'react';

const ErrorMessage = ({ error, resetError }) => {
	return (
		<div
			onClick={resetError}
			style={{
				width: '33vw',
				color: 'white',
				backgroundColor: 'red',
				marginTop: 30,
				marginLeft: 'auto',
				marginRight: 'auto',
				padding: 10,
				borderRadius: '15px',
				textAlign: 'center',
			}}
		>
			Error: {error.message}
		</div>
	);
};

export default ErrorMessage;
