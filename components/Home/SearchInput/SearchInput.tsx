import { useRouter } from 'next/router';
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import useQuestions from '../../../hooks/useQuestions';
import { Input } from './SearchInput.styled';

interface SearchInputProps extends Props {
  initSearchKeyword: string;
}

const SearchInput = ({ initSearchKeyword }: SearchInputProps) => {
  const router = useRouter();
  const { getQuestions } = useQuestions();

  const [searchKeyword, setSearchKeyword] = useState(initSearchKeyword);
  const changeSearchKeyword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchKeyword(e.target.value);
  };
  const searchWithKeyword: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      const query = searchKeyword && `?searchKeyword=${searchKeyword}`;
      router.push(query, query, { shallow: true });

      getQuestions(searchKeyword);
    }
  };

  return (
    <Input
      type="text"
      value={searchKeyword}
      placeholder="검색어를 입력해주세요."
      onChange={changeSearchKeyword}
      onKeyUp={searchWithKeyword}
    />
  );
};

export default SearchInput;
