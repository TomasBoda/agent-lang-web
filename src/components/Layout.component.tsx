import { PageContainer, PageWrapper } from "./Components.styles"
import Header from "./Header.component"

export default function Layout({ children }: { children: React.ReactNode }) {
    
    return (
        <PageContainer>
            <Header />

            <PageWrapper>
                {children}
            </PageWrapper>
        </PageContainer>
    )
}