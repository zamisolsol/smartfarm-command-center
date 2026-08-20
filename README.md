# AGRO / CUT — Smart Farm Command Center

자체 제작 6축 로봇암으로 딸기 줄기 절단 작업을 시연하기 위한 React 운영 콘솔입니다. 현재는 고급 데모 UI로 동작하며, 실제 카메라와 Python 제어 프로그램은 설정만 연결하면 됩니다.

## 실행

```bash
npm install
npm run dev
```

실행 후 터미널에 표시되는 로컬 주소를 엽니다.

## 실제 영상 연결

4개 영상 채널은 각각 `src/data/cameras.js`에 있습니다. 각 카메라의 `source`를 영상 파일 또는 스트림 주소로 바꾸세요.

```js
source: '/media/cam-01.mp4'
```

MP4 파일은 `public/media/`에 넣으면 위 경로로 불러올 수 있습니다. HLS / WebRTC처럼 별도 플레이어가 필요한 스트림은 `src/components/CameraFeed.jsx`의 `<video>` 구간만 교체하면 됩니다.

## Python 제어 API 연결

1. `.env.example`를 `.env`로 복사합니다.
2. `VITE_CONTROL_API_BASE`에 Python 서버 주소를 입력합니다.
3. `src/services/robotApi.js`의 `dispatchRobotCommand()`만 실제 Python API 형식에 맞춰 매핑합니다.

UI가 보내는 기본 명령 데이터는 아래와 같습니다.

```json
{
  "command": "카메라 02의 작업 대상 줄기를 안전하게 절단해줘",
  "selectedCamera": "cam-02",
  "dryRun": false,
  "requestedAt": "2026-08-20T..."
}
```

기본 엔드포인트는 `POST /api/v1/robot/command`, 긴급 정지는 `POST /api/v1/robot/stop`입니다. API 주소를 비워두면 네트워크 호출 없이 데모 모드로 작동합니다.

## 포함 기능

- 4개 카메라 채널 및 선택 영상의 작업 컨텍스트 반영
- 자연어 프롬프트 입력 → 작업 요청 → 상태 영수증 흐름
- 선택 기능으로 Web Speech API 기반 한국어 음성 입력
- 긴급 정지 UI와 VLA/로봇 상태 표시
- 실제 영상 소스 및 Python API를 서로 독립적으로 교체할 수 있는 파일 분리 구조
