import React from 'react';
import NotifyManager from "../NotifyManager";
import BaseNotifyProps from "./BaseNotifyProps";
import useRendered from "./hooks/useRendered";
import getNotifyStyle from "./getNotifyStyle";
import {NotifyItem} from "./../styles";
import {ReactComponent as CloseInfo} from '../images/ic_close_info.svg';
import {Content} from './styles';

export const WarningNotify: React.FC<BaseNotifyProps> = ({
                                                             id,
                                                             text,
                                                             onClick,
                                                             needRemove,
                                                         }) => {
    const rendered = useRendered();
    const style = getNotifyStyle(rendered, needRemove);

    return (
        <NotifyItem
            style={style}
            onClick={onClick}
        >
            <Content>
                <CloseInfo
                    className="close"
                    onClick={() => NotifyManager.delete(id)}
                />
                <div className="text">{text}</div>
            </Content>
        </NotifyItem>
    );
};