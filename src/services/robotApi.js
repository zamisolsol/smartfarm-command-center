const apiBase = import.meta.env.VITE_CONTROL_API_BASE?.replace(/\/$/, '') ?? ''
const commandPath = import.meta.env.VITE_ROBOT_COMMAND_PATH ?? '/api/v1/robot/command'

/**
 * Only this function needs to be mapped to the Python control program later.
 * Expected payload: { command, selectedCamera, dryRun, requestedAt }
 */
export async function dispatchRobotCommand(payload) {
  if (!apiBase) {
    await wait(700)
    return {
      mode: 'demo',
      taskId: `CUT-${String(Date.now()).slice(-6)}`,
      status: 'queued',
      message: 'VLA 작업 계획 요청이 접수되었습니다.',
    }
  }

  const response = await fetch(`${apiBase}${commandPath}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error(`Control API error (${response.status})`)
  return response.json()
}

export async function stopRobot() {
  if (!apiBase) {
    await wait(250)
    return { mode: 'demo', status: 'stopped' }
  }

  const response = await fetch(`${apiBase}/api/v1/robot/stop`, { method: 'POST' })
  if (!response.ok) throw new Error(`Stop API error (${response.status})`)
  return response.json()
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}
