import type React from "react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import "./index.css";

interface IStudentProps {
  title: string;
  organization: string;
  date: string;
  thesis: React.ReactElement | string;
}

const Student = (props: IStudentProps) => {
  const { title, organization, date, thesis } = props;
  return (
    <div className="education-item">
      <div className="row">
        <h3 className="title">{title}</h3>
        <span className="period">{date}</span>
      </div>
      <Badge className="organization" variant="secondary">
        {organization}
      </Badge>
      {thesis}
      <Separator className="my-4" />
    </div>
  );
};
export default Student;
