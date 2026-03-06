import type { FormEvent } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import type { DiaryEntry, NewDiaryEntry, Weather, Visibility } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [visibility, setVisibility] = useState<Visibility>("great");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const weatherOptions: Weather[] = ["sunny", "rainy", "cloudy", "windy"];
  const visibilityOptions: Visibility[] = ["great", "good", "ok", "poor"];

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then((res) => setDiaries(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addDiary = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEntry: NewDiaryEntry = { date, weather, visibility, comment };
    try {
      const response = await axios.post<DiaryEntry>(
        "http://localhost:3000/api/diaries",
        newEntry,
      );
      setDiaries([...diaries, response.data]);
      setDate("");
      setWeather("sunny");
      setVisibility("great");
      setComment("");
      setErrorMessage("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data || "Failed to create diary entry");
      } else {
        setErrorMessage("Unknown error");
      }
    }
  };

  return (
    <div>
      <h1>Flight Diaries</h1>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={addDiary}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          weather:
          {weatherOptions.map((w) => (
            <label key={w}>
              {w}
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
            </label>
          ))}
        </div>

        <div>
          visibility:
          {visibilityOptions.map((v) => (
            <label key={v}>
              {v}
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
            </label>
          ))}
        </div>

        <div>
          comment
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Diary</button>
      </form>

      <h2>Diaries</h2>
      {diaries.map((d) => (
        <div key={d.id}>
          <strong>{d.date}</strong>
          <div>Weather: {d.weather}</div>
          <div>Visibility: {d.visibility}</div>
          <div>Comment: {d.comment}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
