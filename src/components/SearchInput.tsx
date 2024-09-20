import { Search } from 'lucide-react'
import React from 'react'
import styled from 'styled-components';


const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ffffffa6;
  width: 100%;
`;

const SearchInputField = styled.input`
  width: 100%;
	color: rgb(255, 255, 255);
  padding: 10px;
  font-size: 20px;
  border: none;
  outline: none;
	background-color: transparent;

	&::placeholder {
    color: rgb(255, 255, 255, 0.5);
  }

  &::-webkit-search-cancel-button {
    display: none;
  }
`;

export const SearchInput = () => {
  return (
    <SearchInputContainer>
      <SearchInputField type="search" placeholder="E.g Erevan" />
      <Search size={20} color='#ffffffa6' />
    </SearchInputContainer>
  );
};
