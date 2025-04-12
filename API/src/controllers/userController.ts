import { Request, Response } from "express";
import axios from "axios";
import { transformUsers } from "../utils/transformer";
import { User } from "../types/users";

export const getUserSummary = async (req: Request, res: Response) => {
	try {
        //fetch adata from the API
		const response = await axios.get("https://dummyjson.com/users");
        //assign the data to the users variable
		const users: User[] = response.data.users;
        //do the transforma function and get result back
		const result = transformUsers(users);
		res.json(result);
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
