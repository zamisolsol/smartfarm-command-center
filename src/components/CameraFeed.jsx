function CameraScene({ accent, selected }) {
  const targetStroke = selected ? '#f7ff68' : '#ffffff'
  const fruit = accent === 'strawberry' ? '#ee4056' : accent === 'amber' ? '#f1b54f' : '#de3f58'
  const leaf = accent === 'blue' ? '#6f9d82' : '#668c4e'

  return (
    <svg className="camera-scene" viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`sky-${accent}`} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor={accent === 'blue' ? '#335045' : '#476343'} />
          <stop offset=".55" stopColor="#17312a" />
          <stop offset="1" stopColor="#0d201b" />
        </linearGradient>
        <filter id={`soft-${accent}`}><feGaussianBlur stdDeviation="11" /></filter>
      </defs>
      <rect width="600" height="340" fill={`url(#sky-${accent})`} />
      <g opacity=".35" filter={`url(#soft-${accent})`}>
        <circle cx="72" cy="58" r="67" fill="#a1c36d" />
        <circle cx="533" cy="46" r="86" fill="#76a466" />
        <circle cx="405" cy="290" r="105" fill="#5e8e49" />
      </g>
      <g className="scene-rows" opacity=".85">
        <path d="M-15 315 C94 222, 142 257, 242 168 S428 129, 620 38" stroke="#2e573b" strokeWidth="27" fill="none" />
        <path d="M7 311 C125 245, 211 181, 368 117 S490 76, 607 25" stroke="#375c3a" strokeWidth="9" fill="none" />
        <path d="M-4 329 C113 272, 243 244, 350 170 S490 117, 610 61" stroke="#8ba75f" strokeWidth="3" fill="none" opacity=".8" />
      </g>
      <g className="leaves" fill={leaf}>
        <ellipse cx="123" cy="111" rx="56" ry="23" transform="rotate(-37 123 111)" />
        <ellipse cx="202" cy="202" rx="62" ry="24" transform="rotate(26 202 202)" />
        <ellipse cx="395" cy="103" rx="74" ry="24" transform="rotate(-30 395 103)" />
        <ellipse cx="478" cy="234" rx="70" ry="25" transform="rotate(28 478 234)" />
        <ellipse cx="536" cy="134" rx="48" ry="19" transform="rotate(-47 536 134)" />
      </g>
      <g className="fruit-group">
        <path d="M322 77c-9 12-23 14-36 7 6 17 22 23 36 17 14 6 30 0 36-17-13 7-27 5-36-7Z" fill="#b3c95f" />
        <path d="M286 100c0-23 17-34 36-34s36 11 36 34c0 32-25 54-36 54s-36-22-36-54Z" fill={fruit} />
        <path d="M298 95c8-11 29-17 45-6" stroke="#ffc6cc" strokeWidth="3" opacity=".6" fill="none" />
        <circle cx="309" cy="119" r="2.3" fill="#ffd4a4" /><circle cx="331" cy="125" r="2.3" fill="#ffd4a4" />
        <circle cx="321" cy="139" r="2.3" fill="#ffd4a4" /><circle cx="342" cy="111" r="2.3" fill="#ffd4a4" />
      </g>
      <rect x="261" y="51" width="121" height="128" rx="3" fill="none" stroke={targetStroke} strokeWidth="2" strokeDasharray={selected ? '0' : '6 5'} />
      <path d="M261 74h20M261 51v20M382 74h-20M382 51v20M261 156h20M261 179v-20M382 156h-20M382 179v-20" stroke={targetStroke} strokeWidth="4" fill="none" />
      <g opacity=".82">
        <rect x="18" y="17" width="72" height="22" rx="2" fill="#0d1612" fillOpacity=".65" />
        <path d="M28 28h32" stroke="#d7e7c9" strokeWidth="2" /><circle cx="72" cy="28" r="4" fill="#8fec7e" />
      </g>
      <path d="M22 302h126M22 314h81" stroke="#e6edd6" strokeWidth="2" opacity=".46" />
    </svg>
  )
}

export default function CameraFeed({ camera, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={`camera-feed ${isSelected ? 'is-selected' : ''}`}
      onClick={() => onSelect(camera)}
      aria-pressed={isSelected}
    >
      {camera.source ? (
        <video className="camera-video" src={camera.source} autoPlay muted loop playsInline />
      ) : (
        <CameraScene accent={camera.accent} selected={isSelected} />
      )}
      <span className="camera-vignette" />
      <span className="camera-header">
        <span className="stream-live"><i /> 실시간</span>
        <span>{camera.shortLabel}</span>
      </span>
      <span className="camera-footer">
        <span><strong>{camera.zone}</strong> · {camera.label}</span>
        <span>{camera.confidence}%</span>
      </span>
      <span className="detection-tag">{camera.detection}</span>
    </button>
  )
}
