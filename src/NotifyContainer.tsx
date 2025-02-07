import React, {Fragment, useCallback, useEffect, useState} from 'react';
import NotifyManager from './NotifyManager';
import Portal from './Portal';

interface NotifyContainerProps {
  // ваши пропсы, если нужны
}

interface ChildrenMap {
  [key: string]: React.ReactElement;
}

const NotifyContainer: React.FC<NotifyContainerProps> = () => {
  const [childrenMap, setChildrenMap] = useState<ChildrenMap>({});

  // Метод для добавления уведомления
  const addItem = useCallback((id: string, notify: React.ReactElement) => {
    setChildrenMap((prev) => ({ ...prev, [id]: notify }));
  }, []);

  // Метод для удаления уведомления с анимацией
  const removeItem = useCallback((id: string) => {
    // Этап 1: Обновляем уведомление, чтобы запустить анимацию скрытия
    setChildrenMap((prev) => {
      const newChildren = { ...prev };
      if (newChildren[id]) {
        newChildren[id] = React.cloneElement(newChildren[id], { needRemove: true });
      }
      return newChildren;
    });

    // Этап 2: После задержки удаляем уведомление окончательно
    setTimeout(() => {
      setChildrenMap((prev) => {
        const newChildren = { ...prev };
        delete newChildren[id];
        return newChildren;
      });
    }, 300); // время задержки должно совпадать с длительностью анимации
  }, []);

  // Метод для обновления уведомления (например, процент выполнения)
  const updateItem = useCallback((id: string, percent: number) => {
    setChildrenMap((prev) => {
      if (prev[id]) {
        return { ...prev, [id]: React.cloneElement(prev[id], { percent }) };
      }
      return prev;
    });
  }, []);

  // Метод для проверки наличия уведомления
  const hasItem = useCallback(
      (id: string): boolean => {
        return !!childrenMap[id];
      },
      [childrenMap]
  );

  // Привязываем методы к NotifyManager
  useEffect(() => {
    NotifyManager.bind({ addItem, removeItem, updateItem, hasItem });
  }, [addItem, removeItem, updateItem, hasItem]);

  const notifies = Object.values(childrenMap);

  if (notifies.length === 0) {
    return null;
  }

  return (
      <Portal id="notify">
        {notifies.map((item) => {
          if (item?.props?.id) {
            return <Fragment key={item.props.id}>{item}</Fragment>;
          }
          return null;
        })}
      </Portal>
  );
};

export default NotifyContainer;
