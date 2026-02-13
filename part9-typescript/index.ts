import express from "express";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json()); // <-- needed to parse JSON body

// POST /exercises endpoint
app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = req.body;

  if (!body.daily_exercises || body.target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }

  const dailyExercises = body.daily_exercises;
  const target = body.target;

  // check if all values are numbers
  if (
    !Array.isArray(dailyExercises) ||
    dailyExercises.some((h) => isNaN(Number(h))) ||
    isNaN(Number(target))
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(dailyExercises.map(Number), Number(target));
  return res.json(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
