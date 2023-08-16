import { PageContainer, PageWrapper } from "./Components.styles"
import Footer from "./Footer.component"
import Header from "./Header.component"
import ContactView from "@/src/components/Contact.view";

export default function Layout({ children }: { children: React.ReactNode }) {
    
    return (
        <PageContainer>
            <Header />
            {children}
            <ContactView />
            <Footer />
        </PageContainer>
    )
}