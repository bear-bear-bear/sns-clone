import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import UserProfile from '../UserProfile';
import LoginForm from '../LoginForm';
import useInput from '../../hooks/useInput';

import * as S from './styles';

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    const filteredHashtag = searchInput.replace(/[#\s]/g, '');
    if (filteredHashtag === '') return;

    Router.push(`/hashtag/${filteredHashtag}`);
  }, [searchInput]);

  return (
    <>
      <Head>
        <meta property="og:image" content="https://bearsns.com/favicon.ico" />
      </Head>
      <S.Global />
      <S.Header>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link href="/">
              <a><img src="/logo.jpg" alt="로고" width={48} height={48} /></a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <S.SearchInput
              size="large"
              enterButton
              value={searchInput}
              onChange={onChangeSearchInput}
              onSearch={onSearch}
              placeholder="해쉬태그 검색"
            />
          </Menu.Item>
          { me ? (
            <Menu.Item>
              <Link href="/profile">
                <S.Anchor>프로필</S.Anchor>
              </Link>
            </Menu.Item>
          ) : (
            <Menu.Item>
              <Link href="/signup">
                <S.Anchor>회원가입</S.Anchor>
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </S.Header>
      <S.Container>
        <aside>
          {me ? <UserProfile /> : <LoginForm />}
        </aside>
        <main>{children}</main>
        <aside>
          <S.Anchor
            href="https://github.com/bear-bear-bear"
            target="_blank"
            rel="noopener noreferrer"
          >
            <S.MadebyWrapper>
              Made by <S.IconWrapper><GithubOutlined /></S.IconWrapper> bear-bear-bear
            </S.MadebyWrapper>
          </S.Anchor>
        </aside>
      </S.Container>
    </>
  );
};

AppLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
