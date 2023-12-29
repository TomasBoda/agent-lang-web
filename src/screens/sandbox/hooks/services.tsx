import { useMessageService } from "@/src/services/message.service";
import { useCodeService, useInterpreterService, useStorageService, useViewService } from "../services";

export const useServices = () => {

    const storageService = useStorageService();
    const codeService = useCodeService();
    const viewService = useViewService();
    const interpreterService = useInterpreterService();
    const messageService = useMessageService();

    return { storageService, codeService, viewService, interpreterService, messageService };
}