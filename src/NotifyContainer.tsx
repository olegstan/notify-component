import React, { Fragment, useCallback, useEffect, useState } from 'react';
import NotifyManager from './NotifyManager';
import Portal from './Portal';

interface NotifyContainerProps {
  // ваши пропсы, если есть
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

  // Метод для удаления уведомления
  const removeItem = useCallback((id: string) => {
    setChildrenMap((prev) => {
      const newChildren = { ...prev };
      if (newChildren[id]) {
        // Можно, например, сначала задать флаг анимации удаления,
        // а потом через timeout удалить уведомление окончательно.
        delete newChildren[id];
      }
      return newChildren;
    });
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

  // Метод для проверки, существует ли уведомление с заданным id
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