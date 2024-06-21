import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Badge, Col, Divider } from 'antd'
import { Row, Button } from 'pink-lava-ui'
import { BellOutlined } from '@ant-design/icons'
// import { ReactComponent as NotifIcon } from '../../assets/notif-bell.svg'
export const Notification = ({ items, totalUnread, viewAll, markAsRead, iconSize = 30 }) => {
  const [show, setShow] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={ref}>
      <Badge
        count={`${totalUnread > 0 ? totalUnread : ''}`}
        overflowCount={99}
        style={{ backgroundColor: '#EB008B' }}
      >
        <BellOutlined
          style={{ fontSize: iconSize, cursor: 'pointer', color: 'white' }}
          onClick={() => {
            setShow(!show)
          }}
        />
      </Badge>

      {show && (
        <NotificationContainer>
          <NotificationHeader>
            <p
              style={{
                fontWeight: '600',
                fontSize: '24px',
                lineHeight: '32.74px',
                marginBottom: 0,
              }}
            >
              Notification
            </p>
            {totalUnread > 0 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Badge count={`${totalUnread} New`} style={{ backgroundColor: '#EB008B' }} />
              </div>
            )}
          </NotificationHeader>
          <Divider style={{ margin: 0 }} />
          <NotificationContent>
            {items.length ? (
              items.map((el, index) => (
                <NotificationItem
                  key={index}
                  style={{ backgroundColor: el.isRead ? '#FFFFFF' : '#F4FBFC' }}
                  onClick={() => {
                    el.link && el.link()
                    setShow(!show)
                  }}
                >
                  {el.content}
                </NotificationItem>
              ))
            ) : (
              <div
                style={{
                  fontWeight: 'bold',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '10px',
                }}
              >
                <Row justifyContent={'center'}>
                  <Col>
                    {/* <NotifIcon /> */}
                  </Col>
                </Row>
                <Row justifyContent={'center'}>
                  <Col>
                    <p style={{ color: '#666666' }}>You currently have no notification</p>
                  </Col>
                </Row>
              </div>
            )}
          </NotificationContent>
          <Row justifyContent={'space-between'}>
            {totalUnread > 0 && (
              <NotificationViewAll
                onClick={() => {
                  markAsRead && markAsRead()
                  setShow(!show)
                }}
              >
                <Button variant="ghost">Mark As Read</Button>
              </NotificationViewAll>
            )}
            {totalUnread > 0 && (
              <NotificationViewAll
                onClick={() => {
                  viewAll && viewAll()
                  setShow(!show)
                }}
              >
                <Button variant="ghost">View All</Button>
              </NotificationViewAll>
            )}
          </Row>
        </NotificationContainer>
      )}
    </div>
  )
}

const NotificationViewAll = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 22px 20px;
`

const NotificationContainer = styled.div`
  z-index: 1031;
  position: fixed;
  inset: 0 0 auto auto;
  margin: 0px;
  transform: translate3d(-15px, 60px, 0px);
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 552px;
  animation: all 0.3s ease 1;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 0 50px 0 rgb(82 63 105 / 15%);
`

const NotificationHeader = styled.div`
  display: flex;
  padding: 23px 16px;
  gap: 8px;
`

const NotificationItem = styled.div`
  cursor: pointer;
  padding: 15px 16px;
  border-bottom: 1px solid #f4f4f4;
  transition: 0.3s all;

  &:hover {
    background-color: #ffffff !important;
  }
`

const NotificationContent = styled.div``
