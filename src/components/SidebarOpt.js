import React from 'react'
import styled from 'styled-components'
import { db } from '../firebase'
import { useDispatch } from 'react-redux'
import { enterRoom } from '../features/appSlice'

const SidebarOpt = ({ Icon, title, addChannelOpt, id }) => {
  const dispatch = useDispatch()
  const addChannel = () => {
    const channelName = prompt('Please enter channel Name.')
    if (channelName) {
      db.collection('rooms').add({
        name: channelName,
      })
    }
  }
  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      )
    }
  }
  return (
    <SidebarOptContainer onClick={addChannelOpt ? addChannel : selectChannel}>
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title} </h3>
      ) : (
        <SidebarOptChannel>
          <span>#</span> {title}
        </SidebarOptChannel>
      )}
    </SidebarOptContainer>
  )
}

export default SidebarOpt

const SidebarOptContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }
  > h3 {
    font-weight: 500;
  }
  > h3 > span {
    padding: 15px;
  }
`
const SidebarOptChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`
