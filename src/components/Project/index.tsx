import React from 'react';
import './index.css';

interface IProjectProps {
  title: string;
  description: string;
  link: string;
}

const Project = React.memo((props: IProjectProps) => {
  const { title, description, link } = props;
  return (
    <a href={link} target="_blank" rel="noreferrer" className="project-item">
      <div className="card">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{description}</p>
      </div>
    </a>
  );
});

Project.displayName = 'Project';

export default Project;

