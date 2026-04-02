import {
  Sora_400Regular,
  Sora_600SemiBold,
  Sora_700Bold,
  useFonts,
} from "@expo-google-fonts/sora";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { appColors, appGradients } from "../theme/colors";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isDesktopWeb = width >= 1100;

  const horizontalPadding = isDesktopWeb ? 32 : isTablet ? 24 : 16;
  const topPadding = isDesktopWeb ? 72 : isTablet ? 64 : 52;
  const maxContentWidth = isDesktopWeb ? 1160 : 940;
  const metricsVertical = width < 640;

  const [fontsLoaded] = useFonts({
    Sora_400Regular,
    Sora_600SemiBold,
    Sora_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={appGradients.home as unknown as [string, string, string]}
      locations={[0, 0.58, 1]}
      style={styles.page}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: horizontalPadding,
            paddingTop: topPadding,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.contentWrap, { maxWidth: maxContentWidth }]}>
          <View
            style={[styles.mainGrid, isDesktopWeb && styles.mainGridDesktop]}
          >
            <View style={[styles.connectionCard, styles.mainPrimary]}>
              <View style={styles.connectionRow}>
                <View style={styles.iconBubble}>
                  <MaterialCommunityIcons
                    name="glasses"
                    size={22}
                    color="#4A1F79"
                  />
                </View>
                <View style={styles.connectionTextBox}>
                  <Text style={styles.connectionLabel}>
                    Dispositivo AuraVision
                  </Text>
                  <Text style={styles.connectionValue}>Conectado al ESP32</Text>
                </View>
                <View style={styles.onlinePill}>
                  <Ionicons name="wifi" size={14} color="#FFFFFF" />
                  <Text style={styles.onlineText}>Online</Text>
                </View>
              </View>

              <View
                style={[
                  styles.metricsRow,
                  metricsVertical && styles.metricsRowVertical,
                ]}
              >
                <View
                  style={[
                    styles.metricCard,
                    metricsVertical && styles.metricCardVertical,
                  ]}
                >
                  <Ionicons name="battery-half" size={20} color="#4A1F79" />
                  <Text style={styles.metricValue}>78%</Text>
                  <Text style={styles.metricLabel}>Bateria</Text>
                </View>

                <View
                  style={[
                    styles.metricCard,
                    metricsVertical && styles.metricCardVertical,
                  ]}
                >
                  <Ionicons name="walk" size={20} color="#4A1F79" />
                  <Text style={styles.metricValue}>4.3 km</Text>
                  <Text style={styles.metricLabel}>Recorrido</Text>
                </View>

                <View
                  style={[
                    styles.metricCard,
                    metricsVertical && styles.metricCardVertical,
                  ]}
                >
                  <Ionicons name="time-outline" size={20} color="#4A1F79" />
                  <Text style={styles.metricValue}>2h 10m</Text>
                  <Text style={styles.metricLabel}>Uso hoy</Text>
                </View>
              </View>
            </View>

            <View style={[styles.sectionCard, styles.mainSecondary]}>
              <Text style={styles.sectionTitle}>Autonomia estimada</Text>
              <View style={styles.progressTrack}>
                <View style={styles.progressFill} />
              </View>
              <Text style={styles.sectionCaption}>
                Aproximadamente 6 horas 20 minutos restantes
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 40,
    alignItems: "center",
  },
  contentWrap: {
    width: "100%",
    gap: 16,
  },
  headerCard: {
    backgroundColor: appColors.surfaceMuted,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: appColors.surfaceBorder,
  },
  brand: {
    color: appColors.textInverse,
    fontFamily: "Sora_700Bold",
    fontSize: 30,
    marginBottom: 10,
    letterSpacing: 0.4,
  },
  heroTitle: {
    color: appColors.accentWarm,
    fontFamily: "Sora_600SemiBold",
    fontSize: 21,
    lineHeight: 28,
    marginBottom: 8,
  },
  heroSubtitle: {
    color: appColors.textSoft,
    fontFamily: "Sora_400Regular",
    fontSize: 14,
    lineHeight: 22,
  },
  mainGrid: {
    gap: 16,
  },
  mainGridDesktop: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  mainPrimary: {
    flex: 1.35,
  },
  mainSecondary: {
    flex: 1,
    justifyContent: "center",
  },
  connectionCard: {
    backgroundColor: appColors.surfaceCard,
    borderRadius: 22,
    padding: 16,
    elevation: 3,
    boxShadow: "0px 4px 8px rgba(40, 15, 74, 0.08)",
  },
  connectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  iconBubble: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: appColors.surfaceTint,
    alignItems: "center",
    justifyContent: "center",
  },
  connectionTextBox: {
    flex: 1,
  },
  connectionLabel: {
    color: appColors.textStrong,
    fontFamily: "Sora_600SemiBold",
    fontSize: 14,
  },
  connectionValue: {
    color: appColors.textBody,
    fontFamily: "Sora_400Regular",
    fontSize: 12,
    marginTop: 2,
  },
  onlinePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    backgroundColor: appColors.accent,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  onlineText: {
    color: "#FFFFFF",
    fontFamily: "Sora_600SemiBold",
    fontSize: 12,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 10,
  },
  metricsRowVertical: {
    flexDirection: "column",
  },
  metricCard: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: appColors.surfaceSoft,
    alignItems: "center",
    paddingVertical: 12,
    gap: 4,
  },
  metricCardVertical: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    alignItems: "center",
  },
  metricValue: {
    color: "#3C2166",
    fontFamily: "Sora_700Bold",
    fontSize: 16,
  },
  metricLabel: {
    color: "#8066A6",
    fontFamily: "Sora_400Regular",
    fontSize: 12,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
  },
  sectionTitle: {
    color: "#452272",
    fontFamily: "Sora_600SemiBold",
    fontSize: 16,
    marginBottom: 10,
  },
  progressTrack: {
    width: "100%",
    height: 12,
    borderRadius: 999,
    backgroundColor: "#E9DAFF",
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    width: "78%",
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#6B3AB2",
  },
  sectionCaption: {
    color: "#8A74AD",
    fontFamily: "Sora_400Regular",
    fontSize: 13,
  },
});
