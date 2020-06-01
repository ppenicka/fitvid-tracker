import React, { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player'

function YoutubePlayer ({url, timeVideo, clickTimestamp}) {

  const player = useRef();

  function convertToSeconds (time) {
    const regex = /[,:;.]/;
    if(time.match(regex)===null) return Number(time);
    if(time.split(regex).length===2) {
      const seconds = Number(time.split(regex)[1]);
      const minutes = Number(time.split(regex)[0]);
      return (minutes*60+seconds)
    }
    if(time.split(regex).length===3) {
      const seconds = Number(time.split(regex)[2]);
      const minutes = Number(time.split(regex)[1]);
      const hours = Number(time.split(regex)[0]);
      return (hours*3600+minutes*60+seconds)
    }
    return undefined;
  }

  useEffect(()=>{
    if(timeVideo) {
      const timeToSec = convertToSeconds(timeVideo)
      player.current.seekTo(timeToSec, "seconds");
    }
  },[clickTimestamp])


  return (
    <div className="Youtube">
      <ReactPlayer ref={player} width="100%" url={url} controls={true}/>
    </div>
  )
}

export default YoutubePlayer;
