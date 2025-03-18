'use client'

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Trash2 } from 'lucide-react'
import { Weather } from '@/components/Weather'

interface MessageBubbleProps {
    role: 'user' | 'assistant';
    content: string;
}

function MessageBubble({ role, content }: MessageBubbleProps) {
    return (
        <div
            className={`max-w-[80%] px-4 py-2 rounded-lg whitespace-pre-wrap ${role === 'user'
                ? 'bg-blue-500 text-white rounded-br-none'
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
            style={{
                fontSize: '15px'
            }}
        >
            {content}
        </div>
    );
}

export default function ChatPage() {
    const { messages, setMessages, input, setInput, handleInputChange, handleSubmit, isLoading, stop, reload } = useChat()
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [isPseudoLoading, setIsPseudoLoading] = useState(false)

    // Auto scroll to the bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        if (messages.length > 0 && isLoading === false) {
            // Focus the input field after message is sent with a longer delay
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        }
        if (isPseudoLoading && isLoading === false) {
            // If the last message is from the assistant, remove it
            if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
                setIsPseudoLoading(false)
            }
        }
    }, [messages, isLoading])

    // Focus input field on initial load
    useEffect(() => {
        // Focus with a slight delay to ensure the component is fully mounted
        setTimeout(() => {
            inputRef.current?.focus()
        }, 100)
    }, [])

    useEffect(() => {
        console.log('messages', messages)
    }, [messages])

    // Custom submit handler to show sending state
    const onSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) {
            e.preventDefault()
        }

        // Set a new debounce timer
        console.log('onSubmit', inputRef.current?.value)
        if (isLoading || (messages.length > 0 && messages[messages.length - 1].role === 'user')) {
            // Append current input to the last user message
            setMessages(prevMessages => {
                const lastUserMessageIndex = [...prevMessages].reverse().findIndex(m => m.role === 'user');
                if (lastUserMessageIndex === -1) return prevMessages;

                const actualIndex = prevMessages.length - 1 - lastUserMessageIndex;
                return prevMessages.map((msg, i) => {
                    if (i === actualIndex) {
                        return {
                            ...msg,
                            content: msg.content + '\n' + (inputRef.current?.value || ''),
                            parts: msg.parts?.map((part: any) => ({
                                ...part,
                                text: part.text + '\n' + (inputRef.current?.value || '')
                            }))
                        };
                    }
                    return msg;
                });
            });
            setIsPseudoLoading(true)
            stop()
            setInput('')
            reload()
            return;
        }

        handleSubmit(e as React.FormEvent<HTMLFormElement>)
    }

    // Clear chat history
    const handleClearChat = () => {
        reload()
    }

    return (
        <div className="flex flex-col h-screen max-w-4xl mx-auto px-4">
            {/* Header with clear button */}
            <div className="py-4 border-b flex justify-between items-center">
                <h1 className="text-2xl font-bold">Chat with me</h1>
                {messages.length > 0 && (
                    <button
                        onClick={handleClearChat}
                        className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-md hover:bg-gray-100"
                        title="Clear chat"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center text-gray-500">
                        <div>
                            <p className="text-xl font-medium">Ara is a digital assistant</p>
                            <p className="mt-2">Send a message to start the conversation</p>
                        </div>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {message.role === 'user' && (
                                <MessageBubble role={message.role} content={message.content} />
                            )}
                            <div>
                                {message.toolInvocations?.map(toolInvocation => {
                                    const { toolName, toolCallId, state } = toolInvocation;

                                    if (state === 'result') {
                                        if (toolName === 'displayWeather') {
                                            const { result } = toolInvocation;
                                            return (
                                                <div key={toolCallId}>
                                                    <Weather {...result} />
                                                </div>
                                            );
                                        }
                                        if (toolName === 'responseTool') {
                                            const { result } = toolInvocation;
                                            return (
                                                <div key={toolCallId} className="flex flex-col gap-1 w-full">
                                                    {result.messages.map((msg: string, i: number) => (
                                                        <MessageBubble
                                                            key={i}
                                                            role="assistant"
                                                            content={msg}
                                                        />
                                                    ))}
                                                    {result.options && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {result.options.map((option: string, i: number) => (
                                                                <button
                                                                    key={i}
                                                                    className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handleInputChange({ target: { value: option } } as any);
                                                                    }}
                                                                >
                                                                    {option}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }
                                    } else {
                                        return (
                                            <div key={toolCallId}>
                                                {toolName === 'displayWeather' ? (
                                                    <div>Loading weather...</div>
                                                ) : toolName === 'textMessage' ? (
                                                    <div>Sending message...</div>
                                                ) : null}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    ))
                )}

                {/* Typing indicator */}
                {(isPseudoLoading || isLoading) && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 px-4 py-2 rounded-lg rounded-bl-none flex items-center space-x-1">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form
                onSubmit={onSubmit}
                className="border-t p-4 flex items-center space-x-2"
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={!input.trim()}
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send className="h-5 w-5" />
                </button>
            </form>
        </div>
    )
} 