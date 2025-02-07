import React from 'react';
import Notify from './Notify';
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

export default class NotifyManager {
  static container: ContainerInterface | null = null;

  static id(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Создаёт React-элемент уведомления в зависимости от типа.
   * Параметр title оставляем для совместимости (но в текущей реализации не используется).
   */
  private static createNotifyElement(
      id: string,
      type: string,
      text: string,
      time: number,
      onClick?: () => void,
      onClose?: () => void
  ): React.ReactElement {
    switch (type) {
      case 'error':
        return (
            <ErrorNotify
                id={id}
                text={text}
                time={time}
                onClick={onClick}
                onClose={onClose}
            />
        );
      case 'waiting':
        return (
            <WaitingNotify
                id={id}
                text={text}
                time={time}
                onClick={onClick}
                onClose={onClose}
            />
        );
      case 'warning':
        return (
            <WarningNotify
                id={id}
                text={text}
                time={time}
                onClick={onClick}
                onClose={onClose}
            />
        );
      case 'info':
      default:
        return (
            <InfoNotify
                id={id}
                text={text}
                time={time}
                onClick={onClick}
                onClose={onClose}
            />
        );
    }
  }

  /**
   * Устанавливает автоматическое удаление уведомления через заданное время.
   */
  private static scheduleDeletion(id: string, time: number): void {
    setTimeout(() => {
      NotifyManager.delete(id);
    }, time);
  }

  /**
   * Добавляет уведомление с новым сгенерированным id.
   */
  static add(
      title: string,
      text: string,
      type: string,
      time: number,
      onClick?: () => void,
      onClose?: () => void
  ): string | undefined {
    if (!NotifyManager.container) {
      console.error('NotifyManager: контейнер не привязан');
      return;
    }

    const id = NotifyManager.id();
    const notify = NotifyManager.createNotifyElement(id, type, text, time, onClick, onClose);
    NotifyManager.container.addItem(id, notify);
    NotifyManager.scheduleDeletion(id, time);
    return id;
  }

  /**
   * Добавляет уведомление, если уведомление с таким id ещё не существует.
   */
  static once(
      jobTypeId: string,
      title: string,
      text: string,
      type: string,
      time: number,
      onClick?: () => void,
      onClose?: () => void
  ): string | undefined {
    if (!NotifyManager.container) {
      console.error('NotifyManager: контейнер не привязан');
      return;
    }

    if (NotifyManager.container.hasItem && NotifyManager.container.hasItem(jobTypeId)) {
      return;
    }

    const notify = NotifyManager.createNotifyElement(jobTypeId, type, text, time, onClick, onClose);
    NotifyManager.container.addItem(jobTypeId, notify);
    NotifyManager.scheduleDeletion(jobTypeId, time);
    return jobTypeId;
  }

  // Обёртки для конкретных типов уведомлений

  static infoOnce(
      id: string,
      title: string,
      text: string,
      time: number = 4000,
      onClick?: () => void,
      onClose?: () => void
  ) {
    return NotifyManager.once(id, title, text, 'info', time, onClick, onClose);
  }

  static errorOnce(
      id: string,
      title: string,
      text: string,
      time: number = 4000,
      onClick?: () => void,
      onClose?: () => void
  ) {
    return NotifyManager.once(id, title, text, 'error', time, onClick, onClose);
  }

  static info(
      title: string,
      text: string,
      time: number = 4000,
      onClick?: () => void,
      onClose?: () => void
  ) {
    return NotifyManager.add(title, text, 'info', time, onClick, onClose);
  }

  static warning(
      title: string,
      text: string,
      time: number = 4000,
      onClick?: () => void,
      onClose?: () => void
  ) {
    return NotifyManager.add(title, text, 'warning', time, onClick, onClose);
  }

  static error(
      title: string,
      text: string,
      time: number = 4000,
      onClick?: () => void,
      onClose?: () => void
  ) {
    return NotifyManager.add(title, text, 'error', time, onClick, onClose);
  }

  static delete(jobTypeId: string) {
    if (!NotifyManager.container) {
      return;
    }
    NotifyManager.container.removeItem(jobTypeId);
  }

  static update(jobTypeId: string, percent: number) {
    if (!NotifyManager.container) {
      return;
    }
    NotifyManager.container.updateItem(jobTypeId, percent);
  }

  static bind(container: ContainerInterface) {
    this.container = container;
  }
}