import { User, TransformedData, DepartmentSummary } from "../types/users";
//add temporary type to calculate age range
type InternalSummary = DepartmentSummary & {
	minAge: number;
	maxAge: number;
};

export function transformUsers(users: User[]): TransformedData {
	const summary: { [department: string]: InternalSummary } = {};

	users.forEach((user) => {
		const dept = user.company.department;
		const gender = user.gender;
		const hairColor = user.hair.color;
		const fullName = `${user.firstName}${user.lastName}`;
		const postalCode = user.address.postalCode;
		const age = user.age;
		//if that ddepartment is not in the summary, add it
		if (!summary[dept]) {
			summary[dept] = {
				male: 0,
				female: 0,
				ageRange: "",
				hair: {},
				addressUser: {},
				minAge: age,
				maxAge: age,
			};
		}
		//condition to add the number for each gender that is in the summary
		if (gender === "male") summary[dept].male++;
		else if (gender === "female") summary[dept].female++;
		//add hair color
		summary[dept].hair[hairColor] =
			(summary[dept].hair[hairColor] || 0) + 1;
		//addd address postal code
		summary[dept].addressUser[fullName] = postalCode;
		//compare age and keep the min and max age
		summary[dept].minAge = Math.min(summary[dept].minAge, age);
		summary[dept].maxAge = Math.max(summary[dept].maxAge, age);
	});

	// Transform the summary to the desired output format
	const result: TransformedData = {};
	for (const dept in summary) {
		const { minAge, maxAge, ...cleaned } = summary[dept];
		result[dept] = {
			...cleaned,
			//check if there's range or not
			ageRange: minAge === maxAge ? `${minAge}` : `${minAge}-${maxAge}`,
		};
	}
	return result;
}
