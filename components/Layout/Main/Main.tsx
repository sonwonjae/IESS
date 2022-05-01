import { MainContainer, MainWrapper, Blank } from './Main.styled';

interface MainProps extends Props {}

const Main = ({ children }: MainProps) => {
  return (
    <MainContainer>
      <MainWrapper>
        {children}
        <Blank />
      </MainWrapper>
    </MainContainer>
  );
};

export default Main;
