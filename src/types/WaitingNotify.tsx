import React from 'react';
import NotifyManager from "../NotifyManager";
import BaseNotifyProps from "./BaseNotifyProps";
import useRendered from "./useRendered";
import getNotifyStyle from "./getNotifyStyle";
import {NotifyItem} from "./../styles";
import {ReactComponent as CloseInfo} from '../images/ic_close_info.svg';
import loader from '../images/loader.svg';

interface WaitingNotifyProps extends BaseNotifyProps {
    percent?: number;
}

export const WaitingNotify: React.FC<WaitingNotifyProps> = ({
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
            <div className="preload">
                <div style={{ width: percent && percent > 0 ? `${percent}%` : '0%' }} />
            </div>
            <div>
                <img className="load" src={loader} alt="" />
                <CloseInfo className="close" onClick={() => NotifyManager.delete(id)} />
                <div className="text">{text}</div>
            </div>
        </NotifyItem>
    );
};