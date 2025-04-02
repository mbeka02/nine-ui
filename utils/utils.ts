
export namespace Utils {
    export const truncateAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    export const diceImage = (seed: string) => `https://api.dicebear.com/8.x/pixel-art-neutral/png?seed=${seed ?? '1'}`
}
