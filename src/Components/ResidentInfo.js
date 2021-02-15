import React from "react";

export const ResidentInfo = ({ name, image, status, origin, episodes }) => {
	return (
		<>
			<div className="resident-avatar">
				<img src={image} alt={name} />
			</div>
			<div className="resident-info">
				<h2>{name}</h2>
				<p>Status: {status}</p>
				<p>Origin: {origin}</p>
				<p>Total Episodes: {episodes}</p>
			</div>
		</>
	);
};
