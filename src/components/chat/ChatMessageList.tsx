import { memo, useEffect, useRef } from "react";
import {
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { appColors } from "../../theme/colors";
import { ChatMessage } from "../../types/chat";

type ChatMessageListProps = {
  messages: ChatMessage[];
  isTyping: boolean;
};

function ChatMessageListComponent({
  messages,
  isTyping,
}: ChatMessageListProps) {
  const listRef = useRef<FlatList<ChatMessage>>(null);

  useEffect(() => {
    listRef.current?.scrollToEnd({ animated: true });
  }, [messages.length, isTyping]);

  const renderItem = ({ item }: ListRenderItemInfo<ChatMessage>) => {
    const isUserMessage = item.role === "user";

    return (
      <View style={styles.messageRow}>
        <Text style={styles.messageIndex}>-</Text>
        <View
          style={[
            styles.bubble,
            isUserMessage ? styles.userBubble : styles.assistantBubble,
          ]}
        >
          <Text
            style={[
              styles.bubbleRole,
              isUserMessage ? styles.userRole : styles.assistantRole,
            ]}
          >
            {isUserMessage ? "Enviado" : "Respuesta"}
          </Text>

          <Text
            style={[styles.bubbleText, isUserMessage && styles.userBubbleText]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      ref={listRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>Sin mensajes aún</Text>
          <Text style={styles.emptyStateText}>
            Escribe algo para iniciar el chat.
          </Text>
        </View>
      }
      ListFooterComponent={
        isTyping ? (
          <View style={styles.messageRow}>
            <Text style={styles.messageIndex}>-</Text>
            <View style={[styles.bubble, styles.assistantBubble]}>
              <Text style={[styles.bubbleRole, styles.assistantRole]}>
                Respuesta
              </Text>
              <Text style={styles.bubbleText}>Generando respuesta...</Text>
            </View>
          </View>
        ) : null
      }
    />
  );
}

export const ChatMessageList = memo(ChatMessageListComponent);

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    gap: 12,
    paddingBottom: 12,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  messageIndex: {
    color: appColors.textBody,
    fontSize: 18,
    lineHeight: 22,
  },
  bubble: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  assistantBubble: {
    backgroundColor: appColors.accent,
    borderWidth: 1,
    borderColor: appColors.accentSoft,
  },
  userBubble: {
    backgroundColor: appColors.accent,
    borderWidth: 1,
    borderColor: appColors.accentSoft,
  },
  bubbleRole: {
    fontFamily: "Sora_600SemiBold",
    fontSize: 11,
    marginBottom: 6,
  },
  assistantRole: {
    color: appColors.textInverse,
  },
  userRole: {
    color: appColors.textInverse,
  },
  bubbleText: {
    color: appColors.textInverse,
    fontFamily: "Sora_400Regular",
    fontSize: 13,
    lineHeight: 20,
  },
  userBubbleText: {
    color: appColors.textInverse,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    gap: 4,
  },
  emptyStateTitle: {
    color: appColors.textStrong,
    fontFamily: "Sora_600SemiBold",
    fontSize: 14,
  },
  emptyStateText: {
    color: appColors.textBody,
    fontFamily: "Sora_400Regular",
    fontSize: 13,
  },
});
