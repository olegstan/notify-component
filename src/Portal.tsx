import React, {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  id: string;
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ id, children }) => {
  const elRef = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    const rootElement = document.getElementById(id);
    if (!rootElement) {
      console.error(`Portal: элемент с id "${id}" не найден.`);
      return;
    }

    try {
      rootElement.appendChild(elRef.current);
    } catch (error) {
      console.error('Portal: ошибка при добавлении элемента', error);
    }

    return () => {
      try {
        rootElement.removeChild(elRef.current);
      } catch (error) {
        console.error('Portal: ошибка при удалении элемента', error);
      }
    };
  }, [id]);

  return ReactDOM.createPortal(children, elRef.current);
};

export default Portal;