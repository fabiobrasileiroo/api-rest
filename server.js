import app from "./src/app/app.js";
import 'dotenv/config'

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("Server on port", `http://localhost:${PORT}`);
});
