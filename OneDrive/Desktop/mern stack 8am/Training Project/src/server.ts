import http from "http";
import app from "./app";
import { connectDatabase } from "./config/db.config";

const PORT = 9000;
const DB_URL = "mongodb://localhost:27017/team_17_db";

//* http server
const server = http.createServer(app);

//* database connect
connectDatabase(DB_URL);

//* server listen
server.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
