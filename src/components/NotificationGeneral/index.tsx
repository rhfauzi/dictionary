
import React,{ FC, useEffect } from 'react'
import {Row, Col, Typography, Spin, message, Empty, Popover,notification } from 'antd'


const NotificationGeneral = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (message='',placement='bottomRight' as any) => {
        api.open({
            key:'updatable',
            message,
            placement
        });
    };
    return {
        openNotification,
        contextHolder
    }

}

export default NotificationGeneral