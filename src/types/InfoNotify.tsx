import React from 'react';
import NotifyManager from "../NotifyManager";
import BaseNotifyProps from "./BaseNotifyProps";
import useRendered from "./useRendered";
import getNotifyStyle from "./getNotifyStyle";
import {NotifyItem} from "./../styles";
import {ReactComponent as CloseInfo} from '../images/ic_close_info.svg';

export const InfoNotify: React.FC<BaseNotifyProps> = ({
                                                          id,
                                                          text,
                                                          onClick,
                                                          needRemove,
                                                      }) => {
    const rendered = useRendered();
    const style = getNotifyStyle(rendered, needRemove);

    return (
        <NotifyItem style={style} onClick={onClick}>
            <div>
                <CloseInfo className="close" onClick={() => NotifyManager.delete(id)} />
                <div className="text">{text}</div>
            </div>
        </NotifyItem>
    );
};