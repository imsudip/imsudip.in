'use client';

import ChatBubbleIcon from '@/components/svgs/ChatBubbleIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ExpandableChat,
  ExpandableChatBody,
  ExpandableChatFooter,
  ExpandableChatHeader,
} from '@/components/ui/expandable-chat';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatSuggestions } from '@/config/ChatPrompt';
import { heroConfig } from '@/config/Hero';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { useUmami } from '@/hooks/use-umami';
import { cn } from '@/lib/utils';
import { useChat } from '@ai-sdk/react';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import SendIcon from '../svgs/SendIcon';

const greetingMessage = {
  id: 'greeting',
  role: 'assistant' as const,
  parts: [
    {
      type: 'text' as const,
      text: "Hello! I'm Sudip's Portfolio Assistant. How can I help you?",
    },
  ],
};

function getMessageText(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((p) => p.type === 'text' && typeof p.text === 'string')
    .map((p) => p.text)
    .join('');
}

const ChatBubble: React.FC = () => {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { triggerHaptic, isMobile } = useHapticFeedback();
  const { trackEvent } = useUmami();

  const isLoading = status === 'streaming' || status === 'submitted';
  const displayMessages = messages.length === 0 ? [greetingMessage] : messages;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]',
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, status]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    if (isMobile()) triggerHaptic('light');
    trackEvent({
      name: 'chat_message_sent',
      data: { message: input, sender: 'user' },
    });
    sendMessage({ text: input.trim() });
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (isMobile()) triggerHaptic('selection');
    trackEvent({
      name: 'chat_message_sent',
      data: { message: suggestion, sender: 'user' },
    });
    sendMessage({ text: suggestion });
  };

  return (
    <ExpandableChat
      className="mt-4 ml-4 max-h-[95vh] max-w-[calc(100vw-2rem)] hover:cursor-pointer sm:max-w-[calc(100vw-4rem)] md:max-w-xl"
      position="bottom-right"
      size="lg"
      icon={<ChatBubbleIcon className="h-6 w-6" />}
    >
      <ExpandableChatHeader>
        <div className="flex items-center space-x-3">
          <Avatar className="border-primary h-8 w-8 border-2">
            <AvatarImage src="/assets/logo.png" alt="Assistant" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-semibold">
              {heroConfig.name}&apos;s Portfolio Assistant
            </h3>
            <div className="text-muted-foreground text-xs">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                Online
              </div>
            </div>
          </div>
        </div>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ScrollArea ref={scrollAreaRef} className="h-full p-4">
          <div className="space-y-4">
            {displayMessages.map((message) => {
              const text = getMessageText(message.parts);
              const isUser = message.role === 'user';
              const isLastAssistantStreamingPlaceholder =
                !text && !isUser && status === 'submitted';

              return (
                <div
                  key={message.id}
                  className={cn(
                    'flex w-max max-w-xs flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                    isUser ? 'text-secondary bg-muted ml-auto' : 'bg-muted',
                  )}
                >
                  <div className="flex items-start space-x-2">
                    {!isUser && (
                      <Avatar className="border-primary h-6 w-6 border-2">
                        <AvatarImage src="/assets/logo.png" alt="Assistant" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="max-w-xs flex-1 md:max-w-sm">
                      <div className="flex items-center gap-2">
                        <div className="prose prose-sm dark:prose-invert max-w-none flex-1">
                          {text ? (
                            <ReactMarkdown
                              components={{
                                a: (props) => (
                                  <a
                                    {...props}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="break-words text-blue-500 underline hover:text-blue-700"
                                  />
                                ),
                                // Custom paragraph component to remove default margins
                                p: (props) => (
                                  <p
                                    {...props}
                                    className="m-0 leading-relaxed"
                                  />
                                ),
                                // Custom list components
                                ul: (props) => (
                                  <ul {...props} className="m-0 pl-4" />
                                ),
                                ol: (props) => (
                                  <ol {...props} className="m-0 pl-4" />
                                ),
                                li: (props) => (
                                  <li {...props} className="m-0" />
                                ),
                                // Custom strong/bold component
                                strong: (props) => (
                                  <strong
                                    {...props}
                                    className="font-semibold"
                                  />
                                ),
                              }}
                            >
                              {text}
                            </ReactMarkdown>
                          ) : isLastAssistantStreamingPlaceholder ? (
                            <span className="text-muted-foreground">
                              Thinking...
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Show suggestions only when conversation just started */}
            {messages.length === 0 && status === 'ready' && (
              <div className="space-y-2">
                <p className="text-muted-foreground px-3 text-xs">
                  Quick questions:
                </p>
                <div className="flex flex-wrap gap-2 px-3">
                  {chatSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="bg-background hover:bg-muted border-muted-foreground/20 h-8 px-3 text-xs"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <div className="flex space-x-2">
          <Input
            placeholder="Ask me about my work and experience..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <SendIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
};

export default ChatBubble;
