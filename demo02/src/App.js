import khLogo from './kh.png';

//JSX에서는 프로그래밍 변수를 속성에 넣기 위해 { }를 사용
//- src='hello'는 경로를 의미
//- src={hello}는 변수를 의미

//JSX에서는 모든 태그가 닫혀야 함

function App() {
  var width = 300;

  return (
    <>
      <h1>KH 정보교육원 React 수업자료</h1>
      <img src={khLogo} width={width}/>
    </>
  );
}

export default App;
