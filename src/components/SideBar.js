import React from 'react'
import styled from 'styled-components'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import CreateIcon from '@material-ui/icons/Create'
import SidebarOpt from './SidebarOpt'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import AppsIcon from '@material-ui/icons/Apps'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import { auth, db } from '../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

const SideBar = () => {
  const [channel] = useCollection(db.collection('rooms'))
  const user = useAuthState(auth)

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Nature HQ</h2>
          <h3>
            {' '}
            {user[0]?.displayName}
            <FiberManualRecordIcon />
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>

      <SidebarOpt Icon={InsertCommentIcon} title="Threads" />
      <SidebarOpt Icon={InboxIcon} title="Mentions & reactions" />
      <SidebarOpt Icon={DraftsIcon} title="Saved items" />
      <SidebarOpt Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarOpt Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOpt Icon={AppsIcon} title="Apps" />
      <SidebarOpt Icon={FileCopyIcon} title="File Browser" />
      <SidebarOpt Icon={ExpandLessIcon} title="Show less" />
      <hr />
      <SidebarOpt Icon={ExpandMoreIcon} title="Channels" />
      <hr />

      <SidebarOpt Icon={AddIcon} addChannelOpt title=" Add channel" />
      {channel?.docs.map((doc) => (
        <SidebarOpt key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainer>
  )
}

export default SideBar

const SidebarContainer = styled.div`
  color: white;
  background-color: var(--slack--color);
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`
const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 99px;
  }
`
const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin: 5px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }
  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`
