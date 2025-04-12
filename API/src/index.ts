import express from "express";
import {userRoute} from "./routes/userRoute";

const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
    console.log("Use the following link to get user summary:http://localhost:3000/api/users/summary");
});
app.use(express.json());

app.use("/api/users", userRoute);

export default app;
