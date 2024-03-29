import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../../Ui/ProfileImage';
import CommentAndLike from '../Common/CommentAndLike';

const Container = styled.div`
  box-sizing: border-box;
  margin-bottom: 0.125rem;
  padding-bottom: 0.125rem;
  padding: 1.875rem;
  border-bottom: 1px solid #ececec;
`;

const Top = styled.div`
  box-sizing: border-box;
  margin-bottom: 0.875rem;
  display: flex;
  align-items: center;
`;

const Name = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 34rem;
  margin-right: 0.5rem;
`;

const TimeStamp = styled.span`
  color: #666;
  font-size: 0.75rem;
  line-height: 100%;
  margin-left: 0.5rem;
`;

const Middle = styled.div``;

const Title = styled.h3`
  font-size: 1.124rem;
  font-weight: 700;
  margin-bottom: 0.875rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Content = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1rem;
  text-overflow: ellipsis;
  white-space: break-spaces;
  word-break: break-all;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
`;

const Bottom = styled.div`
  display: flex;
`;

const Comment = ({ commentData = {} }) => {
  const {
    id,
    userNickname,
    title,
    content,
    fromNowWhileAgoPosted,
    likeCount,
    commentCount,
    profileImageURL,
    isLiked,
  } = commentData;
  const navigate = useNavigate();

  const onClick = () => {
    if (!id) {
      return;
    }

    navigate(`/community/detail/${id}`);
  };

  return (
    <Container onClick={onClick}>
      <Top>
        <ProfileImage src={profileImageURL} size={24} />
        <Name>{userNickname}</Name>
        <span>·</span>
        <TimeStamp>{fromNowWhileAgoPosted}</TimeStamp>
      </Top>
      <Middle>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </Middle>
      <Bottom>
        <CommentAndLike
          commentCount={commentCount}
          isLiked={isLiked}
          likeCount={likeCount}
        />
      </Bottom>
    </Container>
  );
};

export default Comment;
