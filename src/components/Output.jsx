const Output = ({ value, label }) => {
	return (
		<>
			<p className="text-[80px] leading-none font-extrabold italic mb-2 max-sm:text-6xl max-xs:text-5xl">
				{value ? (
					<span className="text-violet-500">{value}</span>
				) : (
					<span className="text-violet-500 tracking-[8px] ">--</span>
				)}
				<span className="ml-2">{label}</span>
			</p>
		</>
	);
};

export default Output;
