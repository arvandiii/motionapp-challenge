export class RateLimitError extends Error {
    constructor() {
        super("API call limit reached. Please wait before trying again.");
        this.name = 'RateLimitError';

        Object.setPrototypeOf(this, RateLimitError.prototype);
    }
}