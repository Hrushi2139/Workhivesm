import { GetMessagesReturnType } from "../features/messages/api/use-get-messages";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";

// Dummy message component — replace with your actual one
const TIME_THRESHOLD=5;
import {Message}  from "./message";
import { ChannelHero } from "./channel-hero";
import { useState } from "react";
import { useworkspaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-current-member";

interface MessageListProps {
  memberName?: string;
  memberImage?: string;
  channelName?: string;
  channelCreationTime?: number;
  variant?: "channel" | "thread" | "conversation";
  data: GetMessagesReturnType | undefined;
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
};

const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "EEEE, MMMM d");
};

export const MessageList = ({
  memberName,
  memberImage,
  channelName,
  channelCreationTime,
  data,
  variant = "channel",
  loadMore,
  isLoadingMore,
  canLoadMore,
}: MessageListProps) => {
  const [editingId,setEditingId] =useState<Id<"messages">|null>(null);
  const workspaceId=useworkspaceId();
  const {data:currentMember}= useCurrentMember({workspaceId});

  const groupedMessages = data?.reduce((groups, message) => {
    const date = new Date(message._creationTime); 
    const datakey = format(date, "yyyy-MM-dd");
    if (!groups[datakey]) {
      groups[datakey] = [];
    }
    groups[datakey].unshift(message);
    return groups;
  }, {} as Record<string, typeof data>);

 return (
 
    <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar">
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className="text-center my-2 relative">
            <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
            <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
              {formatDateLabel(dateKey)}
            </span>
          </div>

          {messages.map((message, index) =>  {
            const prevMessage=messages[index-1];
            const isCompact=prevMessage &&
            prevMessage.user?._id===message.user?._id && differenceInMinutes(
              new Date(message._creationTime),
              new Date(prevMessage._creationTime)
            )<TIME_THRESHOLD;
            return(
              <Message
                key={message._id}
                id={message._id}
                memberId={message.memberId}
                authorImage={message.user.image}
                authorName={message.user.name }
                isAuthor={message.memberId===currentMember?._id}
                reactions = {message.reactions}
                body={message.body}
                image={message.image}
                updatedAt={message.updatedAt}
                createdAt={message._creationTime}
                isEditing={editingId===message._id}
                setEditingId={setEditingId}
                isCompact={isCompact}
                hideThreadButton={variant==="thread"}
                threadCount={message.threadCount}
                threadImage={message.threadImage}
                threadTimeStamp={message.threadTimestamp}



                />
            )
          })}
        </div>
      ))}
      {variant==="channel" && channelName && channelCreationTime && (
        <ChannelHero
          name={channelName}
          creationTime={channelCreationTime}
        />
      )}
    </div>
 )}
            
           
       