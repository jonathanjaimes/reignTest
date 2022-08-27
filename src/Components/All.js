import React from "react";
import Pagination from "@mui/material/Pagination";

const All = (props) => {
  const refTotalPages = React.useRef();
  const [totalPages, setTotalPages] = React.useState();
  const refActualPage = React.useRef();
  const [actualPage, setActualPage] = React.useState(1);
  const refNews = React.useRef();
  const [news, setNews] = React.useState();
  const refSavedNews = React.useRef([]);
  const refSaved = React.useRef([]);

  function peticion(tech, page) {
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?query=${tech}&page=${page}&hitsPerPage=8`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.hits, "hits");
        refTotalPages.current = data.nbPages;
        setTotalPages(refTotalPages.current);

        refNews.current = data.hits;
        setNews(refNews.current);
      });
  }

  function saveNewsStorage(createdAt, storyTitle, storyUrl, commentText) {
    let indexSelected = undefined;

    let existe = refSaved.current.find((el, index) => {
      indexSelected = index;
      return el.story_title == storyTitle && el.comment_text == commentText;
    });

    if (existe == undefined) {
      refSaved.current.push({
        created_at: createdAt,
        story_title: storyTitle,
        story_url: storyUrl,
        comment_text: commentText,
      });
      localStorage.setItem(
        "newsSelected",
        JSON.stringify(refSaved.current)
      );
      console.log(refSaved.current, "guardados")
    } else {
      // console.log(indexSelected, "indice seleccionado")
      refSaved.current = refSaved.current.filter(
        (elem, index) => index != indexSelected
      );
      localStorage.setItem(
        "newsSelected",
        JSON.stringify(refSaved.current)
      );
      console.log(refSaved.current, "guardados")
    }
  }

  React.useEffect(() => {
    peticion(props.techSelected, 1);
    refActualPage.current = 1;
    setActualPage(refActualPage.current);
    console.log("abro all")
    refSaved.current = JSON.parse(localStorage.getItem("newsSelected"))
    console.log(refSaved.current, "noticias guardadas actuales")
  }, [props.techSelected]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          // backgroundColor: "red",
          justifyContent: "space-between",
          padding: "0 5% 0 5%",
        }}
      >
        {news?.map((notice, index) => {
          return (
            <div
              key={index}
              style={{
                width: "90%",
                maxWidth: "30.375rem",
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
              <div
                style={{
                  wordBreak: "break-word",
                  width: "30.125rem",
                  padding: "1.5rem 0",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "Roboto",
                    fontSize: "11px",
                    fontWeight: "normal",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    letterSpacing: "normal",
                    color: "#767676",
                  }}
                >
                  {notice.created_at}
                </span>
                <span
                  style={{
                    display: "block",
                    padding: "0.7rem 0 0 0",
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: "500",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "1.43",
                    letterSpacing: "0.25px",
                    color: "#6b6b6b",
                  }}
                >
                  {notice.story_title || notice.title}
                </span>
              </div>
              <div
              onClick={() => {
                saveNewsStorage(
                  notice.created_at,
                  notice.story_title || notice.title,
                  notice.story_url,
                  notice.comment_text
                );
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
      <Pagination
        variant="outlined"
        shape="rounded"
        count={totalPages}
        page={actualPage}
        onChange={(e, value) => {
          window.scrollTo(0, 0)
          setActualPage(value);
          peticion(props.techSelected, value);
          // console.log(value, "cambio")
        }}
      />
    </>
  );
};

export default All;
