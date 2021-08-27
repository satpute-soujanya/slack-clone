import React from 'react'
import styled from 'styled-components'

const Msg = ({ message, timeStamps, user, userImage }) => {
  return (
    <MessageContainer>
      <img src={userImage} alt="" />
      <MsgInfo>
        <h4>
          {user} <span>{new Date(timeStamps?.toDate()).toUTCString()}</span>
        </h4>
        <p>{message}</p>
      </MsgInfo>
    </MessageContainer>
  )
}

export default Msg

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  > img {
    height: 50px;
    object-fit: contain;
    border-radius: 8px;
  }
`

const MsgInfo = styled.div`
  padding-left: 10px;
  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 40px;
    font-size: 10px;
  }
`
