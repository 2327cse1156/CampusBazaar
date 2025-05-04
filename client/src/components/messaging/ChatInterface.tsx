import React, { useState, useRef, useEffect } from 'react';
import { Conversation, ChatMessage, User } from '../../types';
import { Send, Image, Info } from 'lucide-react';

interface ChatInterfaceProps {
  conversation: Conversation | null;
  currentUser: User | null;
  isLoading?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversation,
  currentUser,
  isLoading = false,
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!conversation || !currentUser) return;

    socketRef.current = new WebSocket(`wss://yourserver.com/ws/chat/${conversation.id}`);

    socketRef.current.onmessage = (event) => {
      const newMessage: ChatMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [conversation?.id, currentUser?.id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !currentUser || !conversation) return;

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      setIsSending(true);

      const outgoingMessage: ChatMessage = {
        id: Date.now().toString(),
        conversationId: conversation.id,
        senderId: currentUser.id,
        content: message,
        timestamp: new Date().toISOString(),
      };

      try {
        socketRef.current.send(JSON.stringify(outgoingMessage));
        setMessages((prev) => [...prev, outgoingMessage]);
        setMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        setIsSending(false);
      }
    } else {
      console.error('WebSocket not connected');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getOtherParticipant = () => {
    if (!conversation || !currentUser) return null;
    return conversation.participants.find((p) => p.id !== currentUser.id);
  };

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8 text-center rounded-lg">
        <div className="bg-gray-200 p-4 rounded-full mb-4">
          <Image className="h-12 w-12 text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No conversation selected</h3>
        <p className="text-gray-500">Select a conversation from the sidebar or start a new one.</p>
      </div>
    );
  }

  const otherParticipant = getOtherParticipant();

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-3">
          <img
            src={
              otherParticipant?.avatar ||
              'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
            }
            alt={otherParticipant?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-800">{otherParticipant?.name}</h3>
            <p className="text-xs text-gray-500">{otherParticipant?.college}</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <Info className="h-5 w-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-pulse space-y-4 w-full max-w-md">
              <div className="flex items-end">
                <div className="h-8 w-8 rounded-full bg-gray-300 mr-2"></div>
                <div className="bg-gray-300 rounded-lg p-3 w-3/4"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="bg-gray-200 p-4 rounded-full mb-4">
                  <Image className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No messages yet</h3>
                <p className="text-gray-500 text-sm">Start the conversation by sending a message below.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => {
                  const isCurrentUser = msg.senderId === currentUser?.id;
                  const showDate =
                    index === 0 ||
                    new Date(messages[index - 1].timestamp).toDateString() !==
                      new Date(msg.timestamp).toDateString();

                  return (
                    <React.Fragment key={msg.id}>
                      {showDate && (
                        <div className="flex justify-center my-4">
                          <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
                            {formatDate(msg.timestamp)}
                          </span>
                        </div>
                      )}
                      <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex items-end max-w-xs md:max-w-md">
                          {!isCurrentUser && (
                            <img
                              src={
                                otherParticipant?.avatar ||
                                'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
                              }
                              alt={otherParticipant?.name}
                              className="w-8 h-8 rounded-full mr-2 object-cover"
                            />
                          )}
                          <div
                            className={`rounded-lg p-3 ${
                              isCurrentUser
                                ? 'bg-emerald-500 text-white rounded-br-none'
                                : 'bg-gray-200 text-gray-800 rounded-bl-none'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <span
                              className={`text-xs mt-1 block ${
                                isCurrentUser ? 'text-emerald-100' : 'text-gray-500'
                              }`}
                            >
                              {formatTime(msg.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </>
        )}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSending}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!message.trim() || isSending}
            className="bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        {isSending && (
          <p className="text-xs text-gray-500 text-center">Sending...</p>
        )}
      </form>
    </div>
  );
};

export default ChatInterface;
