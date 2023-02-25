import React, { useRef, useState } from "react";

const DiaryEditor = ({ onAttache }) => {
  const [state, changeState] = useState({
    //react State 할당은 함수 내부에서 이뤄저야함d
    user: "사용자 이름을 입력해주세요",
    text: "내용을 입력해주세요",
    date: "",
    emotion: "평범", //3
  });
  const userInput = useRef(); // React에서 HTML 요소에 접근하는 방법, DOM을 리액트에서 사용 , 태그에 ref = {변수명} 으로 제어함.
  const textInput = useRef(); //컴포넌트에서 특정 DOM 을 선택해야 할 때, ref 를 사용해야

  const setState = (e) => {
    //input tag의 입력을 State로 처리
    console.log(e); //Onchange로 받으면 이벤트 객체가 하나 들어옴 내가 원하는 대부분의 e.target.value일 것.
    changeState({
      ...state, // spread 연산자로 깔끔하게 처리
      [e.target.name]: e.target.value, // [] 표기법 name이 문자열이므로 name을 state의 키로 똑같이 해서 이용
    });
  };

  const handleSubmit = () => {
    if (
      state.user.length === 0 ||
      state.user === "사용자 이름을 입력해주세요"
    ) {
      userInput.current.focus(); //useRef 를 이용하여 HTML 요소를 관리 , .current는 현재 가지고 있는걸 ret, 처음에 생성자에 넣어준 값이라 생각
      return;
    }
    if (state.text.length === 0 || state.text === "내용을 입력해주세요") {
      textInput.current.focus();
      return;
    }
    //alert("저장완료"); //wip
    onAttache(state);
    changeState({
      user: "사용자 이름을 입력해주세요",
      text: "내용을 입력해주세요",
      date: "",
      emotion: "평범", //평범
    });
  };
  return (
    <div className="DiaryEditor">
      <div className="title">일기장</div>
      <div>
        <span className="info">이름 : </span>
        <input
          ref={userInput}
          name="user"
          value={state.user}
          onChange={setState} // input Tag의 입력을 State 변화로 처리
          className="user"
        />
      </div>
      <div className="info">
        <span>날짜 : </span>
        <input className="calender" type="date"></input>
      </div>
      <div>
        <textarea
          className="textArea"
          ref={textInput} //이 textarea요소에 접근하기 위한 useRef
          name="text"
          value={state.text} //보여지는건 value
          onChange={setState} // 태그에 변화가생김(=이벤트 발생) , onChange 에 call back 함수로 첫 인자로 이벤트 객체가 넘어감
        />
      </div>
      <div>
        <span className="info">오늘의 기분은 ➔</span>
        <select
          name="emotion"
          value={state.emotion} //보여지는건 value
          onChange={setState}
        >
          <option value={"매우 찝찝"}>매우 찝찝</option>
          <option value={"꿀꿀함"}>꿀꿀함</option>
          <option value={"평범"}>평범</option>
          <option value={"좋음"}>좋음</option>
          <option value={"구름 위에 있음"}>구름 위에 있음</option>
        </select>
      </div>

      <button onClick={handleSubmit} className="info">
        일기 저장
      </button>
    </div>
  );
};
export default DiaryEditor;
