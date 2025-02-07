import React, { useEffect, useState } from 'react';
import { NotifyItem } from './styles';
import NotifyManager from './NotifyManager';
import { ReactComponent as CloseInfo } from './images/ic_close_info.svg';
import { ReactComponent as CloseError } from './images/ic_close_error.svg';
import loader from './images/loader.svg';

interface NotifyProps {
  id: number | string;
  needRemove?: boolean;
  type: 'info' | 'error' | 'waiting';
  text: string;
  onClick?: () => void;
  percent?: number;
}

const Notify: React.FC<NotifyProps> = ({
                                         id,
                                         needRemove,
                                         type,
                                         text,
                                         onClick,
                                         percent,
                                       }) => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRendered(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const style: React.CSSProperties = {};
  if (rendered) {
    style.left = 0;
  }
  if (needRemove) {
    style.left = '320px';
  }

  switch (type) {
    case 'info':
      return (
          <NotifyItem style={style} className="notification notification-info">
            <div>
              <CloseInfo
                  className="close"
                  onClick={() => {
                    NotifyManager.delete(id);
                  }}
              />
              <div className="text">{text}</div>
            </div>
          </NotifyItem>
      );
    case 'error':
      return (
          <NotifyItem style={style} onClick={onClick} className="notification notification-error">
            <div>
              <div className="text">{text}</div>
              <CloseError
                  className="close"
                  onClick={() => {
                    NotifyManager.delete(id);
                  }}
              />
            </div>
          </NotifyItem>
      );
    case 'waiting':
      return (
          <NotifyItem style={style} onClick={onClick} className="notification notification-waiting">
            <div className="preload">
              <div style={{ width: percent && percent > 0 ? `${percent}%` : '0%' }} />
            </div>
            <div>
              <img className="load" src={loader} alt="" />
              <CloseInfo
                  className="close"
                  onClick={() => {
                    NotifyManager.delete(id);
                  }}
              />
              <div className="text">{text}</div>
            </div>
          </NotifyItem>
      );
    default:
      return null;
  }
};

export default Notify;