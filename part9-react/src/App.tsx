// Define the type for course parts
type CoursePart = {
  name: string;
  exerciseCount: number;
};

// Header component
type HeaderProps = {
  name: string;
};

const Header = ({ name }: HeaderProps) => {
  return <h1>{name}</h1>;
};

// Content component
type ContentProps = {
  parts: CoursePart[];
};

const Content = ({ parts }: ContentProps) => {
  return (
    <>
      {parts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  );
};

// Total component
type TotalProps = {
  parts: CoursePart[];
};

const Total = ({ parts }: TotalProps) => {
  const total = parts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return <p>Number of exercises {total}</p>;
};

// App component
const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
