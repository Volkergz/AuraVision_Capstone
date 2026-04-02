import { memo } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { appColors } from "../../theme/colors";

type ChatComposerProps = {
  value: string;
  onChangeText: (value: string) => void;
  onSend: () => void;
  canSend: boolean;
  placeholder: string;
};

function ChatComposerComponent({
  value,
  onChangeText,
  onSend,
  canSend,
  placeholder,
}: ChatComposerProps) {
  return (
    <View style={styles.inputCard}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={appColors.textBody}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        multiline
      />

      <Pressable
        onPress={onSend}
        disabled={!canSend}
        style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
      >
        <Text style={styles.sendButtonText}>↗</Text>
      </Pressable>
    </View>
  );
}

export const ChatComposer = memo(ChatComposerComponent);

const styles = StyleSheet.create({
  inputCard: {
    marginTop: 10,
    borderRadius: 18,
    padding: 10,
    backgroundColor: appColors.surfaceSoft,
    borderWidth: 1,
    borderColor: appColors.chatSurfaceBorder,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    color: appColors.textStrong,
    fontFamily: "Sora_400Regular",
    fontSize: 14,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: appColors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    opacity: 0.45,
  },
  sendButtonText: {
    color: appColors.textInverse,
    fontFamily: "Sora_700Bold",
    fontSize: 16,
    marginTop: -1,
  },
});
