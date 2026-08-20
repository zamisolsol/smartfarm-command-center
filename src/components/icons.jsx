export function ArrowUpRight() {
  return <span className="icon-arrow" aria-hidden="true">↗</span>
}

export function MicIcon({ active = false }) {
  return (
    <svg className={active ? 'icon icon-active' : 'icon'} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="8.1" y="3" width="7.8" height="12" rx="3.9" />
      <path d="M5.5 11.1a6.5 6.5 0 0 0 13 0M12 17.6V21M8.5 21h7" />
    </svg>
  )
}

export function SendIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="m21 3-7.4 18-3.4-7.6L3 10.1 21 3Z" />
      <path d="m10.2 13.4 4.4-4.4" />
    </svg>
  )
}

export function BoltIcon() {
  return <span className="bolt" aria-hidden="true">✦</span>
}
