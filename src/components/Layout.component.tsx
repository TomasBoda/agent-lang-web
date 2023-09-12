import { PageContainer } from "./Components.styles"

export default function Layout({ children }: { children: React.ReactNode }) {
    
    return (
        <PageContainer>
            {children}
        </PageContainer>
    )
}