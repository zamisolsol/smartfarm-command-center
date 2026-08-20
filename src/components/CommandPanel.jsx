import { MicIcon, SendIcon } from './icons'

export default function CommandPanel({
  command,
  onCommandChange,
  onSubmit,
  selectedCamera,
  isSubmitting,
  voiceState,
  onVoiceToggle,
  latestTask,
}) {
  return (
    <section className="command-panel" aria-labelledby="command-heading">
      <div className="command-topline">
        <span className="eyebrow">02 / VLA 작업 제어</span>
        <span className="secure-mark">제어 준비 완료 <i /></span>
      </div>

      <h1 id="command-heading">로봇팔에게<br /><em>작업을 요청하세요.</em></h1>
      <p className="command-intro">자연어 명령과 선택한 영상 정보를 기반으로 작업 계획을 생성합니다.</p>

      <div className="active-source">
        <span className="source-kicker">현재 선택 영상</span>
        <span className="source-value"><i /> {selectedCamera.shortLabel} / {selectedCamera.zone}</span>
        <span className="source-caption">{selectedCamera.detection} · {selectedCamera.confidence}%</span>
      </div>

      <form className="command-form" onSubmit={onSubmit}>
        <label htmlFor="robot-command">작업 명령</label>
        <div className="textarea-shell">
          <textarea
            id="robot-command"
            value={command}
            onChange={(event) => onCommandChange(event.target.value)}
            placeholder="예: 카메라 02의 익은 딸기 줄기를 절단해줘"
            rows="4"
          />
          <button
            className={`voice-button ${voiceState === 'listening' ? 'is-listening' : ''}`}
            type="button"
            onClick={onVoiceToggle}
            title="음성 인식 (선택 기능)"
            aria-label="음성 명령 입력"
          >
            <MicIcon active={voiceState === 'listening'} />
          </button>
        </div>
        <div className="command-actions">
          <span>{voiceState === 'listening' ? '음성을 듣고 있습니다…' : '음성 입력 · 선택 기능'}</span>
          <button className="run-button" type="submit" disabled={!command.trim() || isSubmitting}>
            {isSubmitting ? '작업 계획 생성 중' : '작업 시작'} <SendIcon />
          </button>
        </div>
      </form>

      <TaskReceipt task={latestTask} />
    </section>
  )
}

function TaskReceipt({ task }) {
  return (
    <div className={`task-receipt ${task.status}`} aria-live="polite">
      <div className="receipt-top"><span>최근 작업 요청</span><b>{task.statusLabel}</b></div>
      <p>{task.message}</p>
      <div className="receipt-meta">
        <span>{task.id}</span><span>{task.time}</span>
      </div>
    </div>
  )
}
