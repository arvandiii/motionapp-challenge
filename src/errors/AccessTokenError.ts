export class AccessTokenError extends Error {
    constructor() {
        super("Access token is not valid. Please set a valid access token in your .env file.");
        this.name = 'AccessTokenError';
        
        Object.setPrototypeOf(this, AccessTokenError.prototype);
    }
}