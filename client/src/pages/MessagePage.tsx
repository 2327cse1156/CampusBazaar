import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ConversationList from '../components/messaging/ConversationList';
import ChatInterface from '../components/messaging/ChatInterface';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { Conversation } from '../types';

const MessagesPage: React.FC = () => {
  const location = useLocation();
  const { conversations, activeConversation, setActiveConversation, messages, sendMessage, isLoading } = useChat();
  const { user } = useAuth();
  
  // Extract conversation ID from URL if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const conversationId = searchParams.get('conversation');
    
    if (conversationId && conversations.length > 0) {
      const conversation = conversations.find(conv => conv.id === conversationId);
      if (conversation) {
        setActiveConversation(conversation);
      }
    } else if (conversations.length > 0 && !activeConversation) {
      // Set first conversation as active if none is selected
      setActiveConversation(conversations[0]);
    }
  }, [location.search, conversations, activeConversation, setActiveConversation]);

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
  };

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(80vh-4rem)]">
          <div className="lg:col-span-1 h-full">
            <ConversationList
              conversations={conversations}
              activeConversation={activeConversation}
              currentUser={user}
              onSelectConversation={handleSelectConversation}
              isLoading={isLoading}
            />
          </div>
          
          <div className="lg:col-span-2 h-full">
            <ChatInterface
              conversation={activeConversation}
              messages={messages}
              currentUser={user}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;