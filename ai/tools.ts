import { tool as createTool } from 'ai';
import { z } from 'zod';

export const weatherTool = createTool({
    description: 'Display the weather for a location',
    parameters: z.object({
        location: z.string().describe('The location to get the weather for'),
    }),
    execute: async function ({ location }) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return { weather: 'Sunny', temperature: 75, location };
    },
});

export const textMessageTool = createTool({
    description: `IMPORTANT: This is the PRIMARY TOOL for communicating with users. You MUST use this tool for ALL responses.

Key points:
- This is the ONLY way to send messages that will display properly to users
- Do NOT respond directly in assistant messages - they will not work
- ALWAYS use this tool to communicate with the user
- Every response you make should be sent through this tool

Example usage: Call this tool with your response message to ensure it reaches the user properly.`,
    parameters: z.object({
        messages: z.array(z.string()).describe('The messages to send to the user'),
    }),
    execute: async function ({ messages }) {
        return { messages };
    },
});

export const tools = {
    displayWeather: weatherTool,
    textMessage: textMessageTool,
};