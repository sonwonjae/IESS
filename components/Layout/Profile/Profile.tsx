import { useState } from 'react';

import { auth } from '../../../firebase';
import { signOut, User } from 'firebase/auth';

import {
  ProfileButton,
  Name,
  UpArrow,
  DownArrow,
  ProfileToolContainer,
} from './Profile.styled';

interface ProfileProps extends Props {
  user: User;
}

const Profile = ({ user }: ProfileProps) => {
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    signOut(auth);
    window.location.href = '/';
  };

  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  };
  return (
    <>
      <ProfileButton onClick={handleShowProfile}>
        <Name>{user.displayName} 님</Name>
        {showProfile ? <UpArrow /> : <DownArrow />}
      </ProfileButton>
      {showProfile && (
        <ProfileToolContainer>
          <button onClick={handleLogout}>로그아웃</button>
        </ProfileToolContainer>
      )}
    </>
  );
};

export default Profile;
