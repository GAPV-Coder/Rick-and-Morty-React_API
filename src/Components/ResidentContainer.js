import React, { useState, useEffect } from "react";
import { ResidentInfo } from "./ResidentInfo";

export const ResidentContainer = ({ url }) => {
	const [character, setCharacter] = useState(null),
		[characterData, setCharacterData] = useState({});

	useEffect(() => {
		fetch(url)
			.then((response) =>
				response.ok ? response.json() : Promise.reject(response)
			)
			.then((data) => {
				setCharacter(data);
			});
	}, [url]);

	useEffect(() => {
		if (character !== null) {
			const name = character.name,
				image = character.image,
				status = character.status,
				origin = character.origin.name,
				total_episode = character.episode.length;

			const getCharacterData = { name, image, status, origin, total_episode };

			setCharacterData(getCharacterData);
		}
	}, [character]);

	const { name, image, status, origin, total_episode } = characterData;
	return (
		<div className="card">
			<ResidentInfo
				name={name}
				image={image}
				status={status}
				origin={origin}
				episodes={total_episode}
			/>
		</div>
	);
};
