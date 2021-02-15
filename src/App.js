import React, { useState } from "react";
import { SearchBox } from "./Components/SearchBox";
import { LocationContainer } from "./Components/LocationContainer";
import { Random } from "./Helpers/Random";

function App() {
	const locations = 108,
		[search, setSearch] = useState(""),
		[IDlocation, setIDlocation] = useState(Random(locations)),
		handleSubmit = (e) => {
			e.preventDefault();
			setIDlocation(search);
			e.target[0].value = "";
		},
		handleSearch = (e) => {
			setSearch(e.target.value);
		};

	return (
		<>
			<div
				className="header-hero"
				style={{ backgroundImage: "url(./images/Logo-2.png)" }}
			>
				<SearchBox onSubmit={handleSubmit} onChange={handleSearch} />
			</div>
			<div className="container">
				<LocationContainer id={IDlocation} />
			</div>
		</>
	);
}

export default App;
