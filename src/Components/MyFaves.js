import React from 'react'
import Pagination from '@mui/material/Pagination';

const MyFaves = (props) => {

  const refActualFaves = React.useRef([]);
  const [newsFaves, setNewsFaves] = React.useState([]);
  const [maxPage, setMaxPage] = React.useState();
  const refActualPage = React.useRef();
  const [actualPage, setActualPage] = React.useState(1);
  const [infLim, setInfLim] = React.useState(0);
  const [supLim, setSupLim] = React.useState(2)


  function deleteNewsStorage(ind){
    refActualFaves.current = newsFaves.filter((elem, index) => {
      return index != ind
    })
    setNewsFaves(refActualFaves.current)
    localStorage.setItem("newsSelected", JSON.stringify(refActualFaves.current))
    // console.log(refActualFaves.current, "actuales guardados")
  }

  React.useEffect(()=>{
    console.log("entra")

    setNewsFaves(JSON.parse(localStorage.getItem("newsSelected")))

    setMaxPage(Math.ceil(newsFaves.length/2))
    console.log(newsFaves.length, "cantidad items")
    console.log(Math.ceil(newsFaves.length/2), "division")

  }, [])

  React.useEffect(()=>{
    setMaxPage(Math.ceil(newsFaves.length/2))


  }, [newsFaves])


  return (
    <div>
      {newsFaves?.slice(infLim, supLim).map((notice, index)=>{
        return (
          <div key={index} style={{backgroundColor:"red", margin:"5px 0"}} onClick={()=>{
            deleteNewsStorage(index)
          }}>
            <p>{notice.created_at}</p>
            <p>{notice.story_title}</p>
            <p>{notice.story_url}</p>
          </div>
        )
      })}

      {newsFaves.length > 0 && <Pagination variant="outlined" shape="rounded" count={maxPage} page={actualPage} onChange={(e, value)=>{
      setActualPage(value)
      setInfLim((value -1)*2)
      setSupLim(((value+1)*2)-2)
      // console.log((value -1)*2, ((value+1)*2)-2)
      // console.log(newsFaves.slice((value -1)*2, ((value+1)*2)-2))
      
      }} /> }

      

    </div>
  )
}

export default MyFaves