import React from 'react';
import NotifyManager from "../NotifyManager";
import BaseNotifyProps from "./BaseNotifyProps";
import useRendered from "./useRendered";
import getNotifyStyle from "./getNotifyStyle";
import {NotifyItem} from "./../styles";
// @ts-ignore
import {ReactComponent as CloseInfo} from '../images/ic_close_info.svg';
// @ts-ignore
import loader from '../images/loader.svg';
import {Content, Preload} from './styles';

interface LoadingNotifyProps extends BaseNotifyProps {
    percent?: number;
}

export const LoadingNotify: React.FC<LoadingNotifyProps> = ({
                                                                id,
                                                                text,
                                                                onClick,
                                                                needRemove,
                                                                percent,
                                                            }) => {
    const rendered = useRendered();
    const style = getNotifyStyle(rendered, needRemove);

    return (
        <NotifyItem style={style} onClick={onClick}>
            <Preload>
                <div style={{ width: percent && percent > 0 ? `${percent}%` : '0%' }} />
            </Preload>
            <Content>
                <img className="load" src={loader} alt="" />
                <CloseInfo className="close" onClick={() => NotifyManager.delete(id)} />
                <div className="text">{text}</div>
            </Content>
        </NotifyItem>
    );
};