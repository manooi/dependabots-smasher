
export interface Version {
    name?: string;
    version?: string;
    description?: string;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;

    // manually added
    time?: string;
}

export interface PackageJson {
    author?: string | {
        name: string;
        email?: string;
        url?: string;
    };
    name: string;
    description: string;
    time: { [key: string]: string };
    versions: { [version: string]: Version };
}