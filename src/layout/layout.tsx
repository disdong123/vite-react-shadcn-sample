import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button";
import {useState} from "react";
import { RedocStandalone } from "redoc";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [showDocs, setShowDocs] = useState(true);

    return (
        <SidebarProvider>
            <div className="flex h-screen flex-col">
                <header
                    className="bg-gray-100 p-4 flex justify-between items-center w-full fixed top-0 left-0 right-0 z-10">
                    <SidebarTrigger className="block text-white"/>
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-semibold">Header</h1>
                    </div>
                    <Button variant="ghost" onClick={() => setShowDocs(!showDocs)}>
                        API Docs
                    </Button>
                </header>

                <div className="flex flex-1 pt-16">
                    <AppSidebar/>
                    <main className="flex-1 p-4 overflow-auto">
                        {showDocs ? (
                            <div className="h-full overflow-auto bg-white p-4">
                                <RedocStandalone   specUrl="http://petstore.swagger.io/v2/swagger.json" />
                            </div>
                        ) : (
                            children
                        )}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}

