# ClassCheck (frontend)

Mobile-first PWA for a six-layer attendance check: face match, liveness, GPS geofence,
device binding, rotating 30-second QR, and a behaviour/risk check.
Next.js 14 (App Router), TypeScript, Tailwind CSS. No real backend yet.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
```

Camera and location need a secure context. `localhost` works. On a phone, use an HTTPS
tunnel (for example `npx localtunnel --port 3000`) or deploy a preview.

The service worker registers only in production (`npm run build && npm start`).

## Demo accounts

Password for all: `classcheck`

| Role       | Email                       | Lands on      |
|------------|-----------------------------|---------------|
| Student    | student@classcheck.test     | /attend       |
| Instructor | instructor@classcheck.test  | /instructor   |
| Admin      | admin@classcheck.test       | /admin        |

New accounts created on /login are students and go to /enroll.

## Demo flow

1. Instructor: start a session (use current location), keep the tab open.
2. Student (second tab or phone): Enrol (consent, device, 5 face samples), then Check in.
   Paste the code shown under the instructor QR if the browser cannot scan QR codes.
3. Admin: watch the feed, approve or reject items under "Needs review", export CSV.

While a session is open, simulated students check in every ~9 seconds so the live lists move.

Force a check-in outcome (browser console), or remove the key for random outcomes:

```js
localStorage.setItem('classcheck.mock.outcome', 'APPROVED'); // or 'REVIEW' or 'REJECTED'
localStorage.removeItem('classcheck.mock.outcome');
```

Reset all mock data: `localStorage.removeItem('classcheck.mock.db.v1')`.

## Swapping in the real API

All data access is in `lib/api.ts`. Keep the exported names and types, replace each body with
a `fetch` call. Throw `ApiError(message, fix)` so the UI keeps showing "what happened" and
"how to fix it". `subscribeCheckIns` can become SSE or a WebSocket.

## What is faked

- Face detection and liveness: timers (`hooks/useCaptureSimulator.ts`, `startLiveness` in `app/attend/page.tsx`).
  The camera stream is real (`getUserMedia`, front camera) but frames are never read or uploaded.
- Face templates: `placeholderTemplate()` in `app/enroll/page.tsx` sends random numbers.
- Layer verdicts, geofence maths, QR signing: `lib/api.ts`.
- QR scanning uses the browser `BarcodeDetector` where available (Chrome, Android). Others use the paste field.

## Structure

```
app/            login, enroll, attend, instructor, admin
components/     LayerLadder (signature element), CameraStage, QrScanner, ui primitives
hooks/          useCamera, useCaptureSimulator, useRotatingCode, useRequireRole
lib/api.ts      the single data module (mock)
```
