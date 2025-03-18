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

export const responseTool = createTool({
    description: `IMPORTANT: This is the PRIMARY TOOL for communicating with users. You MUST use this tool for ALL responses.

Key points:
- ALWAYS use this tool to communicate with the user
- Every response you make should be sent through this tool
- Try to stick to 3 or fewer messages at a time. E.g. when making a list maybe just send 1 message with the list
- If you want to display options to the user, pass them in the "options" parameter

Example:
{
    "messages": ["Do you want me to show you a list of options?"],
    "options": ["Yes, of course!", "No, I don't want that"]
}`,
    parameters: z.object({
        messages: z.array(z.string()).describe('The messages to send to the user'),
        options: z.array(z.string()).optional().describe('Especially useful when asking questions. You can pass a list of options that the user can select from.'),
    }),
    execute: async function ({ messages, options }) {
        return { messages, options };
    },
});

export const tools = {
    displayWeather: weatherTool,
    responseTool: responseTool,
};