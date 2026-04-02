import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { YOLO_STREAM } from "../constants/chat";
import { YoloStreamPayload } from "../types/chat";

type UseYoloCameraStreamOptions = {
  onPayload?: (payload: YoloStreamPayload) => void;
};

function parseYoloPayload(rawData: unknown): YoloStreamPayload | null {
  if (typeof rawData !== "string") {
    return null;
  }

  try {
    const parsed = JSON.parse(rawData) as YoloStreamPayload;

    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
}

export function useYoloCameraStream(options: UseYoloCameraStreamOptions = {}) {
  const { onPayload } = options;
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const captureLockRef = useRef(false);
  const awaitingFrameRef = useRef(false);

  const [processedFrameUri, setProcessedFrameUri] = useState<string | null>(
    null,
  );
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [streamStatus, setStreamStatus] = useState(
    "Esperando permisos de camara...",
  );
  const [lastWsClose, setLastWsClose] = useState("-");
  const [connectionRevision, setConnectionRevision] = useState(0);

  useEffect(() => {
    if (permission?.granted) {
      setStreamStatus("Conectando al backend YOLO...");
      return;
    }

    if (permission?.canAskAgain === false) {
      setStreamStatus("Permiso de camara bloqueado");
    }
  }, [permission]);

  useEffect(() => {
    if (!permission?.granted) {
      return;
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    const socket = new WebSocket(YOLO_STREAM.wsUrl);
    wsRef.current = socket;

    socket.onopen = () => {
      setIsSocketConnected(true);
      setStreamStatus("Streaming activo");
      setLastWsClose("-");
    };

    socket.onmessage = (event) => {
      const payload = parseYoloPayload(event.data);

      if (!payload) {
        awaitingFrameRef.current = false;
        setStreamStatus("Respuesta no valida del backend");
        return;
      }

      if (payload.frame) {
        setProcessedFrameUri(`data:image/jpeg;base64,${payload.frame}`);
      }

      if (onPayload) {
        onPayload(payload);
      }

      awaitingFrameRef.current = false;
      setStreamStatus("Streaming activo");
    };

    socket.onerror = () => {
      awaitingFrameRef.current = false;
      setStreamStatus("Error en WebSocket");
    };

    socket.onclose = (event) => {
      awaitingFrameRef.current = false;
      setIsSocketConnected(false);
      setLastWsClose(`${event.code} - ${event.reason || "sin motivo"}`);
      setStreamStatus("WebSocket desconectado");

      reconnectTimeoutRef.current = setTimeout(() => {
        setConnectionRevision((current) => current + 1);
      }, YOLO_STREAM.reconnectDelayMs);
    };

    return () => {
      socket.close();
      wsRef.current = null;
      setIsSocketConnected(false);

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [permission?.granted, connectionRevision]);

  useEffect(() => {
    if (!permission?.granted || !isSocketConnected) {
      return;
    }

    const interval = setInterval(async () => {
      const socket = wsRef.current;

      if (
        !cameraRef.current ||
        !socket ||
        socket.readyState !== WebSocket.OPEN ||
        captureLockRef.current ||
        awaitingFrameRef.current
      ) {
        return;
      }

      captureLockRef.current = true;

      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: YOLO_STREAM.captureQuality,
          skipProcessing: true,
        });

        if (photo.base64) {
          awaitingFrameRef.current = true;
          socket.send(photo.base64);
          setStreamStatus("Enviando frame al backend...");
        }
      } catch {
        awaitingFrameRef.current = false;
        setStreamStatus("No se pudo capturar frame");
      } finally {
        captureLockRef.current = false;
      }
    }, YOLO_STREAM.frameIntervalMs);

    return () => clearInterval(interval);
  }, [isSocketConnected, permission?.granted]);

  const refreshConnection = () => {
    if (!permission?.granted) {
      requestPermission();
      return;
    }

    setProcessedFrameUri(null);
    awaitingFrameRef.current = false;
    setStreamStatus("Reconectando stream...");
    setConnectionRevision((current) => current + 1);
  };

  return {
    cameraRef,
    permission,
    requestPermission,
    processedFrameUri,
    streamStatus,
    isSocketConnected,
    lastWsClose,
    refreshConnection,
  };
}
