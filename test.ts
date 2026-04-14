import "dotenv/config";
import { getPopularLeagues } from "./src/api/request";

// getPopularLeagues().then(console.log).catch(console.error);

getPopularLeagues()
  .then((data) => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
