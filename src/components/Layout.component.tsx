import { PageContainer, PageWrapper } from "./Components.styles"
import Footer from "./Footer.component"
import Header from "./Header.component"

export default function Layout({ children }: { children: React.ReactNode }) {
    
    return (
        <PageContainer>
            <Header />
            <PageWrapper>
                {children}
            </PageWrapper>
            <Footer />
        </PageContainer>
    )
}