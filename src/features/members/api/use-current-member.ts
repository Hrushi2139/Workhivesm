// import { api } from "../../../../convex/_generated/api";
// import { useQuery } from "convex/react";
// import { Id } from "../../../../convex/_generated/dataModel";

// interface UseCurrentMemberProps {
//   workspaceId: Id<"workspaces">;
// }

// export const useCurrentMember = ({ workspaceId }: UseCurrentMemberProps) => {
//   const data = useQuery(api.members.current, { workspaceId });
//   const isLoading = data === undefined;
//   return { data, isLoading };
// };

import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseCurrentMemberProps {
  workspaceId: Id<"workspaces">;
}

export const useCurrentMember = ({ workspaceId }: UseCurrentMemberProps) => {
  const data = useQuery(api.members.current, { workspaceId });
  const isLoading = data === undefined;
  return { data, isLoading };
};
