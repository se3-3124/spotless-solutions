export enum UserRole {
    Administrator,
    User
}

export type UserData = {
    firstName: string;
    lastName: string;
    role: UserRole;
    token: string;
    refreshToken: string;
}

export type AuthenticationContextType = {
    /**
     * Retrieves authenticated user
     */
    user: UserData | null,
    /**
     * Sets the authenticated user
     * @param {string} token User session token
     * @param {string} refreshToken User refresh token
     */
    setAuthenticatedUser(token: string, refreshToken: string): boolean,
    /**
     * Clears all authentication details
     */
    removeAuthenticationTokens(): void
}
