import React from "react";
import Pagination from "@mui/material/Pagination";

const All = (props) => {
  const refTotalPages = React.useRef();
  const [totalPages, setTotalPages] = React.useState();
  const refActualPage = React.useRef();
  const [actualPage, setActualPage] = React.useState(1);
  // const refCreatedAt = React.useRef();
  // const [createdAt, setCreatedAt] = React.useState();
  // const refStoryTitle = React.useRef();
  // const [storyTitle, setStoryTitle] = React.useState();
  // const refStoryUrl = React.useRef();
  // const [storyUrl, setStoryUrl] = React.useState();
  const refNews = React.useRef();
  const [news, setNews] = React.useState();
  const refSavedNews = React.useRef([]);

  function peticion(tech, page) {
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?query=${tech}&page=${page}&hitsPerPage=8`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.hits, "hits");
        refTotalPages.current = data.nbPages;
        setTotalPages(refTotalPages.current);

        refNews.current = data.hits;
        setNews(refNews.current);
      });
  }

  function saveNewsStorage(createdAt, storyTitle, storyUrl, commentText) {
    let indexSelected = undefined;

    let existe = refSavedNews.current.find((el, index) => {
      indexSelected = index;
      return el.story_title == storyTitle && el.comment_text == commentText;
    });

    if (existe == undefined) {
      refSavedNews.current.push({
        created_at: createdAt,
        story_title: storyTitle,
        story_url: storyUrl,
        comment_text: commentText,
      });
      localStorage.setItem(
        "newsSelected",
        JSON.stringify(refSavedNews.current)
      );
      // console.log(refSavedNews.current, "guardados")
    } else {
      // console.log(indexSelected, "indice seleccionado")
      refSavedNews.current = refSavedNews.current.filter(
        (elem, index) => index != indexSelected
      );
      localStorage.setItem(
        "newsSelected",
        JSON.stringify(refSavedNews.current)
      );
      // console.log(refSavedNews.current, "guardados")
    }
  }

  React.useEffect(() => {
    peticion(props.techSelected, 1);
    refActualPage.current = 1;
    setActualPage(refActualPage.current);
  }, [props.techSelected]);

  return (
    <div>
      {news?.map((notice, index) => {
        return (
          <div
            key={index}
            style={{
              width: "34.375rem",
              height: "auto",
              margin: "2.375rem 2.5rem 1.875rem 9.375rem",
              padding: "0 0 0 1.625rem",
              opacity: "0.8",
              borderRadius: "6px",
              border: "solid 1px #979797",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() => {
              saveNewsStorage(
                notice.created_at,
                notice.story_title,
                notice.story_url,
                notice.comment_text
              );
            }}
          >
            <div style={{wordBreak:"break-word"}}>
              <p>{notice.created_at}</p>
              <p>{notice.story_title}</p>
              <p>{notice.story_url}</p>
            </div>
            <div
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

      {/* {props.techSelected}
    {totalPages} */}
      <Pagination
        variant="outlined"
        shape="rounded"
        count={totalPages}
        page={actualPage}
        onChange={(e, value) => {
          setActualPage(value);
          peticion(props.techSelected, value);
          // console.log(value, "cambio")
        }}
      />
    </div>
  );
};

export default All;
