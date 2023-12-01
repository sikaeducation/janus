import type Store from "./store";

interface ImportMetaEnv {
	readonly VITE_AUTH_ZERO_DOMAIN?: string;
	readonly VITE_AUTH_ZERO_CLIENT_ID?: string;
	readonly VITE_ACTIVITY_API_BASE_URL?: string;
	readonly VITE_AUTH_ZERO_AUDIENCE?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare global {
	interface Window {
		store: Store; // Stored for greybox testing
	}
}

export type ActivityType = "article";

export type MongoDocument = {
	_id?: string;
	created_at?: string;
	updated_at?: string;
};

export type Activity = {
	_type: ActivityType;
	title: string;
	published: boolean;
	tags?: string[];
	notes?: string;
	description?: string;
} & MongoDocument;

export type Article = Activity & {
	_type: "article";
	post_slug: string;
	content?: string;
};

export type ActivityResponse = {
	activities: Record<string, Activity>;
};

export type User = {
	email: string;
	"https://sikaeducation.com/roles"?: string[];
	name: string;
	picture: string;
	isAuthenticated: boolean;
	isLoading: boolean;
};
