import React, { Fragment, useCallback, useEffect, useState } from 'react';
import NotifyManager, {ContainerInterface} from './NotifyManager';
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
  const addItem: ContainerInterface['addItem'] = useCallback((id, notify) => {
    setChildrenMap((prev) => ({ ...prev, [id]: notify }));
  }, []);

  // Метод для удаления уведомления с анимацией
  const removeItem: ContainerInterface['removeItem'] = useCallback((id) => {
    // Этап 1: Обновляем уведомление, чтобы запустить анимацию скрытия
    setChildrenMap((prev) => {
      const newChildren = { ...prev };
      if (newChildren[id]) {
        //@ts-ignore
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
  const updateItem: ContainerInterface['updateItem'] = useCallback((id, percent) => {
    setChildrenMap((prev) => {
      if (prev[id]) {
        //@ts-ignore
        return { ...prev, [id]: React.cloneElement(prev[id], { percent }) };
      }
      return prev;
    });
  }, []);

  // Метод для проверки наличия уведомления
  const hasItem: ContainerInterface['hasItem'] = useCallback(
      (id: any): boolean => {
        return !!childrenMap[id];
      },
      [childrenMap]
  );

  // Привязываем методы к NotifyManager
  useEffect(() => {
    NotifyManager.bind({ addItem, removeItem, updateItem, hasItem });
  }, [addItem, removeItem, updateItem, hasItem]);

  //@ts-ignore
  const notifies = Object.values(childrenMap);

  if (notifies.length === 0) {
    return null;
  }

  return (
      <Portal id="notify">
        {notifies.map((item: any) => {
          if (item?.props?.id) {
            return <Fragment key={item.props.id}>{item}</Fragment>;
          }
          return null;
        })}
      </Portal>
  );
};

export default NotifyContainer;