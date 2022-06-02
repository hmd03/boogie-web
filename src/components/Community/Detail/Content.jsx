import React from 'react';
import styled from 'styled-components';
import { VscEllipsis } from 'react-icons/vsc';
import CommentAndLike from '../Common/CommentAndLike';
import ProfileImage from '../../Ui/ProfileImage';

const Container = styled.article`
  box-sizing: border-box;
  background-color: #fff;
  border-bottom: 1px solid #e1e2e3;
  margin-bottom: 2rem;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.span`
  font-size: 0.875rem;
  font-weight: bold;
`;

const TimeStamp = styled.span`
  font-size: 0.75rem;
  color: #666;
  line-height: 100%;
`;

const Middle = styled.div``;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: bold;
  word-break: break-all;
  margin-top: 5.5rem;
  margin-bottom: 2rem;
`;

const Detail = styled.p`
  font-size: 1.7rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: keep-all;
  text-align: left;
  margin-bottom: 5rem;
`;

const Bottom = styled.div`
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;
`;

const Content = ({
  profileImageURL,
  userNickname,
  fromNowWhileAgoPosted,
  title,
  content,
  commentCount,
  likeCount,
  isLiked,
  onLikeClickHandler,
}) => {
  return (
    <Container>
      <Top>
        <ProfileImage src={profileImageURL} size={36} />
        <Info>
          <Name>{userNickname}</Name>
          <span>·</span>
          <TimeStamp>{fromNowWhileAgoPosted}</TimeStamp>
        </Info>
      </Top>
      <Middle>
        <Title>{title}</Title>
        <Detail>{content}</Detail>
      </Middle>
      <Bottom>
        <div>
          <CommentAndLike
            commentCount={commentCount}
            isLiked={isLiked}
            onLikeClickHandler={onLikeClickHandler}
            likeCount={likeCount}
          />
        </div>
        <div>
          <VscEllipsis size={24} />
        </div>
      </Bottom>
    </Container>
  );
};

export default Content;
