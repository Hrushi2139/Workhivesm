// import { api } from "../../../../convex/_generated/api";
// import { useQuery } from "convex/react";
// import { Id } from "../../../../convex/_generated/dataModel";

// interface UseGetChannelProps {
//     id?: Id<"channels">; // Make id optional
// }

// // export const useGetChannels = ({ id }: UseGetChannelProps) => {
// //     const data = useQuery(api.channels.getById, id ? { id } : undefined);
// //     const isLoading = data === undefined && !!id;
// //     return { data, isLoading };
// // };
// export const useGetChannels = ({ workspaceId }: { workspaceId?: string }) => {
//     const data = useQuery(api.channels.get, workspaceId ? { workspaceId } : undefined);
//     const isLoading = data === undefined && !!workspaceId;
//     return { data, isLoading };
// };

// // export const useGetChannels = ({ workspaceId }: { workspaceId?: string }) => {
// //     const data = useQuery(api.channels.get, workspaceId ? { workspaceId } : undefined);
// //     const isLoading = data === undefined && !!workspaceId;
// //     return { data, isLoading };
// // };

import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetChannelProps{
    workspaceId:Id<"workspaces">;
}

export const useGetChannels=({workspaceId}:UseGetChannelProps)=>{
    const data = useQuery(api.channels.get,{workspaceId});
    const isLoading = data == undefined;
    return {data,isLoading}
}
