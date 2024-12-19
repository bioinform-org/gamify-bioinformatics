import "./Progress.scss";

type Props = {
  className?: string;
};

export const Progress: React.FC<Props> = ({ className = "" }) => {
  return (
    <div className={`progress ${className}`.trim()}>
      <h4 className="progress__title">Your progress</h4>
      <table className="progress__table">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Exercises Completed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src="./public/images/molecular-biology.svg"
                alt="Molecular biology icon"
                className="icon"
              />
              Molecular biology
            </td>
            <td>0/11</td>
          </tr>
          <tr>
            <td>
              <img
                src="./public/images/basics-of-python.svg"
                alt="Python icon"
                className="icon"
              />
              Basics of Python
            </td>
            <td>0/4</td>
          </tr>
          <tr>
            <td>
              <img
                src="./public/images/protein-structure.svg"
                alt="Protein structure icon"
                className="icon"
              />
              Protein structure
            </td>
            <td>0/1</td>
          </tr>
          <tr>
            <td>
              <img
                src="./public/images/molecular-sequence.svg"
                alt="Molecular sequence icon"
                className="icon"
              />
              Molecular sequence
            </td>
            <td>0/5</td>
          </tr>
          <tr>
            <td>
              <img
                src="./public/images/image-analysis.svg"
                alt="Image analysis icon"
                className="icon"
              />
              Image analysis
            </td>
            <td>0/10</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
