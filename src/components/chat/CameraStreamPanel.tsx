import { Ionicons } from "@expo/vector-icons";
import { CameraView } from "expo-camera";
import { Image } from "expo-image";
import { RefObject } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CHAT_COPY } from "../../constants/chat";
import { appColors } from "../../theme/colors";

type CameraStreamPanelProps = {
  cameraRef: RefObject<CameraView | null>;
  processedFrameUri: string | null;
  streamStatus: string;
  isSocketConnected: boolean;
  lastWsClose: string;
  hasPermission: boolean;
  onRequestPermission: () => void;
  onRefresh: () => void;
};

export function CameraStreamPanel({
  cameraRef,
  processedFrameUri,
  streamStatus,
  isSocketConnected,
  lastWsClose,
  hasPermission,
  onRequestPermission,
  onRefresh,
}: CameraStreamPanelProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.topBar}>
        <View style={styles.topTitleBlock}>
          <Text style={styles.pageTitle}>AuraVision Live</Text>
          <Text style={styles.pageSubtitle}>{CHAT_COPY.subtitle}</Text>
        </View>

        <View style={styles.topActions}>
          <View style={styles.statusPill}>
            <View
              style={[
                styles.statusDot,
                isSocketConnected && styles.statusDotLive,
              ]}
            />
            <Text style={styles.statusPillText}>
              {isSocketConnected ? "Online" : "Offline"}
            </Text>
          </View>

          <Pressable style={styles.refreshButton} onPress={onRefresh}>
            <Ionicons name="refresh" size={18} color={appColors.textInverse} />
          </Pressable>
        </View>
      </View>

      <View style={styles.cameraFrame}>
        {hasPermission ? (
          <CameraView
            style={styles.cameraImage}
            facing="back"
            pictureSize="640x480"
            ref={cameraRef}
          />
        ) : null}

        {processedFrameUri ? (
          <Image
            source={{ uri: processedFrameUri }}
            style={styles.cameraOverlayFrame}
            contentFit="cover"
            transition={120}
          />
        ) : null}

        {!hasPermission ? (
          <View style={styles.cameraFallback}>
            <Ionicons
              name="camera-outline"
              size={40}
              color={appColors.textBody}
            />
            <Text style={styles.cameraFallbackTitle}>
              {CHAT_COPY.permissionTitle}
            </Text>
            <Text style={styles.cameraFallbackText}>
              {CHAT_COPY.permissionText}
            </Text>
            <Pressable
              style={styles.permissionButton}
              onPress={onRequestPermission}
            >
              <Text style={styles.permissionButtonText}>Dar permiso</Text>
            </Pressable>
          </View>
        ) : null}

        {hasPermission && !isSocketConnected ? (
          <View style={styles.connectionFallback}>
            <Ionicons
              name="cloud-offline-outline"
              size={36}
              color={appColors.textBody}
            />
            <Text style={styles.cameraFallbackTitle}>
              {CHAT_COPY.cameraErrorTitle}
            </Text>
            <Text style={styles.cameraFallbackText}>
              {CHAT_COPY.cameraErrorText}
            </Text>
            <Text style={styles.connectionState}>
              Ultimo cierre WS: {lastWsClose}
            </Text>
          </View>
        ) : null}

        <View style={styles.cameraOverlay}>
          <View style={styles.overlayBadge}>
            <Ionicons name="videocam" size={14} color={appColors.textStrong} />
            <Text style={styles.overlayBadgeText}>Live</Text>
          </View>

          <View style={styles.overlayInfoCard}>
            <Text style={styles.overlayLabel}>Estado</Text>
            <Text style={styles.overlayValue}>{streamStatus}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    flex: 1.8,
    borderRadius: 22,
    backgroundColor: appColors.surfaceCard,
    borderWidth: 1,
    borderColor: appColors.chatSurfaceBorder,
    padding: 14,
    gap: 14,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  topTitleBlock: {
    flexShrink: 1,
    minWidth: 0,
  },
  pageTitle: {
    color: appColors.textStrong,
    fontFamily: "Sora_700Bold",
    fontSize: 24,
  },
  pageSubtitle: {
    color: appColors.textBody,
    fontFamily: "Sora_400Regular",
    fontSize: 13,
    marginTop: 4,
  },
  topActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: appColors.chipBackground,
    borderWidth: 1,
    borderColor: appColors.chipBorder,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: appColors.textBody,
  },
  statusDotLive: {
    backgroundColor: appColors.accent,
  },
  statusPillText: {
    color: appColors.textStrong,
    fontFamily: "Sora_600SemiBold",
    fontSize: 12,
  },
  refreshButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: appColors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraFrame: {
    flex: 1,
    minHeight: 360,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: appColors.surfaceSoft,
    position: "relative",
  },
  cameraImage: {
    width: "100%",
    height: "100%",
    backgroundColor: appColors.surfaceSoft,
  },
  cameraOverlayFrame: {
    position: "absolute",
    inset: 0,
    backgroundColor: "transparent",
  },
  cameraFallback: {
    position: "absolute",
    inset: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 20,
    backgroundColor: appColors.chatOverlay,
  },
  connectionFallback: {
    position: "absolute",
    inset: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 20,
    backgroundColor: appColors.chatOverlay,
  },
  cameraFallbackTitle: {
    color: appColors.textStrong,
    fontFamily: "Sora_600SemiBold",
    fontSize: 15,
    textAlign: "center",
  },
  cameraFallbackText: {
    color: appColors.textBody,
    fontFamily: "Sora_400Regular",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
  permissionButton: {
    marginTop: 8,
    borderRadius: 999,
    backgroundColor: appColors.accent,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  permissionButtonText: {
    color: appColors.textInverse,
    fontFamily: "Sora_600SemiBold",
    fontSize: 12,
  },
  connectionState: {
    color: appColors.textBody,
    fontFamily: "Sora_400Regular",
    fontSize: 11,
  },
  cameraOverlay: {
    position: "absolute",
    left: 14,
    right: 14,
    top: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  overlayBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: appColors.chatOverlay,
    borderWidth: 1,
    borderColor: appColors.chipBorder,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  overlayBadgeText: {
    color: appColors.textStrong,
    fontFamily: "Sora_600SemiBold",
    fontSize: 12,
  },
  overlayInfoCard: {
    maxWidth: 260,
    backgroundColor: appColors.surfaceCard,
    borderWidth: 1,
    borderColor: appColors.chatSurfaceBorder,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  overlayLabel: {
    color: appColors.textBody,
    fontFamily: "Sora_400Regular",
    fontSize: 11,
    marginBottom: 4,
  },
  overlayValue: {
    color: appColors.textStrong,
    fontFamily: "Sora_600SemiBold",
    fontSize: 13,
    lineHeight: 18,
  },
});
