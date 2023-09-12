import { PageContainer } from "./Components.styles"
import Transition from "@/src/components/Transition.component";

export default function Layout({ children }: { children: React.ReactNode }) {
    
    return (
        <PageContainer>
            <Transition />
            {children}
        </PageContainer>
    )
}