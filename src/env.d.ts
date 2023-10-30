interface ImportMetaEnv {
	readonly VITE_AUTH_ZERO_DOMAIN?: string;
	readonly VITE_CLIENT_ID?: string;
	readonly VITE_ACTIVITY_SERVICE_BASE_URL?: string;
	readonly VITE_AUTH_ZERO_AUDIENCE?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
