import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button";
import {useState} from "react";
import { RedocStandalone } from "redoc";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [showDocs, setShowDocs] = useState(true);

    return (
        <div className="flex h-screen flex-col">
            {/* 헤더 부분: 사이드바를 제외한 상단 영역에 위치 */}
            <header className="bg-gray-100 p-4 flex items-center w-full z-10 fixed top-0 left-0 right-0">
                <Button variant="ghost" onClick={() => setShowDocs(!showDocs)}>
                    Overview
                </Button>
                <Button variant="ghost" onClick={() => setShowDocs(!showDocs)}>
                    API Docs
                </Button>
                <Button variant="ghost" onClick={() => setShowDocs(!showDocs)}>
                    Create project
                </Button>
            </header>

            {/* 사이드바와 메인 컨텐츠 영역 */}
            <SidebarProvider>
                <div className="flex h-screen pt-16"> {/* pt-16으로 헤더 공간을 확보 */}
                    <AppSidebar />
                    <main className="flex-1 p-4 overflow-auto">
                        {showDocs ? (
                            <div className="h-full overflow-auto bg-white p-4">
                                <RedocStandalone specUrl="http://petstore.swagger.io/v2/swagger.json" />
                            </div>
                        ) : (
                            children
                        )}
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
}