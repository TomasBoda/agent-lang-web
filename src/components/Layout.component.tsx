import { PageContainer, PageWrapper } from "./Components.styles"
import Footer from "./Footer.component"
import Header from "./Header.component"
import ContactView from "@/src/components/Contact.view";
import {useEffect} from "react";
import Offset from "@/src/components/Offset.component";
import Transition from "@/src/components/Transition.component";

export default function Layout({ children }: { children: React.ReactNode }) {
    
    return (
        <PageContainer>
            <Header />
            <Offset />
            {children}
            <ContactView />
            <Footer />

            <Transition />
        </PageContainer>
    )
}