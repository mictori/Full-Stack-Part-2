import Header from "./Header"
import CourseContent from "./CourseContent";
import Total from "./Total";

//Reduce method to get sum of values in object array
const Course = ({course}) => {
  const total = course.parts.reduce((acc, obj) => {
    return acc + obj.exercises
  }, 0)

  return (
    <div>
        <Header courseName={course.name} />
        <CourseContent 
            parts={course.parts}
        />
        <Total 
            total={total}
        />
    </div>
  )
}

export default Course