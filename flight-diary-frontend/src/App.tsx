import { useEffect, useState } from "react";
import axios from "axios";
import type { DiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get<DiaryEntry[]>(
          "http://localhost:3000/api/diaries/full",
        );
        setDiaries(response.data);
      } catch (error) {
        console.error("Failed to fetch diaries:", error);
      }
    };
    fetchDiaries();
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>
      {diaries.map((diary) => (
        <div key={diary.id} style={{ marginBottom: "1em" }}>
          <p>{diary.date}</p>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
          <p>Comment: {diary.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
