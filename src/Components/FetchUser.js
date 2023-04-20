const FetchUser = async (username) => {
	try {
		const results = await fetch(
			`https://api.github.com/users/${username}/repos?sort=stars&per_page=100&fork=false`
		);
		const data = await results.json();
		return data;
	} catch (error) {
		throw new Error("An error has occured");
	}
};

export default FetchUser;
