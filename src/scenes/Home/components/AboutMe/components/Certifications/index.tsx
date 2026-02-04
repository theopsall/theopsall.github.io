import Certification from "../../../../../../components/Certification";
import certifications from "./data";
import "./index.css";

const Certifications = () => {
  return (
    <div className="certifications-wrapper">
      <h2>Certifications</h2>
      {certifications.map((cert) => {
        // Create stable key from title and organization instead of index
        const key = `${cert.title}-${cert.organization}`.replace(/\s+/g, '-').toLowerCase();
        return (
          <Certification
            key={key}
            title={cert.title}
            organization={cert.organization}
            date={cert.date}
            description={cert.description}
          />
        );
      })}
    </div>
  );
};

export default Certifications;
