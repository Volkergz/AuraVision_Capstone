export const CHAT_COPY = {
  title: "AuraVision",
  subtitle: "Vista en tiempo real del lente y chat conectado al backend.",
  composerPlaceholder: "Escribe tu mensaje...",
  emptyStateTitle: "Sin mensajes aún",
  emptyStateText: "Empieza una conversación y el backend responderá aquí.",
  permissionTitle: "Habilita la camara",
  permissionText:
    "La app necesita acceso a la camara para enviar frames al backend YOLO.",
  cameraErrorTitle: "Streaming no disponible",
  cameraErrorText:
    "Revisa la URL WebSocket del backend YOLO y la conectividad de red.",
} as const;

export const YOLO_STREAM = {
  wsUrl: "ws://192.168.1.89:8000/ws/video",
  frameIntervalMs: 1200,
  reconnectDelayMs: 1800,
  captureQuality: 0.2,
  pictureSize: "640x480",
} as const;

export const CHAT_BACKEND = {
  apiUrl: "",
  requestTimeoutMs: 15000,
} as const;
