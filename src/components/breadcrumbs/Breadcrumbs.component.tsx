
import { Container, Item, Label, Slash } from "./Breadcrumbs.styles";
import { Breadcrumb } from "./breadcrumb";

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {

    function isNotLast(index: number): boolean {
        return index !== breadcrumbs.length - 1;
    }

    return (
        <Container>
            {breadcrumbs.map((item: Breadcrumb, index: number) => (
                <Item key={index}>
                    <Label href={item.path}>{item.title}</Label>
                    {isNotLast(index) && <Divider />}
                </Item>
            ))}
        </Container>
    )
}

const Divider = () => {
    return <Slash>/</Slash>
}