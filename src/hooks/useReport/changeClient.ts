import { client as clientSLS } from './clientAccounting';
import clientDWH from './clientDWH';

export const getClient = () => {
    if (typeof window !== 'undefined') {
        const x: any = localStorage.getItem("report_from");
        return x === "dwh" ? clientDWH : clientSLS;
    } else {
        return clientDWH;
    }
};
