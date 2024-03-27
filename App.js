import express from 'express'
import Hello from "./Hello.js"
import Lab5 from "./Lab5.js";
// captial C here not sure why
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from "./Kanbas/modules/routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app)

app.listen(process.env.PORT || 4000);