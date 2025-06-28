import React from 'react';
import NotifyManager from "../NotifyManager";
import BaseNotifyProps from "./BaseNotifyProps";
import useRendered from "./hooks/useRendered";
import getNotifyStyle from "./getNotifyStyle";
import {NotifyItem} from "./../styles";
//@ts-ignore
import closeErrorIcon from '../images/ic_close_error.svg';
import {Content} from './styles';

export const InfoNotify: React.FC<BaseNotifyProps> = ({
                                                          id,
                                                          text,
                                                          onClick,
                                                          needRemove,
                                                      }) => {
    const rendered = useRendered();
    const style = getNotifyStyle(rendered, needRemove);

    return (
        <NotifyItem className='info' style={style} onClick={onClick}>
            <Content>
                <img src={closeErrorIcon} className="close" alt="Close" onClick={() => NotifyManager.delete(id)} />
                <div className="text">{text}</div>
            </Content>
        </NotifyItem>
    );
};