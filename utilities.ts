const maxLength = 8;

export function truncateWalletAddress(walletAddress: string) {
  if (walletAddress.length > maxLength)
    return walletAddress.slice(0, maxLength) + "...";
}
