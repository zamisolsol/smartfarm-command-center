import { useEffect, useRef, useState } from 'react'
import { cameras } from './data/cameras'
import { dispatchRobotCommand, stopRobot } from './services/robotApi'
import CameraGrid from './components/CameraGrid'
import CommandPanel from './components/CommandPanel'
import RobotStatus from './components/RobotStatus'
import TelemetryStrip from './components/TelemetryStrip'
import Hero from './components/Hero'

const defaultTask = {
  id: 'VLA-READY',
  status: 'idle',
  statusLabel: '대기 중',
  message: '작물 상태와 로봇 상태를 확인했습니다. 명령을 입력해 작업을 시작하세요.',
  time: '제어실 연결됨',
}

export default function App() {
  const [selectedCamera, setSelectedCamera] = useState(cameras[1])
  const [command, setCommand] = useState('카메라 02의 작업 대상 줄기를 안전하게 절단해줘')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [robotState, setRobotState] = useState('ready')
  const [latestTask, setLatestTask] = useState(defaultTask)
  const [voiceState, setVoiceState] = useState('idle')
  const recognitionRef = useRef(null)

  useEffect(() => () => recognitionRef.current?.stop(), [])

  async function handleSubmit(event) {
    event.preventDefault()
    if (!command.trim() || isSubmitting) return

    setIsSubmitting(true)
    setRobotState('working')
    setLatestTask({
      id: 'VLA-PLAN', status: 'planning', statusLabel: '작업 계획 생성 중',
      message: '영상·명령·로봇 좌표를 통합해 안전 경로를 계산하고 있습니다.', time: now(),
    })

    try {
      const result = await dispatchRobotCommand({
        command: command.trim(), selectedCamera: selectedCamera.id, dryRun: false, requestedAt: new Date().toISOString(),
      })
      setLatestTask({
        id: result.taskId ?? 'ROBOT-QUEUED', status: 'queued', statusLabel: result.status ? '작업 대기열 등록' : '작업 요청 완료',
        message: result.message ?? '작업이 제어 서버에 전달되었습니다.', time: now(),
      })
    } catch (error) {
      setRobotState('ready')
      setLatestTask({ id: 'API-ERROR', status: 'error', statusLabel: '연결 상태를 확인하세요', message: error.message, time: now() })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleEmergencyStop() {
    try {
      await stopRobot()
      setRobotState('stopped')
      setLatestTask({
        id: 'SAFE-STOP', status: 'stopped', statusLabel: '안전 정지 완료',
        message: '긴급 정지 요청을 전달했습니다. 재시작 전 축 상태를 점검하세요.', time: now(),
      })
    } catch (error) {
      setLatestTask({ id: 'STOP-ERROR', status: 'error', statusLabel: '정지 요청 실패', message: error.message, time: now() })
    }
  }

  function handleVoiceToggle() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setLatestTask({
        id: 'VOICE-OPTIONAL', status: 'idle', statusLabel: '브라우저 미지원',
        message: '음성 인식은 지원 브라우저에서만 동작하는 선택 기능입니다.', time: now(),
      })
      return
    }

    if (voiceState === 'listening') {
      recognitionRef.current?.stop()
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'ko-KR'
    recognition.interimResults = true
    recognition.continuous = false
    recognition.onstart = () => setVoiceState('listening')
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map((result) => result[0].transcript).join('')
      setCommand(transcript)
    }
    recognition.onerror = () => setVoiceState('idle')
    recognition.onend = () => setVoiceState('idle')
    recognitionRef.current = recognition
    recognition.start()
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="FARM LAB 홈"><span className="brand-mark">♧</span><span>NIARMSTRONG</span><small>ROBOTIC CROP CARE</small></a>
        <nav aria-label="주요 메뉴"><a className="active" href="#home">홈</a><a href="#vision">비전 시스템</a><a href="#command">컨트롤룸</a><a href="#research">연구</a></nav>
        <a className="control-cta" href="#command">제어실 열기</a>
      </header>

      <Hero />

      <div className="main-grid control-section">
        <div id="vision"><CameraGrid cameras={cameras} selectedCamera={selectedCamera} onSelect={setSelectedCamera} /></div>
        <div id="command"><CommandPanel
          command={command}
          onCommandChange={setCommand}
          onSubmit={handleSubmit}
          selectedCamera={selectedCamera}
          isSubmitting={isSubmitting}
          voiceState={voiceState}
          onVoiceToggle={handleVoiceToggle}
          latestTask={latestTask}
        /></div>
      </div>

      <RobotStatus robotState={robotState} onEmergencyStop={handleEmergencyStop} />
      <div id="research"><TelemetryStrip /></div>
      <footer><span>FARM // LAB · 스마트팜 작물 자동 관리</span><span>자체 제작 6축 로봇팔 · VLA 비전 기반</span><span>PYTHON 제어 연동 준비</span></footer>
    </main>
  )
}

function now() {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date())
}
