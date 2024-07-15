export interface User {
    accessToken?: string;
    username?: string;
    userId?: string;
    roles?: Array<{role: string}>;
}
