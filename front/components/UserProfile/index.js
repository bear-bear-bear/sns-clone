import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';

import { logoutRequestAction } from '../../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          <Link href={`/user/${me.id}`}>
            <a>올린 글<br />{me.Posts.length}</a>
          </Link>
        </div>,
        <div key="following">
          <Link href="/profile">
            <a>팔로잉<br />{me.Followings.length}</a>
          </Link>
        </div>,
        <div key="follower">
          <Link href="/profile">
            <a>팔로워<br />{me.Followers.length}</a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta
        avatar={(
          <Link href={`/user/${me.id}`} prefetch={false}>
            <a><Avatar>{me.nickname.slice(0, 2)}</Avatar></a>
          </Link>
        )}
        title={me.nickname}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
