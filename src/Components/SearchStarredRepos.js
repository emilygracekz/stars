import { useState, useEffect } from "react";
import FetchUser from "./FetchUser";
import RepoDataCard from "./RepoDataCard";

function SearchStarredRepos() {
	const [user, setUser] = useState("");
	const [results, setResults] = useState(undefined);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (user) {
			// setTimeout so user can finish typing
			const fetchRepos = setTimeout(async () => {
				setIsLoading(true);

				const userRepos = await FetchUser(user);

				// error if no user found
				if (userRepos.message) {
					setError(true);
					setResults(undefined);
					return;
				}
				
				// filter results for repos with stars in decending order
				const filterStarredRepos = userRepos.filter(
					(repo) => repo.stargazers_count > 0
				);

				const sortedDecendingOrder = filterStarredRepos.sort(
					(a, b) => b.stargazers_count - a.stargazers_count
				);

				setResults(sortedDecendingOrder);
				setError(false);
				setIsLoading(false);
			}, 300);

			// setTimeout cleanup
			return () => clearTimeout(fetchRepos);
		}
	}, [user]);

	return (
		<div>
			<>
				<label htmlFor="search-github-users" className="label">
					<b>Search Github Users</b>
				</label>
				<p>
					Search any user in Github and find repositories with the most stars
				</p>
				<input
					className="search"
					type="text"
					placeholder="Search user..."
					value={user}
					id="search-github-users"
					onChange={(event) => setUser(event.target.value)}
				/>
				{isLoading ? (
					<>
						<p>loading...</p>
					</>
				) : null}
				{error ? (
					<p className="error">
						<b>No user found</b>
					</p>
				) : null}
				<div className="grid">
					{results
						? results.map((repos) => (
								<RepoDataCard
									key={repos.url}
									link={repos.html_url}
									repoName={repos.name}
									description={repos.description}
									languages={repos.language}
									stars={repos.stargazers_count}
								/>
						  ))
						: null}
				</div>
			</>
		</div>
	);
}

export default SearchStarredRepos;
