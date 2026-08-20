import CameraFeed from './CameraFeed'

export default function CameraGrid({ cameras, selectedCamera, onSelect }) {
  return (
    <section className="vision-section" aria-labelledby="vision-heading">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">01 / 통합 비전 시스템</p>
          <h2 id="vision-heading">현장의 판단을,<br /><em>한눈에 확인하세요.</em></h2>
        </div>
        <div className="feed-summary"><i /> 4개 영상 연결됨</div>
      </div>
      <div className="camera-grid">
        {cameras.map((camera) => (
          <CameraFeed
            key={camera.id}
            camera={camera}
            isSelected={camera.id === selectedCamera.id}
            onSelect={onSelect}
          />
        ))}
      </div>
      <p className="camera-helper">실제 영상은 <code>src/data/cameras.js</code>의 <code>source</code> 항목에 연결합니다.</p>
    </section>
  )
}
