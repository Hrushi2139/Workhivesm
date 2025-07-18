import { Button } from "@/components/ui/button"
import { Hint } from "@/components/hint"
import{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Doc } from "../../../../convex/_generated/dataModel"
import { ChevronDown, ListFilter, SquarePen } from "lucide-react"
import { PreferencesModal } from "./preferences-modal"
import { useState } from "react"
import { InviteModal } from "./invite-modal"
interface WorkspaceHeaderProps{
    workspace:Doc<"workspaces">
    isAdmin:boolean;
}

export const WorkspaceHeader=({workspace,isAdmin}:WorkspaceHeaderProps)=>{
    const [Preferencesopen,setPreferencesOpen] = useState(false);
    const [inviteOpen,setInviteOpen] = useState(false);
    return(
        <>
        <InviteModal
            open={inviteOpen}
            setOpen={setInviteOpen}
            name={workspace.name}
            joinCode={workspace.joinCode}
        />
        <PreferencesModal open={Preferencesopen} setOpen={setPreferencesOpen} initialValue={workspace.name}/>
        <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="font-semi-bold text-lg w-auto p-1.5 overflow-hidden" size="sm">
                        <span>{workspace.name}</span>
                        <ChevronDown className="size-4 ml-1 shrink-0"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="start" className="w-64">
                        <DropdownMenuItem className="cursor-pointer capitalize">
                                <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
                                    {workspace.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col items-start">
                                    <p className="font-bold">{workspace.name}</p>
                                    <p className="text-ts texted-muted-foreground">Active workspace</p>  
                                </div>
                        </DropdownMenuItem>
                        {isAdmin && (
                            <>
                                {/* // only admin can have this features */}
                                 <DropdownMenuSeparator/>
                                <DropdownMenuItem className="cursor-pointer py-2" onClick={()=>setInviteOpen(true)}>
                                            Invite People to {workspace.name}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem className="cursor-pointer py-2" onClick={()=>setPreferencesOpen(true)}>
                                        Preferences 
                                </DropdownMenuItem>
                            </>
                        )}
                        
                </DropdownMenuContent>


            </DropdownMenu>
            <div className="flex items-center gap-0.5">
                <Hint label="Filter conversations" side="bottom">
                    <Button variant="transparent" size="iconSm">
                        <ListFilter className="size-4"/>
                    </Button>

                </Hint>

                 

                <Hint label="New messages" side="bottom">

                    <Button variant="transparent" size="iconSm">
                        <SquarePen className="size-4"/>
                    </Button>

                </Hint>

                

            </div>
            
        </div>
    </>
    )
}