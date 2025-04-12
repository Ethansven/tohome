import { transformUsers } from "../utils/transformer";
import { User } from "../types/users";

describe("transformUsers", () => {
	const mockUsers: User[] = [
		{
			id: 1,
			firstName: "Emily",
			lastName: "Johnson",
			age: 28,
			gender: "female",
			hair: { color: "Brown", type: "Curly" },
			address: { postalCode: "29112" },
			company: { department: "Engineering" },
		},
		{
			id: 2,
			firstName: "John",
			lastName: "Smith",
			age: 35,
			gender: "male",
			hair: { color: "Blond", type: "Straight" },
			address: { postalCode: "12345" },
			company: { department: "Engineering" },
		},
		{
			id: 3,
			firstName: "Alice",
			lastName: "Wonderland",
			age: 42,
			gender: "female",
			hair: { color: "Brown", type: "Wavy" },
			address: { postalCode: "11111" },
			company: { department: "Marketing" },
		},
	];

	it("should correctly group users by department", () => {
		const result = transformUsers(mockUsers);
		expect(result).toHaveProperty("Engineering");
		expect(result).toHaveProperty("Marketing");
	});

	it("should correctly count male and female users", () => {
		const result = transformUsers(mockUsers);
		expect(result["Engineering"].male).toBe(1);
		expect(result["Engineering"].female).toBe(1);
		expect(result["Marketing"].male).toBe(0);
		expect(result["Marketing"].female).toBe(1);
	});

	it("should compute correct age range", () => {
		const result = transformUsers(mockUsers);
		expect(result["Engineering"].ageRange).toBe("28-35");
		expect(result["Marketing"].ageRange).toBe("42-42");
	});

	it("should count hair colors correctly", () => {
		const result = transformUsers(mockUsers);
		expect(result["Engineering"].hair["Brown"]).toBe(1);
		expect(result["Engineering"].hair["Blond"]).toBe(1);
		expect(result["Marketing"].hair["Brown"]).toBe(1);
	});

	it("should map addressUser correctly", () => {
		const result = transformUsers(mockUsers);
		expect(result["Engineering"].addressUser["EmilyJohnson"]).toBe("29112");
		expect(result["Engineering"].addressUser["JohnSmith"]).toBe("12345");
		expect(result["Marketing"].addressUser["AliceWonderland"]).toBe(
			"11111"
		);
	});
});
