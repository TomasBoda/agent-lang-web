import { PageContainer } from "../Components.styles"
import { Transition } from "@/src/components/transition";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <PageContainer>
            <Transition />
            {children}
        </PageContainer>
    )
}