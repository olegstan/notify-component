import React from 'react';

const getNotifyStyle = (rendered: boolean, needRemove?: boolean): React.CSSProperties => {
    const style: React.CSSProperties = {};
    if (rendered) style.left = 0;
    if (needRemove) style.left = '320px';
    return style;
};

export default getNotifyStyle;