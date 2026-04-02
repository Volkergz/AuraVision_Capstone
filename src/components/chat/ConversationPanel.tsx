import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CHAT_COPY } from "../../constants/chat";
import { ChatMessage } from "../../types/chat";
import { ChatComposer } from "./ChatComposer";
import { ChatMessageList } from "./ChatMessageList";
import { appColors } from "../../theme/colors";

type ConversationPanelProps = {
  panelHeight: number;
  messages: ChatMessage[];
  input: string;
  onChangeInput: (value: string) => void;
  onSend: () => void;
  canSend: boolean;
  isSending: boolean;
  errorText: string | null;
};

function ConversationPanelComponent({
  panelHeight,
  messages,
  input,
  onChangeInput,
  onSend,
  canSend,
  isSending,
  errorText,
}: ConversationPanelProps) {
  return (
    <View style={[styles.panel, { height: panelHeight }]}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatTitle}>Chat</Text>
        <Text style={styles.chatSubtitle}>{CHAT_COPY.emptyStateText}</Text>
      </View>

      {errorText ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>No se pudo enviar</Text>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      ) : null}

      <ChatMessageList messages={messages} isTyping={isSending} />

      <ChatComposer
        value={input}
        onChangeText={onChangeInput}
        onSend={onSend}
        canSend={canSend}
        placeholder={CHAT_COPY.composerPlaceholder}
      />
    </View>
  );
}

export const ConversationPanel = memo(ConversationPanelComponent);

const styles = StyleSheet.create({
  panel: {
    minWidth: 350,
    maxWidth: 430,
    flexShrink: 0,
    borderRadius: 22,
    backgroundColor: appColors.surfaceCard,
    padding: 14,
    overflow: "hidden",
    elevation: 3,
    boxShadow: "0px 4px 8px rgba(40, 15, 74, 0.08)",
  },
  chatHeader: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: appColors.chatSurfaceBorder,
  },
  chatTitle: {
    color: appColors.textStrong,
    fontFamily: "Sora_700Bold",
    fontSize: 20,
  },
  chatSubtitle: {
    color: appColors.textBody,
    fontFamily: "Sora_400Regular",
    fontSize: 12,
    marginTop: 4,
  },
  errorCard: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    backgroundColor: appColors.chipBackground,
    borderWidth: 1,
    borderColor: appColors.chipBorder,
    gap: 4,
  },
  errorTitle: {
    color: appColors.textStrong,
    fontFamily: "Sora_600SemiBold",
    fontSize: 13,
  },
  errorText: {
    color: appColors.textBody,
    fontFamily: "Sora_400Regular",
    fontSize: 12,
    lineHeight: 18,
  },
});
