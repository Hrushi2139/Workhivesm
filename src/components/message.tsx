import { format, isToday ,isYesterday} from "date-fns";
import {Id,Doc} from "../../convex/_generated/dataModel";
import dynamic from "next/dynamic";
import { Hint } from "./hint";
import { Avatar ,AvatarImage,AvatarFallback} from "@radix-ui/react-avatar";
import { Thumbnail } from "./Thumbnail";
import { Toolbar } from "./toolbar";
import { useUpdateMessage } from "@/features/messages/api/use-update-message";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRemoveMessage } from "@/features/messages/api/use-remove-message";
import { useConfirm } from "@/hooks/use-confirm";
// import Toolbar from "quill/modules/toolbar";
const Renderer = dynamic(()=>import("@/components/renderer"),{ssr: false});
const Editor=dynamic(()=>import("@/components/editor"),{ssr:false});
interface MessageProps{
    id:Id<"messages">;
    memberId:Id<"members">;
    authorImage?:string;
    authorName?:string;
    isAuthor:boolean;
    reactions:Array<
    Omit<Doc<"reactions">,"memberId"> & {
        count:number;
        memberIds:Id<"members">[];
    }>;
    body:Doc<"messages">["body"];
    image:string|null|undefined;
    createdAt:Doc<"messages">["_creationTime"];
    updatedAt:Doc<"messages">["updatedAt"];
    isEditing:boolean;
    isCompact?:boolean;
    setEditingId:(id:Id<"messages">|null)=>void; 
    hideThreadButton:boolean;
    threadCount?:number;
    threadImage?:string;
    threadTimeStamp?:number;

};
const formatFullTime=(date:Date)=>{
    return `${isToday(date)?"Today":isYesterday(date) ? "Yesterday":format(date,"MMM d, yyyy")} at ${format(date,"HH:mm:ss a")}`;
}
export const Message=({
    id,
    isAuthor,
    memberId,
    authorImage,
    authorName="Member",
    reactions,
    body,
    image,
    createdAt,
    updatedAt,
    isEditing,
    isCompact,
    setEditingId,
    hideThreadButton,
    threadCount,
    threadImage,
    threadTimeStamp,


}:MessageProps)=>{
    const [ConfirmDialog,confirm]= useConfirm(
        "Delete Message",
        "Are you sure you want to delete this message?"
    );
    const {mutate:updateMessage,isPending:isUpdatingMessage}=useUpdateMessage();
    const {mutate:removeMessage,isPending:isRemovingMessage}=useRemoveMessage();
    const isPending=isUpdatingMessage;
    const handleRemove=async()=>{
        const ok=await confirm();
        if(!ok) return;
        removeMessage({id},{
            onSuccess:()=>{
                toast.success("Message Deleted")
            },
            onError:()=>{
                toast.error("Failed to delete message");
            },
        });
    }
    const handleUpdate=({body}:{body:string})=>{
        updateMessage({id,body},{
            onSuccess:()=>{
                toast.success("Message Updated");
                setEditingId(null);
            },
            onError:()=>{
                toast.error("Failed to update Mesaage");
            }
        });
    };


    if(isCompact){
    return(
        <>
        <ConfirmDialog/>
            <div className={cn(
    "flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative",
    isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]",
     isRemovingMessage && "bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200"
    )}>
                <div className="flex items-start gap-2">
                    <Hint label={formatFullTime(new Date(createdAt))}>
                        <button className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 w-[40px] leading-[22px] text-center hover:underline">
                            {format(new Date(createdAt),"hh:mm")}
                        </button>
                    </Hint>
                    {isEditing ? (
                        <div className="w-full h-full">
                            <Editor
                                  onSubmit={handleUpdate}
                                  disabled={isPending}
                                  defaultValue={JSON.parse(body)}
                                  onCancel={()=>setEditingId(null)}
                                  variant="update"
                            />
                        </div>
                    ):(
                    <div className="flex flex-col w-full">
                        <Renderer value={body}/>
                         <Thumbnail url={image}/>
                        {!updatedAt ? (
                            <span className="text-xs text-muted-foreground">
                                (edited)
                            </span>
                        ):null}
                    </div>
                    )}
                </div>
                {!isEditing && (
                <Toolbar
                    isAuthor={isAuthor}
                    isPending={false}
                    handleEdit={()=>setEditingId(id)}
                    handleThread={()=>{}}
                    handleDelete={handleRemove}
                    handleReaction={()=>{}}
                    hideThreadButton={hideThreadButton}
                />
            )}
            </div>
    </>        
    );
}
const avatarFallback = authorName.charAt(0).toUpperCase();

return (
    <>
    <ConfirmDialog/>
  <div className={cn(
    "flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative",
    isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]",
    isRemovingMessage && "bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200"
    )}>
    <div className="flex items-start gap-2">
      <button>
        <Avatar className="rounded-md">
          <AvatarImage
            className="w-10 h-10 rounded-md" // Further increased width and height
            src={authorImage}
          />
          <AvatarFallback className="w-10 h-10 rounded-md flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </button>
      {isEditing ? (
        <div className="w-full h-full">
            <Editor
                onSubmit={handleUpdate}
                disabled={isPending}
                defaultValue={JSON.parse(body)}
                onCancel={()=>setEditingId(null)}
                variant="update"
            />
        </div>
      ):(
        <div className="flex flex-col w-full overflow-hidden">
            <div className="text-sm">
            <button onClick={() => {}} className="font-bold text-primary hover:underline">
                {authorName}
            </button>
            <span>&nbsp;&nbsp;</span>
            <Hint label={formatFullTime(new Date(createdAt))}>
                <button className="text-xs text-muted-foreground hover:underline">
                {format(new Date(createdAt), "hh:mm a")}
                </button>
            </Hint>
            </div>
            <Renderer value={body} />
            <Thumbnail url={image}/>
            {!updatedAt ? (
            <span className="text-xs text-muted-foreground">(edited)</span>
            ) : null}
        </div>
      )}
    </div>
    {!isEditing && (
        <Toolbar
            isAuthor={isAuthor}
            isPending={isPending}
            handleEdit={()=>setEditingId(id)}
            handleThread={()=>{}}
            handleDelete={handleRemove}
            handleReaction={()=>{}}
            hideThreadButton={hideThreadButton}
        />
    )}
  </div>
  </>
);

}

