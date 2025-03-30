import React from 'react';
export type ContainerInterface = {
    addItem: (id: string, notify: React.ReactElement) => void;
    removeItem: (id: string) => void;
    updateItem: (id: string, percent: number) => void;
    hasItem?: (id: string) => boolean;
};
interface NotifyManagerInterface {
    info: (title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void) => string | undefined;
    error: (title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void) => string | undefined;
    warning: (title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void) => string | undefined;
    loading: (title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void) => string | undefined;
    infoOnce: (id: string, title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void) => string | undefined;
    errorOnce: (id: string, title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void) => string | undefined;
    warningOnce: (id: string, title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void) => string | undefined;
    loadingOnce: (id: string, title: string, text: string, time?: number, onClick?: () => void, onClose?: () => void) => string | undefined;
}
interface NotifyManager extends NotifyManagerInterface {
}
/**
 *
 */
declare class NotifyManager {
    static container: ContainerInterface | null;
    static id(): string;
    private static normalizeText;
    private static createNotifyElement;
    private static scheduleDeletion;
    private static addOrOnce;
    static add(title: string, text: string, type: string, time: number, onClick?: () => void, onClose?: () => void): string | undefined;
    static once(jobTypeId: string, title: string, text: string, type: string, time: number, onClick?: () => void, onClose?: () => void): string | undefined;
    static delete(jobTypeId: string): void;
    static update(jobTypeId: string, percent: number): void;
    static bind(container: ContainerInterface): void;
}
export default NotifyManager;
//# sourceMappingURL=NotifyManager.d.ts.map