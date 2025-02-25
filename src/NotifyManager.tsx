import React from 'react';
import { ErrorNotify } from "./types/ErrorNotify";
import { WaitingNotify } from "./types/WaitingNotify";
import { InfoNotify } from "./types/InfoNotify";
import { WarningNotify } from "./types/WarningNotify";

type ContainerInterface = {
  addItem: (id: string, notify: React.ReactElement) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, percent: number) => void;
  hasItem?: (id: string) => boolean;
};

const NotifyComponents: Record<string, React.ComponentType<any>> = {
  error: ErrorNotify,
  waiting: WaitingNotify,
  info: InfoNotify,
  warning: WarningNotify,
};

export default class NotifyManager {
  static container: ContainerInterface | null = null;

  static id(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  private static normalizeText(value: any): React.ReactNode {
    if (React.isValidElement(value)) {
      // Если это React-компонент, возвращаем его как есть
      return value;
    }
    if (typeof value === 'string' || typeof value === 'number') {
      // Если это строка или число, преобразуем в строку
      return String(value);
    }
    if (Array.isArray(value)) {
      // Если это массив, обрабатываем каждый элемент рекурсивно
      return value.map((item, index) => (
          <React.Fragment key={index}>{this.normalizeText(item)}</React.Fragment>
      ));
    }
    if (typeof value === 'object' && value !== null) {
      // Если это объект, но не React-компонент, преобразуем в строку
      return JSON.stringify(value);
    }
    // Для всех остальных случаев (null, undefined) возвращаем пустую строку
    return '';
  }

  private static createNotifyElement(
      id: string,
      type: string,
      text: string,
      time: number,
      onClick?: () => void,
      onClose?: () => void
  ): React.ReactElement {

    const normalizedText = this.normalizeText(text); // Преобразуем текст

    const Component = NotifyComponents[type] || NotifyComponents.info;
    return (
        <Component
            id={id}
            text={normalizedText}
            time={time}
            onClick={onClick}
            onClose={onClose}
        />
    );
  }

  private static scheduleDeletion(id: string, time: number): void {
    setTimeout(() => {
      NotifyManager.delete(id);
    }, time);
  }

  private static addOrOnce(
      id: string | undefined,
      title: string,
      text: string,
      type: string,
      time: number,
      onClick?: () => void,
      onClose?: () => void,
      checkIfExists: boolean = false
  ): string | undefined {
    if (!NotifyManager.container) {
      console.error('NotifyManager: контейнер не привязан');
      return;
    }

    const finalId = id ?? NotifyManager.id();

    if (checkIfExists && NotifyManager.container.hasItem?.(finalId)) {
      return;
    }

    const notify = NotifyManager.createNotifyElement(finalId, type, text, time, onClick, onClose);
    NotifyManager.container.addItem(finalId, notify);
    NotifyManager.scheduleDeletion(finalId, time);

    return finalId;
  }

  static add(
      title: string,
      text: string,
      type: string,
      time: number,
      onClick?: () => void,
      onClose?: () => void
  ): string | undefined {
    return NotifyManager.addOrOnce(undefined, title, text, type, time, onClick, onClose);
  }

  static once(
      jobTypeId: string,
      title: string,
      text: string,
      type: string,
      time: number,
      onClick?: () => void,
      onClose?: () => void
  ): string | undefined {
    return NotifyManager.addOrOnce(jobTypeId, title, text, type, time, onClick, onClose, true);
  }

  static delete(jobTypeId: string) {
    NotifyManager.container?.removeItem(jobTypeId);
  }

  static update(jobTypeId: string, percent: number) {
    NotifyManager.container?.updateItem(jobTypeId, percent);
  }

  static bind(container: ContainerInterface) {
    this.container = container;
  }
}

// Динамическое создание методов для типов уведомлений
['info', 'error', 'warning', 'loading'].forEach((type) => {
  NotifyManager.prototype[`${type}Once`] = function (
      id: string,
      title: string,
      text: string,
      time: number = 4000,
      onClick?: () => void,
      onClose?: () => void
  ) {
    return NotifyManager.once(id, title, text, type, time, onClick, onClose);
  };

  NotifyManager.prototype[type] = function (
      title: string,
      text: string,
      time: number = type === 'loading' ? 999999999 : 4000,
      onClick?: () => void,
      onClose?: () => void
  ) {
    return NotifyManager.add(title, text, type, time, onClick, onClose);
  };
});