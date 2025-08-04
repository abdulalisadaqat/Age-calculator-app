const Input = ({
	id,
	label,
	min,
	max,
	placeholder,
	formData,
	setFormData,
	errors,
}) => {
	return (
		<>
			<div className="max-w-[124px]">
				<label
					htmlFor={id}
					className={
						"text-gray-500 font-bold tracking-[0.15em] text-xs peer/input:focus:text-violet-500 transition-all duration-100 ease-in-out " +
						(errors[id] ? "text-red-400 " : "")
					}
				>
					{label}
				</label>
				<input
					type="number"
					id={id}
					value={formData[id] || ""}
					min={min}
					max={max}
					placeholder={placeholder}
					className={
						"w-full outline outline-1 outline-gray-200 focus:outline-violet-500 px-4 py-3 mt-1 rounded-md placeholder-gray-500/80 placeholder:font-bold font-bold text-2xl max-sm:text-xl transition-all duration-100 ease-in-out " +
						(errors[id] ? "outline-red-400 focus:!outline-red-400 error" : "")
					}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, [id]: e.target.value }))
					}
				/>
				{errors[id] && (
					<div className="text-red-400 text-sm max-sm:text-xs mt-1 italic">
						{errors[id]}
					</div>
				)}
			</div>
		</>
	);
};

export default Input;
