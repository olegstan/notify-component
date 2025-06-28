import React from 'react';
import NotifyManager from "../NotifyManager";
import BaseNotifyProps from "./BaseNotifyProps";
import useRendered from "./hooks/useRendered";
import getNotifyStyle from "./getNotifyStyle";
import {NotifyItem} from "./../styles";
// @ts-ignore
import closeErrorIcon from '../images/ic_close_error.svg';
import {Content} from './styles';

export const ErrorNotify: React.FC<BaseNotifyProps> = ({
                                                           id,
                                                           text,
                                                           onClick,
                                                           needRemove,
                                                       }) => {
    const rendered = useRendered();
    const style = getNotifyStyle(rendered, needRemove);

    return (
        <NotifyItem style={{
            ...style,
            ...{
                backgroundColor: '#EF5E70',
                color: '#fff'
            }
        }} className='notify-error' onClick={onClick}>
            <Content>
                <div className="text">{text}</div>
                <img src={closeErrorIcon} className="close" alt="Close" onClick={() => NotifyManager.delete(id)} />
            </Content>
        </NotifyItem>
    );
};