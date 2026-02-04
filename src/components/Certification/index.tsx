import React from "react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import "./index.css";

interface ICertificationProps {
  title: string;
  organization: string;
  date: string;
  description: React.ReactElement | string;
}

const Certification = React.memo((props: ICertificationProps) => {
  const { title, organization, date, description } = props;
  return (
    <div className="certification-item">
      <div className="row">
        <h3 className="title">{title}</h3>
        <span className="period">{date}</span>
      </div>
      <Badge className="organization" variant="secondary">
        {organization}
      </Badge>
      {description}
      <Separator className="my-4" />
    </div>
  );
});

Certification.displayName = 'Certification';

export default Certification;
