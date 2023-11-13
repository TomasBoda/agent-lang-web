import { useStorageService } from "@/src/screens/sandbox/services/storage.service";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Toolbar from "./Toolbar.component";
import CodeEditor from "../views/CodeEditor.view";
import { useCodeService } from "../services/code.service";
import Button from "@/src/components/Button.component";
import Visualisation from "../views/Visualisation.view";
import { useViewService } from "../services";

export default function Editor() {

    const storageService = useStorageService();
    const codeService = useCodeService();
    const viewService = useViewService();

    const [label, setLabel] = useState("");
    const [code, setCode] = useState("");
    const [steps, setSteps] = useState(0);
    const [delay, setDelay] = useState(0);

    const [view, setView] = useState(0);

    useEffect(() => {
        subscribeToCodeService();
    }, [codeService]);

    useEffect(() => {
        subscribeToViewService();
    }, [viewService]);

    function subscribeToCodeService(): void {
        codeService?.getCode().subscribe(data => {
            setLabel(data.label);
            setCode(data.code);
            setSteps(data.steps);
            setDelay(data.delay);
        });
    }

    function subscribeToViewService(): void {
        viewService?.getView().subscribe(data => setView(data));
    }

    function save(): void {
        if (label.trim() === "" || code.trim() === "") {
            return;
        }

        storageService?.save(label, code, steps, delay);
    }

    function remove(): void {
        storageService?.remove(label);
        codeService?.setEmpty();
    }

    return (
        <Container>
            <Edit>
                <LabelField type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Enter project label..." />
                <Button size="small" onClick={() => save()}>Save</Button>
                <Button size="small" onClick={() => remove()}>Remove</Button>
            </Edit>

            <Toolbar />
            
            {view === 0 && <CodeEditor code={code} setCode={setCode} />}
            {view === 2 && <Visualisation code={code} />}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;

    max-height: calc(100vh - 30px) !important;
    min-height: calc(100vh - 30px) !important;

    display: flex;
    flex-direction: column;

    border-radius: 5px;

    background-color: rgb(10, 10, 10);
`;

const Edit = styled.div`
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 10px;
    align-items: center;

    padding: 15px 20px;
`;

const LabelField = styled.input`
    color: white;
    font-size: 16px;
    font-weight: 500;

    border: none;
    outline: none;

    background-color: transparent;
`;