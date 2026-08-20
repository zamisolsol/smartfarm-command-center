const metrics = [
  ['비전 인식 신뢰도', '98.1', '%'],
  ['줄기 절단력', '48', 'N'],
  ['로봇팔 응답 속도', '18', 'ms'],
  ['오늘 작업 성공', '42', ' / 43'],
]

export default function TelemetryStrip() {
  return (
    <section className="telemetry-strip" aria-label="실시간 텔레메트리">
      <div className="telemetry-heading"><span>실시간</span><p>스마트팜<br />작업 현황</p></div>
      {metrics.map(([label, value, unit]) => (
        <div className="metric" key={label}>
          <p>{label}</p><strong>{value}<small>{unit}</small></strong>
          <span className="metric-line"><i /></span>
        </div>
      ))}
    </section>
  )
}
