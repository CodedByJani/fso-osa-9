// =========================
// TYPES
// =========================

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

// basic
interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic";
}

// group
interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

// background
interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

// NEW special type
interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

// =========================
// DATA
// =========================

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group",
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic",
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial:
      "https://type-level-typescript.com/template-literal-types",
    kind: "background",
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special",
  },
];

// =========================
// COMPONENTS
// =========================

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

// Exhaustive check helper
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

// Part component (IMPORTANT)
const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>{part.description}</p>
        </div>
      );

    case "group":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>Group projects: {part.groupProjectCount}</p>
        </div>
      );

    case "background":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>{part.description}</p>
          <p>Submit to: {part.backgroundMaterial}</p>
        </div>
      );

    case "special":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>{part.description}</p>
          <p>Required skills: {part.requirements.join(", ")}</p>
        </div>
      );

    default:
      return assertNever(part);
  }
};

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
};

const Total = ({ parts }: { parts: CoursePart[] }) => {
  const total = parts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <p>
      <strong>Total exercises: {total}</strong>
    </p>
  );
};

// =========================
// APP
// =========================

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
