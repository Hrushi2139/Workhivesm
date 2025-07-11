// import {useQuery} from "convex/react";
// import { api } from "../../../../convex/_generated/api";
// import { Id } from "../../../../convex/_generated/dataModel";

// interface UseGetWorkspaceInfoProps{
//     id:Id<"workspaces">;
// }

// export const useGetWorkspaceInfo = ({id}:UseGetWorkspaceInfoProps)=>{
//     const data = useQuery(api.workspaces.getInfoById,{id});
//     const isLoading = data ===undefined;
//     return {data,isLoading}
// }
// // go to page.tsx


import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetWorkspaceInfo = ({ joinCode }: { joinCode: string }) => {
  const data = useQuery(api.workspaces.getByJoinCode, { code: joinCode });
  const isLoading = data === undefined;
  return { data, isLoading };
};
