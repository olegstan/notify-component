import React from 'react';
import Notify from './Notify';

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

  static add(
      title: string,
      text: string,
      type: string,
      time: number,
      onClick?: () => void,
      onClose?: () => void
  ): string | undefined {
    if (!NotifyManager.container) {
      return;
    }

    const id = NotifyManager.id();
    const notify = (
        <Notify
            title={title}
            text={text}
            type={type}
            time={time}
            id={id}
            onClick={() => {
              if (typeof onClick === 'function') {
                onClick();
              }
            }}
            onClose={() => {
              if (typeof onClose === 'function') {
                onClose();
              }
            }}
        />
    );

    // Добавляем уведомление через метод контейнера
    NotifyManager.container.addItem(id, notify);

    // По истечении времени уведомление удаляется
    setTimeout(() => {
      NotifyManager.delete(id);
    }, time);

    return id;
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
    if (!NotifyManager.container) {
      return;
    }

    // Если уведомление с данным идентификатором уже существует, повторно не добавляем
    if (NotifyManager.container.hasItem && NotifyManager.container.hasItem(jobTypeId)) {
      return;
    }

    const notify = (
        <Notify
            title={title}
            text={text}
            type={type}
            time={time}
            id={jobTypeId}
            onClick={() => {
              if (typeof onClick === 'function') {
                onClick();
              }
            }}
            onClose={() => {
              if (typeof onClose === 'function') {
                onClose();
              }
            }}
        />
    );

    NotifyManager.container.addItem(jobTypeId, notify);

    setTimeout(() => {
      NotifyManager.delete(jobTypeId);
    }, time);

    return jobTypeId;
  }

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
    // Контейнер сам отвечает за обновление уведомления (например, установка флага needRemove) и его последующее удаление
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
