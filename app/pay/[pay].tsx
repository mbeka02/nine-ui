import { View, StyleSheet, Pressable, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Utils } from "@/utils/utils";
import "../../global";
import makePayment from "@/lib/make-payment";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { toast } from "sonner-native";
import { Ionicons } from '@expo/vector-icons';


export default function Pay() {
  const { amount , requestID, requestedDate, payeeAddress, reason } =
    useLocalSearchParams();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  
  const handlePayment = async (
    amount: number,
    receiver: string,
    requestID: string
  ) => {
    try {
      setLoading(true);
      await makePayment(amount, receiver, requestID);
      toast.success("Payment successful!");
    } catch (error) {
      console.log("unable to complete payment:", error);
      toast.error("Payment failed", {
        description: "Please try again later",
        style: {
          borderColor: "red",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParallaxScrollView>
      <Spinner visible={loading} />
      
      {/* Header */}
      <ThemedView style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#9EDA6F" />
        </Pressable>
        <ThemedText type="title" style={styles.headerTitle}>Payment Request</ThemedText>
        <View style={{ width: 24 }}>
          <Text style={{ display: 'none' }}>Spacer for balance</Text>
        </View>
      </ThemedView>
      
      {/* Payment Card */}
      <ThemedView style={styles.card}>
        <View style={styles.cardHeader}>
          <ThemedText style={styles.cardTitle}>You're sending</ThemedText>
          <ThemedText style={styles.amount}>$ {(Number(amount) * process.env.EXPO_PUBLIC_APTOS_AMOUNT)}</ThemedText>
        </View>
        
        <View style={styles.divider} />
        
        {/* Sender Info */}
        <View style={styles.infoSection}>
          <ThemedText style={styles.infoLabel}>From</ThemedText>
          <View style={styles.accountInfo}>
            <View style={styles.accountBadge}>
              <Text style={styles.accountBadgeText}>APT</Text>
            </View>
            <View>
              <ThemedText style={styles.accountName}>Account 1</ThemedText>
              <ThemedText style={styles.accountAddress}>
                {Utils.truncateAddress("0x123...4567")}
              </ThemedText>
            </View>
          </View>
        </View>
        
        {/* Receiver Info */}
        <View style={styles.infoSection}>
          <ThemedText style={styles.infoLabel}>To</ThemedText>
          <View style={styles.accountInfo}>
            <View style={[styles.accountBadge, { backgroundColor: '#FF6B6B' }]}>
              <Text style={styles.accountBadgeText}>APT</Text>
            </View>
            <View>
              <ThemedText style={styles.accountName}>Recipient</ThemedText>
              <ThemedText style={styles.accountAddress}>
                {Utils.truncateAddress(payeeAddress as string)}
              </ThemedText>
            </View>
          </View>
        </View>
        
        {/* Payment Details */}
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Reason</ThemedText>
            <ThemedText style={styles.detailValue}>{reason || "No reason provided"}</ThemedText>
          </View>
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Requested</ThemedText>
            <ThemedText style={styles.detailValue}>{requestedDate}</ThemedText>
          </View>
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Network Fee</ThemedText>
            <ThemedText style={styles.detailValue}>0.001 APT</ThemedText>
          </View>
        </View>
      </ThemedView>
      
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.confirmButton]}
          onPress={() =>
            handlePayment(
              Number(amount),
              payeeAddress as string,
              requestID as string
            )
          }
        >
          <Text style={styles.buttonText}>Confirm Payment</Text>
        </Pressable>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountBadge: {
    backgroundColor: '#9EDA6F',
    borderRadius: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accountBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  accountAddress: {
    fontSize: 14,
    color: '#666',
  },
  detailsSection: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 12,
  },
  confirmButton: {
    backgroundColor: '#9EDA6F',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  cancelButtonText: {
    color: '#666',
  },
});