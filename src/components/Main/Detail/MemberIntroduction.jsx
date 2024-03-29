import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import uiSlce from '../../../slices/ui';
import CardProfile from '../../Ui/Card/CardProfile';

const StyledSpan = styled.span`
  display: inline-block;
  ${({ index }) => {
    return index % 2 !== 0
      ? `display:flex;
        justify-content: flex-end;`
      : `display:flex;
        justify-content: flex-start;`;
  }};
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 75rem;
  margin: 0 auto;
`;

const MemberIntroduction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    const getMemberList = async () => {
      dispatch(uiSlce.actions.showLoading());
      try {
        const member = await axios.get(
          `api/senier-project/detail/members?id=${id}`
        );
        setMemberList(member.data.senierProjectMemberList);
      } catch (e) {
        alert(e.response.message);
      } finally {
        dispatch(uiSlce.actions.hideLoading());
      }
    };

    getMemberList();
  }, [dispatch, id]);

  const onClick = (event, id) => {
    event.stopPropagation();
    if (!id) {
      return;
    }

    navigate(`/profile/detail/${id}`);
  };

  return (
    <StyledDiv>
      {memberList.map((v, i) => (
        <StyledSpan
          key={i}
          style={{ margin: '3.125rem' }}
          index={i}
          onClick={(event) => {
            onClick(event, v.id);
          }}
        >
          <CardProfile
            profileImg={v.image}
            name={v.name}
            description={v.introduction}
            turn={i}
          ></CardProfile>
        </StyledSpan>
      ))}
    </StyledDiv>
  );
};

export default MemberIntroduction;
