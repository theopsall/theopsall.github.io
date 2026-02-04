import Student from "../../../../../../components/Student";
import education from "./data";
import "./index.css";

const Education = () => {
  return (
    <div className="education-wrapper">
      <h2>Education</h2>
      {education.map((item) => {
        // Create stable key from title and organization instead of index
        const key = `${item.title}-${item.organization}`.replace(/\s+/g, '-').toLowerCase();
        return (
          <Student
            key={key}
            title={item.title}
            organization={item.organization}
            date={item.date}
            thesis={item.thesis}
          />
        );
      })}
    </div>
  );
};

export default Education;
