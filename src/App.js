import React from "react";
import All from "./Components/All";
import MyFaves from "./Components/MyFaves";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function App() {
  const [techSelected, setTechSelected] = React.useState("");
  const [showFaves, setShowFaves] = React.useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTechSelected(e.target.value);
    localStorage.setItem("techSelected", e.target.value);
  };

  React.useEffect(() => {
    let tec = localStorage.getItem("techSelected");
    setTechSelected(tec);
  }, []);

  return (
    <div>
      <div
        style={{
          margin: "0 0 4.375rem",
          padding: "2.75rem 0 2.625rem 9.375rem",
          boxShadow: "0 1px 4px 0 rgba(0, 21, 41, 0.12)",
          backgroundImage:
            "linear-gradient(to bottom, #ececec -32%, #fff 124%)",
        }}
      >
        <span
          style={{
            width: "13rem",
            height: "1.75rem",
            objectFit: "contain",
            fontFamily: "Baskerville",
            fontSize: "1.75rem",
            fontWeight: "normal",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1",
            letterSpacing: "normal",
            color: "#3b3b3b",
          }}
        >
          HACKER NEWS
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          onClick={() => {
            setShowFaves(false);
          }}
          style={{
            width: "6.125rem",
            height: "1.938rem",
            padding: "0.188rem 1rem 0 1.063rem",
            borderRadius: "2px",
            border: "solid 1px #d6d6d6",
          }}
        >
          <span
            style={{
              width: "1.188rem",
              height: "1.75rem",
              fontFamily: "Roboto",
              fontSize: "1rem",
              fontWeight: "500",
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: "1.75",
              letterSpacing: "normal",
              textAlign: "center",
              color: "#606060",
            }}
          >
            All
          </span>
        </div>

        <div
          onClick={() => {
            setShowFaves(true);
          }}
          style={{
            width: "6.125rem",
            height: "1.938rem",
            padding: "0.188rem 1rem 0 1.063rem",
            borderRadius: "2px",
            border: "solid 1px #d6d6d6",
          }}
        >
          <span
            style={{
              width: "4.063rem",
              height: "1.75rem",
              fontFamily: "Roboto",
              fontSize: "1rem",
              fontWeight: "500",
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: "1.75",
              letterSpacing: "normal",
              textAlign: "center",
              color: "#606060",
            }}
          >
            My Faves
          </span>
        </div>
      </div>

      {!showFaves && (
        <>
        <div style={{width:"17rem", margin: "3.938rem 7.125rem 2.63rem 9.375rem",}}>
        <FormControl fullWidth>
          <InputLabel id="select-news-label">Select your news</InputLabel>
          <Select
            labelId="select-news-label"
            id="select-news"
            value={techSelected}
            label="Select your news"
            onChange={handleChange}
          >
            <MenuItem value="angular">Angular</MenuItem>
            <MenuItem value="react">React</MenuItem>
            <MenuItem value="vue">Vue</MenuItem>
          </Select>
        </FormControl>

        </div>
        </>
      )}

      <div style={{padding:"0 9.375rem 0 9.375rem", margin:"0 0 5rem 0"}}>

      {techSelected.length > 0 && !showFaves && (
        <All techSelected={techSelected} />
      )}
      {showFaves && <MyFaves />}

      </div>

    </div>
  );
}

export default App;