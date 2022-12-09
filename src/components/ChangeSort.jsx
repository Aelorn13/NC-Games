import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
function ChangeSort({ queries, setQueries }) {
  const sortArray = ["Date", "Comment count", "Votes"];
  const [searchParams, setSearchParams] = useSearchParams();
  const [textButton, setTextButton] = useState("Descending");

  useEffect(() => {
    setQueries({ ...queries, order: textButton });
  }, [textButton]);

  useEffect(() => {
    setSearchParams(queries);
  }, [queries]);

  const buttonToggle = (e) => {
    if (textButton === "Descending") {
      setTextButton("Ascending");
    } else {
      setTextButton("Descending");
    }
  };
  return (
    <div className="sortButtonsInLine">
      <div className="dropdown">
        <button className="dropbtn" onClick={() => setSearchParams()}>
          Choose sort by
        </button>
        <div className="dropdown-content">
          {sortArray.map((sorting) => {
            return (
              <button
                key={sorting}
                onClick={() => setQueries({ ...queries, sort_by: sorting })}
              >
                {sorting}
              </button>
            );
          })}
        </div>
      </div>
      <button className="toggleButton" onClick={buttonToggle}>
        {textButton}
      </button>
    </div>
  );
}
export default ChangeSort;
