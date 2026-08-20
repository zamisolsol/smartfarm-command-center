import { ArrowUpRight, BoltIcon } from './icons'

export default function RobotStatus({ robotState, onEmergencyStop }) {
  const working = robotState === 'working'
  const stopped = robotState === 'stopped'

  return (
    <section className="status-rail" aria-label="로봇 상태">
      <div className="rail-label">6축<br />로봇팔</div>
      <div className="arm-drawing" aria-hidden="true">
        <div className="arm-shadow" />
        <div className="arm-base" />
        <div className="arm-link link-one" /><div className="arm-joint joint-one" />
        <div className="arm-link link-two" /><div className="arm-joint joint-two" />
        <div className="arm-link link-three" /><div className="arm-joint joint-three" />
        <div className="arm-gripper"><span /><span /></div>
      </div>
      <div className="rail-status">
        <span className={`machine-state ${stopped ? 'stop' : working ? 'work' : ''}`}><i /> {stopped ? '안전 정지' : working ? '작업 수행 중' : '절단 준비 완료'}</span>
        <p>{stopped ? '모든 축의 명령 전송을 중지했습니다.' : working ? 'VLA 작업 계획 → 경로 생성 → 절단 수행' : '관절 잠금 해제 · 경로 점검 · 보정 완료'}</p>
      </div>
      <button className="safety-button" type="button" onClick={onEmergencyStop}>
        <span><BoltIcon /> 안전 정지</span><ArrowUpRight />
      </button>
    </section>
  )
}
