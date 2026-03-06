import { useEffect, useState } from "react";
import type { DiaryEntry, NewDiaryEntry } from "./types";
import { getAllDiaries, createDiary } from "./services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    const returnedDiary = await createDiary(newEntry);
    setDiaries(diaries.concat(returnedDiary));

    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
  };

  return (
    <div>
      <h1>Add new entry</h1>

      <form onSubmit={addDiary}>
        <div>
          date
          <input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div>
          weather
          <input value={weather} onChange={(e) => setWeather(e.target.value)} />
        </div>

        <div>
          visibility
          <input
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>

        <div>
          comment
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>

        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>

      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>weather: {diary.weather}</p>
          <p>visibility: {diary.visibility}</p>
          <p>{diary.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
