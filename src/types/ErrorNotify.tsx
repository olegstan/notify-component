import React from 'react';
import NotifyManager from "../NotifyManager";
import BaseNotifyProps from "./BaseNotifyProps";
import useRendered from "./useRendered";
import getNotifyStyle from "./getNotifyStyle";
import {NotifyItem} from "./../styles";
import {ReactComponent as CloseError} from '../images/ic_close_error.svg';
import {Preload, Content} from './styles';

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
        }} onClick={onClick}>
            <Content>
                <div className="text">{text}</div>
                <CloseError className="close" onClick={() => NotifyManager.delete(id)} />
            </Content>
        </NotifyItem>
    );
};