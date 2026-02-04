import React from "react";
import Position from "../../../../../../components/Position";
import experience from "./data";
import "./index.css";

const Experience = () => {
  return (
    <div className="experience-wrapper">
      <h2>Experience</h2>
      {experience.map((item) => {
        // Create stable key from title and organization instead of index
        const key = `${item.title}-${item.organization}`.replace(/\s+/g, '-').toLowerCase();
        return (
          <Position
            key={key}
            title={item.title}
            organization={item.organization}
            date={item.date}
            description={item.description}
          />
        );
      })}
    </div>
  );
};

export default Experience;
