import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Output from "./components/Output";
function App() {
	const [formData, setFormData] = useState({
		day: "",
		month: "",
		year: "",
	});
	const [errors, setErrors] = useState({
		day: "",
		month: "",
		year: "",
	});
	const today = new Date();
	const [age, setAge] = useState({});

	const validateForm = () => {
		let isValid = true;
		const newErrors = {
			day: "",
			month: "",
			year: "",
		};
		const daysInMonth = {
			1: 31,
			2: 28,
			3: 31,
			4: 30,
			5: 31,
			6: 30,
			7: 31,
			8: 31,
			9: 30,
			10: 31,
			11: 30,
			12: 31,
		};

		if (!formData.day) {
			newErrors.day = "This field is required";
			isValid = false;
		} else if (formData.day < 1 || formData.day > 31) {
			newErrors.day = "Invalid day";
			isValid = false;
		} else {
			const day = Number(formData.day);
			const month = Number(formData.month);

			if (month && day > daysInMonth[month]) {
				newErrors.day = `Invalid day for month ${month}`;
				isValid = false;
			}
		}

		if (!formData.month) {
			newErrors.month = "This field is required";
			isValid = false;
		} else if (formData.month < 1 || formData.month > 12) {
			newErrors.month = "Invalid month";
			isValid = false;
		}

		if (!formData.year) {
			newErrors.year = "This field is required";
			isValid = false;
		} else if (formData.year < 1900 || formData.year > today.getFullYear()) {
			newErrors.year = "Invalid year";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const calculateAge = () => {
		if (!validateForm()) return;

		const formDate = new Date(formData.year, formData.month - 1, formData.day);

		let years = today.getFullYear() - formDate.getFullYear();
		let months = today.getMonth() - formDate.getMonth();
		let days = today.getDate() - formDate.getDate();

		// check if days is negative and invalid
		if (days < 0) {
			months -= 1;
			const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
			days += prevMonth.getDate();
		}

		// check if months is negative and invalid
		if (months < 0) {
			years -= 1;
			months += 12;
		}

		return { years, months, days };
	};

	useEffect(() => {
		console.log("Age updated:", age);
	}, [age]);
	return (
		<>
			<main>
				<div className="bg-gray-200/60 w-screen h-screen flex items-center justify-center max-sm:px-5">
					<div className="bg-white rounded-3xl rounded-br-[160px] p-10 max-sm:p-5">
						<form action="#" className="relative border-b-2 border-gray-200">
							<div className="flex gap-6 pb-8 pr-36 max-sm:pr-0 max-sm:pb-16">
								<Input
									id="day"
									label="DAY"
									placeholder="DD"
									min={1}
									max={31}
									formData={formData}
									setFormData={setFormData}
									errors={errors}
								/>
								<Input
									id="month"
									label="MONTH"
									placeholder="MM"
									min={1}
									max={12}
									formData={formData}
									setFormData={setFormData}
									errors={errors}
								/>
								<Input
									id="year"
									label="YEAR"
									placeholder="YYYY"
									min={today.getFullYear() - 125}
									max={today.getFullYear()}
									formData={formData}
									setFormData={setFormData}
									errors={errors}
								/>
							</div>
							<button
								className="bg-violet-500 rounded-full p-4 absolute bottom-0 right-0 translate-y-1/2 max-sm:right-1/2 max-sm:translate-x-1/2 hover:bg-black transition-all duration-200 ease-in-out"
								type="button"
								onClick={() => setAge(calculateAge())}
							>
								<img
									src="images/icon-arrow.svg"
									alt="arrow icon"
									className="h-8 w-8"
								/>
							</button>
						</form>
						<div className="result pt-12 max-sm:pt-16 max-sm:pb-8">
							<Output value={age?.years} label="years" />
							<Output value={age?.months} label="months" />
							<Output value={age?.days} label="days" />
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
