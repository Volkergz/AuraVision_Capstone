export const CHAT_COPY = {
  title: "AuraVision",
  subtitle: "Conexión en tiempo real",
  composerPlaceholder: "Escribe tu mensaje...",
  emptyStateTitle: "Sin mensajes aún",
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
