import styled from "styled-components";
import Item from "./Item.component";
import { CodeItem } from "../../model";

export default function ItemList({ items }: { items: CodeItem[] }) {
    if (items.length === 0) {
        return;
    }

    function sort(array: CodeItem[]): CodeItem[] {
        return array.sort((a, b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime());

        //return array.sort((a, b) => a.label.localeCompare(b.label));
    }

    return (
        <ListWrapper>
            <List>
                {sort(items).map((item, index) =>
                    <Item item={item} key={index} />
                )}
            </List>
        </ListWrapper>
    )
}

const ListWrapper = styled.div`
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
`;