declare namespace NodeJS {
    interface ProcessEnv {
        APP_ENV: 'development' | 'production' | 'staging',
        EAS_PROJECT_ID: string,
        EXPO_PUBLIC_BACKEND_URL: string,
        EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: string
    }
}
