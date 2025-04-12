export interface User {
	id: number;
	firstName: string;
	lastName: string;
	age: number;
	gender: "male" | "female";
	hair: {
		color: string;
		type: string;
	};
	address: {
		postalCode: string;
	};
	company: {
		department: string;
	};
}

export interface DepartmentSummary {
	male: number;
	female: number;
	ageRange: string;
	hair: { [color: string]: number };
	addressUser: { [fullName: string]: string };
}

export interface TransformedData {
	[department: string]: DepartmentSummary;
}
