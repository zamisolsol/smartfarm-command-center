import { ArrowUpRight } from './icons'

const highlights = [
  ['6', '자유도 로봇팔'],
  ['48N', '줄기 절단 전단력'],
  ['0.1°', '관절 위치 정밀도'],
  ['75%', '작업 인식 성공률'],
]

export default function Hero() {
  return (
    <section className="hero-section" id="home" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="hero-kicker">HANIUM DREAMUP&nbsp; · &nbsp;2026</p>
        <h1 id="hero-heading">딸기를 위한<br />가장 정밀한 손.</h1>
        <p className="hero-description">자체 제작 6축 로봇팔과 VLA 비전 시스템으로 딸기의 상태를 이해하고,<br />필요한 순간에 정밀한 줄기 절단 작업을 수행합니다.</p>
        <a className="hero-start" href="#command">지금 시작하기 <ArrowUpRight /></a>
      </div>

      <div className="hero-visual" aria-label="6축 로봇팔 개념도">
        <div className="hero-arm-watermark">ARM</div>
        <svg viewBox="0 0 730 360" className="hero-arm" aria-hidden="true">
          <path d="M231 306V237L405 175V80L573 35" fill="none" stroke="#141713" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M573 35l44-25M573 35l42 25" fill="none" stroke="#ff5549" strokeWidth="9" strokeLinecap="round" />
          <circle cx="231" cy="306" r="29" fill="#fff" stroke="#141713" strokeWidth="8" />
          <circle cx="405" cy="175" r="14" fill="#141713" />
          <circle cx="405" cy="80" r="14" fill="#141713" />
          <path d="M185 218h47v88" fill="none" stroke="#141713" strokeWidth="7" strokeLinecap="round" />
        </svg>
        <div className="visual-actions"><a href="#vision">↗ 라이브 모니터링</a><span>6축 로봇팔 · 줄기 절단 시스템</span></div>
      </div>

      <div className="hero-metrics">
        {highlights.map(([value, label]) => <div className="hero-metric" key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </div>
    </section>
  )
}
