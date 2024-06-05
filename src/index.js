import "./styles/main.css";

import startApp from "./app.js";
import { initEngine } from "./render/init.js";

(async () => {
    await initEngine();
    startApp();
})();
