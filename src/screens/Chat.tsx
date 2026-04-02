import {
    Sora_400Regular,
    Sora_600SemiBold,
    Sora_700Bold,
    useFonts,
} from "@expo-google-fonts/sora";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
    useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraStreamPanel } from "../components/chat/CameraStreamPanel";
import { ConversationPanel } from "../components/chat/ConversationPanel";
import { useChatConversation } from "../hooks/useChatConversation";
import { useYoloCameraStream } from "../hooks/useYoloCameraStream";
import { appColors, appGradients } from "../theme/colors";

export default function ChatScreen() {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 1180;
  const isWideLayout = width >= 980;
  const maxContentWidth = isDesktop ? 1480 : 1200;
  const tabBarHeight = useBottomTabBarHeight();

  const [fontsLoaded] = useFonts({
    Sora_400Regular,
    Sora_600SemiBold,
    Sora_700Bold,
  });

  const chat = useChatConversation();
  const stream = useYoloCameraStream({
    onPayload: (payload) => {
      const objectLabels = payload.objects?.length
        ? payload.objects.map((item) => item.label).join(", ")
        : null;

      const responseText = payload.reply ?? payload.message ?? payload.text;
      const summaryText = payload.summary
        ? `Resumen: ${payload.summary}`
        : null;
      const objectsText = objectLabels ? `Objetos: ${objectLabels}` : null;

      if (responseText) {
        chat.appendAssistantMessage(responseText);
      }

      if (summaryText) {
        chat.appendAssistantMessage(summaryText);
      }

      if (objectsText) {
        chat.appendAssistantMessage(objectsText);
      }
    },
  });

  const conversationPanelHeight = isWideLayout
    ? Math.max(680, height - 40)
    : 560;

  const chatGradient: [string, string, string] = (appGradients?.chat as
    | [string, string, string]
    | undefined) ??
    (appGradients?.home as [string, string, string] | undefined) ?? [
      appColors.backgroundTop,
      appColors.backgroundMid,
      appColors.backgroundBottom,
    ];

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.page} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={chatGradient}
        locations={[0, 0.45, 1]}
        style={styles.page}
      >
        <KeyboardAvoidingView
          style={styles.page}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? tabBarHeight : 0}
        >
          <ScrollView
            style={styles.screen}
            contentContainerStyle={[
              styles.screenContent,
              {
                maxWidth: maxContentWidth,
                paddingHorizontal: isDesktop ? 24 : 16,
                paddingTop: isDesktop ? 20 : 14,
                paddingBottom: tabBarHeight + 20,
              },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            <View
              style={[
                styles.mainLayout,
                isWideLayout ? styles.mainLayoutRow : styles.mainLayoutColumn,
                {
                  minHeight: isWideLayout
                    ? Math.max(680, height - 40)
                    : undefined,
                },
              ]}
            >
              <CameraStreamPanel
                cameraRef={stream.cameraRef}
                processedFrameUri={stream.processedFrameUri}
                streamStatus={stream.streamStatus}
                isSocketConnected={stream.isSocketConnected}
                lastWsClose={stream.lastWsClose}
                hasPermission={stream.permission?.granted ?? false}
                onRequestPermission={stream.requestPermission}
                onRefresh={stream.refreshConnection}
              />

              <ConversationPanel
                panelHeight={conversationPanelHeight}
                messages={chat.messages}
                input={chat.input}
                onChangeInput={chat.setInput}
                onSend={chat.sendMessage}
                canSend={chat.canSend}
                isSending={chat.isSending}
                errorText={chat.errorText}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  screen: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
  },
  screenContent: {
    width: "100%",
    alignSelf: "center",
  },
  mainLayout: {
    flex: 1,
    gap: 14,
  },
  mainLayoutRow: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  mainLayoutColumn: {
    flexDirection: "column",
  },
});
