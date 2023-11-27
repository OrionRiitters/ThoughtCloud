import React, { useEffect, useState } from "react"
import { useRouterDispatch } from '../../context/RouterContext'

import './signin.scss'

export default function SignIn() {
  const routerDispatch = useRouterDispatch()
  const [micStream, setMicStream] = useState<MediaStream|null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [audioSource, setAudioSource] = useState<MediaStreamAudioSourceNode|null>(null)
  const [audioContext, setAudioContext] = useState(new window.AudioContext())

  useEffect(() => {
    (async () => {
      const mediaDevices = navigator.mediaDevices
      const micStream = await mediaDevices.getUserMedia({ audio: true })
      const audioSource = audioContext.createMediaStreamSource(micStream)
      setAudioSource(audioSource)

      //const playStream = new MediaStream()
      //const audioSource = audioContext.createMediaStreamSource(stream)
      // if (mediaDevices) {
      //   setMediaRecorder(new MediaRecorder(micStream))
      // }



      //track.connect(audioContext.destination);
    })()
  }, [])

  useEffect(() => {
    if (isRecording) {
      audioSource?.connect(audioContext.destination)
    }
    else {
     audioSource?.disconnect(audioContext.destination)
    }
  }, [isRecording])

  // useEffect(() => {
  //   if (mediaRecorder) {
  //     mediaRecorder.addEventListener('dataavailable', ({ data }) => {
  //       console.log(data.type)
  //       if (isRecording) {
  //         return data
  //       }
  //       else {
  //         return new Blob()
  //       }
  //     });
  //     mediaRecorder.start();
  //   }
  // }, [mediaRecorder])


    return (
      <React.Fragment>
        <div>
          <h1>Login</h1>
          <button onClick={ () => {
            routerDispatch!({ type: 'go', path: '/home' }) }
            }>Go Home!
          </button>
          <button onClick={() => {

          }}>
            Play/Pause
          </button>
          <button className={`recording-button ${isRecording ? 'recording' : ''}`} onClick={() => {
            setIsRecording(!isRecording)
          }}>
            Record</button>
        </div>
      </React.Fragment>
    )
  }