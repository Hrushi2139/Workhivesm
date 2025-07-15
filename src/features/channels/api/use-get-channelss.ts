// import { api } from "../../../../convex/_generated/api";
// import { useQuery } from "convex/react";
// import { Id } from "../../../../convex/_generated/dataModel";

// interface UseGetChannelssProps{
//     workspaceId:Id<"workspaces">;
// }

// export const useGetChannels=({workspaceId}:UseGetChannelssProps)=>{
//     const data = useQuery(api.channels.get,{workspaceId});
//     const isLoading = data == undefined;
//     return {data,isLoading}
// }

import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetChannelsProps{
    id:Id<"channels">;
}

export const useGetChannel=({id}:UseGetChannelsProps)=>{
    const data = useQuery(api.channels.getById,{id});
    const isLoading = data == undefined;
    return {data,isLoading}
}