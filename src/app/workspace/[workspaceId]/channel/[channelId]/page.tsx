"use client";
import { useGetChannel } from "@/features/channels/api/use-get-channels";
import { useChannelId } from "@/hooks/use-channel-id";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import {MessageList} from "@/components/message-list";
import { Loader, TriangleAlert } from "lucide-react";
import { Header} from "./header";
import { ChatInput } from "./chat-input";

const ChannelIdPage=()=>{
    const channelId = useChannelId();
    const {results,status,loadMore}=useGetMessages({channelId});
    const { data:channel,isLoading:channelLoading} =useGetChannel({id:channelId});
    console.log({results});
    if(channelLoading || status==="LoadingFirstPage"){
        return(
            <div className="h-full flex-1 flex items-center justify-center">
                <Loader className="animate-spin size-5 text-muted-foreground"/>
            </div>
        );
    } 

    if(!channel){
        return( 
            <div className="h-full flex-1 flex flex-col gap-y-4 items-center justify-center">
                <TriangleAlert className=" size-5 text-muted-foreground"/>
                <span className="text-sm text-muted-foreground">
                    Channel not found   
                </span>    
            </div>
        );
    }
    return(
        <div className="flex flex-col h-full">
            <Header title={channel.name}/>
            <MessageList channelName={channel.name} channelCreationTime={channel._creationTime}
                data={results}
                loadMore={loadMore}
                isLoadingMore={status==="LoadingMore"}
                canLoadMore={status==="CanLoadMore"}

            />
            <ChatInput placeholder={`Message # ${channel.name}`}/>
        </div>
    )
}
export default ChannelIdPage;

// animate-spin