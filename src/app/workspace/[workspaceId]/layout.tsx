"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { WorkspaceSidebar } from "./WorkspaceSidebar";
import { usePanel } from "@/hooks/use-panel";
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface WorkspaceIdLayoutProps {
    children: React.ReactNode
};

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {

    return (
        <NuqsAdapter>
            <InnerLayout>{children}</InnerLayout>
        </NuqsAdapter>
    );
};

const InnerLayout = ({ children }: WorkspaceIdLayoutProps) => {
    const { parentMessageId, onClose } = usePanel();
    const showPanel = !!parentMessageId;

    return (
        <div className="h-full">
            <Toolbar />
            <div className="flex h-[calc(100vh-40px)]">
                <Sidebar />
                <ResizablePanelGroup direction="horizontal" autoSaveId="ca-workspace-layout">
                    <ResizablePanel
                        defaultSize={20}
                        minSize={11}
                        className="bg-[#5E2C5F]"
                    >
                        <WorkspaceSidebar />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={20}>
                        {children}
                    </ResizablePanel>
                    {showPanel && (
                        <>
                            <ResizableHandle withHandle />
                            <ResizablePanel minSize={20} defaultSize={29}>
                                Load Thread
                            </ResizablePanel>
                        </>
                    )}
                </ResizablePanelGroup>
            </div>
        </div>
    );
};

export default WorkspaceIdLayout;
