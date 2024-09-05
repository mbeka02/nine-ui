const MODULE_ADDRESS = "0xace795d5aaebe47a75510629308e9f73df34e5eae212c160039bbb5ec742146c" as const
const MODULE_NAME = `${MODULE_ADDRESS}::nine` as const
export const MODULE_ENTRY_FUNCTIONS = {
    make_payment: `${MODULE_NAME}::make_payment`,
} as const