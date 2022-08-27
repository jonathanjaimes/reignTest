import React from "react";
import Pagination from "@mui/material/Pagination";

const MyFaves = (props) => {
  const refActualFaves = React.useRef([]);
  const [newsFaves, setNewsFaves] = React.useState([]);
  const [maxPage, setMaxPage] = React.useState();
  const refActualPage = React.useRef();
  const [actualPage, setActualPage] = React.useState(1);
  const [infLim, setInfLim] = React.useState(0);
  const [supLim, setSupLim] = React.useState(2);

  function deleteNewsStorage(ind) {
    refActualFaves.current = newsFaves.filter((elem, index) => {
      return index != ind;
    });
    setNewsFaves(refActualFaves.current);
    localStorage.setItem(
      "newsSelected",
      JSON.stringify(refActualFaves.current)
    );
    // console.log(refActualFaves.current, "actuales guardados")
  }

  React.useEffect(() => {
    // console.log("entra");

    setNewsFaves(JSON.parse(localStorage.getItem("newsSelected")));

    setMaxPage(Math.ceil(newsFaves.length / 2));
    // console.log(newsFaves.length, "cantidad items");
    // console.log(Math.ceil(newsFaves.length / 2), "division");
  }, []);

  React.useEffect(() => {
    setMaxPage(Math.ceil(newsFaves.length / 2));
  }, [newsFaves]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "red",
          justifyContent: "space-between",
          padding: "0 5% 0 5%",
        }}
      >
        {newsFaves?.slice(infLim, supLim).map((notice, index) => {
          return (
            <div
              key={index}
              style={{
                width: "90%",
                maxWidth:"30.375rem",
                minHeight: "5.625rem",
                height: "auto",
                margin: "2.375rem 1rem 1.875rem 1rem",
                padding: "0 0 0 1.625rem",
                opacity: "0.8",
                borderRadius: "6px",
                border: "solid 1px #979797",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "space-between",
              }}
              
            >
              <div style={{wordBreak:"break-word", width:"30.125rem"}}>
                <p>{notice.created_at}</p>
                <p>{notice.story_title}</p>
              </div>
              <div
              onClick={() => {
                deleteNewsStorage(index);
              }}
                style={{
                  width: "4.25rem",

                  margin: "0 0 0 1rem",
                  padding: "2.188rem 1.375rem 2.063rem",
                  opacity: "0.06",
                  borderRadius: "6px",
                  border: "solid 1px #606060",
                  backgroundColor: "#606060",
                }}
              >
                cuadrito
              </div>
            </div>
          );
        })}
      </div>
      {newsFaves.length > 0 && (
        <Pagination
          variant="outlined"
          shape="rounded"
          count={maxPage}
          page={actualPage}
          onChange={(e, value) => {
            window.scrollTo(0, 0)
            setActualPage(value);
            setInfLim((value - 1) * 2);
            setSupLim((value + 1) * 2 - 2);
            // console.log((value -1)*2, ((value+1)*2)-2)
            // console.log(newsFaves.slice((value -1)*2, ((value+1)*2)-2))
          }}
        />
      )}
    </>
  );
};

export default MyFaves;
