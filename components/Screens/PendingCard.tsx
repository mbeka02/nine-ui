import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { truncateWalletAddress } from "@/utilities";

interface PendingCardProps {
  amount: string;
  payeeAddress: string;
  reason: string;
  requestedDate: string;
  requestID: string;
}

export function PendingCard({
  amount,
  payeeAddress,
  reason,
  requestedDate,
  requestID,
}: PendingCardProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/pay/[pay]",
          params: {
            payeeAddress: payeeAddress,
            amount: amount,
            requestID: requestID,
            reason: reason,
            requestedDate: requestedDate,
            pay: requestID,
          },
        })
      }
    >
      <View style={styles.card}>
        <View style={styles.top}>
          <View style={styles.addressContainer}>
            <ThemedText style={styles.label}>To:</ThemedText>
            <ThemedText style={styles.addressText}>
              {truncateWalletAddress(payeeAddress)}
            </ThemedText>
          </View>
          <View style={styles.dateContainer}>
            <ThemedText style={styles.dateText}>{requestedDate}</ThemedText>
          </View>
        </View>
        
        <View style={styles.middle}>
          <ThemedText style={styles.reasonText}>{reason}</ThemedText>
        </View>
        
        <View style={styles.bottom}>
          <ThemedText style={styles.amountLabel}>Amount</ThemedText>
          <ThemedText style={styles.amountText}>$ {(Number(amount) * process.env.EXPO_PUBLIC_APTOS_AMOUNT || 5)}</ThemedText>
        </View>
        
        <View style={styles.statusIndicator}>
          <View style={styles.statusDot} />
          <ThemedText style={styles.statusText}>Pending</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    width: "100%",
    borderRadius: 16,
    marginVertical: 8,
    backgroundColor: "#1E1E1E",
    borderLeftWidth: 4,
    borderLeftColor: "#9EDA6F",
    position: 'relative',
    overflow: 'hidden',
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  middle: {
    marginBottom: 20,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  addressContainer: {
    flex: 1,
    marginRight: 10,
  },
  dateContainer: {
    backgroundColor: 'rgba(158, 218, 111, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  label: {
    color: "#A0A0A0",
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '500',
  },
  addressText: {
    color: "white",
    fontSize: 16,
    fontWeight: '600',
  },
  dateText: {
    color: "#9EDA6F",
    fontSize: 12,
    fontWeight: '500',
  },
  reasonText: {
    color: "white",
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  amountLabel: {
    color: "#A0A0A0",
    fontSize: 14,
    fontWeight: '500',
  },
  amountText: {
    color: "#9EDA6F",
    fontSize: 20,
    fontWeight: '700',
  },
  statusIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(158, 218, 111, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9EDA6F',
    marginRight: 6,
  },
  statusText: {
    color: "#9EDA6F",
    fontSize: 12,
    fontWeight: '600',
  },
});