const RepoDataCard = ({ link, repoName, description, languages, stars }) => {
	return (
		<div className="data-card">
			<p>
				<b><a href={link}>Repo Name</a>:{" "}
				{repoName}</b>
			</p>
			<p><b>Stars:</b> {stars}</p>
			<p><b>Languages:</b> {languages}</p>
			<p><b>Description:</b> {description}</p>
		</div>
	);
};

export default RepoDataCard;
