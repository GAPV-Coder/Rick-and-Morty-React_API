import React, { useState, useEffect } from "react";
import { ResidentContainer } from "./ResidentContainer";

export const LocationContainer = ({ id }) => {
	const API_LINK = "https://rickandmortyapi.com/api",
		[location, setLocation] = useState(null),
		[locationInfo, setLocationInfo] = useState({}),
		[page, setPage] = useState(0),
		[dangerMessage, setDangerMessage] = useState(null);

	useEffect(() => {
		fetch(`${API_LINK}/location/${id}`)
			.then((reply) => (reply.ok ? reply.json() : Promise.reject(reply)))
			.then((data) => {
				setLocation(data);
			})
			.catch((error) => {
				setDangerMessage("This location does not exist");
			});
		setDangerMessage(null);
		setPage(0);
	}, [id]);

	useEffect(() => {
		if (location !== null) {
			const name = location.name,
				type = location.type,
				dimension = location.dimension,
				total_residents = location.residents.length,
				residents = location.residents.map((resident) => resident);

			const getLocationInfo = {
				name,
				type,
				dimension,
				total_residents,
				residents,
			};

			setLocationInfo(getLocationInfo);
		}
	}, [location]);

	const { name, type, dimension, total_residents, residents } = locationInfo,
		netxPage = Math.ceil(total_residents / 5),
		onNextPage = () => setPage((page + 1) % netxPage),
		onPrevPage = () => setPage((page - 1) % netxPage),
		isResidents = total_residents > 0 ? true : false;

	return (
		<>
			<div className="location-container">
				{dangerMessage !== null ? (
					<p className="message">{dangerMessage}</p>
				) : (
					<>
						<h2>{name}</h2>
						<div className="location-info">
							<p>
								<span>Type: </span>
								{type}
							</p>
							<p>
								<span>Dimension:</span> {dimension}
							</p>
							<p>
								<span>Total residents:</span> {total_residents}
							</p>
						</div>
					</>
				)}
			</div>
			<div className="card-container">
				{dangerMessage !== null ? null : (
					<>
						{isResidents ? (
							residents
								.slice(page * 6, 6 * (page + 1))
								.map((resident, index) => {
									return <ResidentContainer key={index + 1} url={resident} />;
								})
						) : (
							<p className="message">
								There are no residents to display at this location
							</p>
						)}
					</>
				)}
			</div>
			<div className="pagination">
				{dangerMessage !== null ? null : (
					<>
						{isResidents && (
							<>
								<button onClick={onPrevPage} disabled={!page}>
									&lt;Prev.
								</button>
								<button
									onClick={onNextPage}
									disabled={page === Math.ceil(total_residents / 6) - 1}
								>
									Next&gt;
								</button>
							</>
						)}
					</>
				)}
			</div>
		</>
	);
};
