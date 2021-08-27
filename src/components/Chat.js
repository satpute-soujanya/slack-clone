import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import { useSelector } from 'react-redux'
import { selectRoomId } from '../features/appSlice'
import ChatInput from './ChatInput'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import Msg from './Msg'
const Chat = () => {
  const chatRef = useRef(null)
  const roomId = useSelector(selectRoomId)
  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  )
  const [roomMsgs, loading] = useCollection(
    roomId &&
      db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timeStamps', 'asc')
  )
  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [roomId, loading])
  return (
    <ChatContainer>
      {roomDetails && roomMsgs && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderIcon />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <HelpOutlineIcon /> Details
              </p>
            </HeaderRight>
          </Header>

          <ChatMsg>
            {roomMsgs?.docs.map((doc) => {
              const { message, timeStamps, user, userImage } = doc.data()
              return (
                <Msg
                  key={doc.id}
                  message={message}
                  timeStamps={timeStamps}
                  user={user}
                  userImage={userImage}
                />
              )
            })}
            <ChatBottom ref={chatRef} />
          </ChatMsg>
          <ChatInput
            chatRef={chatRef}
            channelId={roomId}
            channelName={roomDetails?.data().name}
          />
        </>
      )}
    </ChatContainer>
  )
}

export default Chat
const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid gray;
`
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 20px;
    font-size: 18px;
  }
`
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`
const ChatBottom = styled.div`
  padding-bottom: 200px;
`
const ChatMsg = styled.div``
