import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData,setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    type:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjkyNjU5NjFiYTZlZTUyZjdlY2ExNTU1NjhlMjA2OCIsInN1YiI6IjY2NWFlZjY4ODU1ZDc2ODRhNjQ3Y2I0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lFobsxT0dYiCwk4xrd_ON4ugC0WcD0rDEkh3BUg_TFQ'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US` ,  options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  },[])

  


  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{
        navigate(-2)
      }} />
      <iframe width='90%' height='90%' 
      src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0"
      title='trailer'
      allowFullScreen >
      </iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
