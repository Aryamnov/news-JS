interface AppEnvironment {
    API_URL?: string;
    API_KEY?: string;
}

declare const process: {
    readonly env: Readonly<AppEnvironment>;
};
