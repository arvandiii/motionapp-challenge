import { RateLimitError } from "../errors/RateLimitError";
import { FacebookUser } from '../types/facebook';

export const rateLimitedRequest = async(
    requestFunc: (accessToken: string) => Promise<FacebookUser | null>,
    accessToken: string,
    interval: number,
    attempt: number = 1): Promise<FacebookUser | null> => {
    try {
        const result = await requestFunc(accessToken); // Attempt the request
        console.log(result);
        await new Promise(resolve => setTimeout(resolve, interval));
        return rateLimitedRequest(requestFunc, accessToken, interval, 1);
    } catch (error) {
        if (error instanceof RateLimitError) {
            const waitTime = interval ** attempt; // Calculate exponential backoff
            console.log(`Rate limit exceeded, retrying in ${waitTime}ms...`);
            await new Promise(resolve => setTimeout(resolve, waitTime)); // Wait for the calculated time
            return rateLimitedRequest(requestFunc, accessToken, interval, attempt + 1); // Retry the request
        } else {
            throw error; // Rethrow the error if it's not a RateLimitError
        }
    }
}