declare namespace NodeJS {
    interface ProcessEnv {
        APP_ENV: 'development' | 'production' | 'staging',
        EAS_PROJECT_ID: string,
        EXPO_PUBLIC_BACKEND_URL: string
    }
}
