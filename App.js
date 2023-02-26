import { useRef, useState, useEffect, useCallback } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
/**웹 앱이라 처음있는 APP 컴포넌트를 최상위로 쓰는 경우가 많다 */
function App() {
  const [diaryList, setDiary] = useState([]); // diaryList를 DiaryList Component 로 setDiary() 는 에디터 컴포넌트로 -> state 끌어올리기
  const diaryId = useRef(0); // 리액트에서 DOM을 쓰는 방법

  const getList = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    const initList = res.slice(0, 26).map((ele) => {
      return {
        // Dummy Data
        user: ele.email,
        text: ele.body,
        date: new Date(
          Math.floor(Math.random() * 10000000000000) + 1
        ).getTime(),
        emotion: "평범",
        id: diaryId.current++,
      };
    });
    setDiary(initList);
  };
  useEffect(() => {
    /*App.js mount시 할 작업 , 생성자와 같은 느낌/ return이 있다면 dismount , 소멸자같은 느낌
  두번째 인자인 DependencyArray(의존성배열)이 빈 배열이 아니라면 , 해당 배열이 바뀔때 callback 함수를 수행함 */
    getList();
  }, []);
  /**DiaryEditor 에서 입력을 받아서 diaryList 배열 앞에 추가하는 함수 */
  const onAttache = useCallback((diary_info) => {
    //props로 사용할 함수는 useCallback으로 최적화함
    const currentTime = new Date().getTime();
    const newDiary = {
      ...diary_info,
      date: currentTime,
      id: diaryId.current++,
    };

    setDiary((diaryList) => {
      /*DependencyArray 를 비우는 대신 함수형 업데이트로 최신 diaryList를 받아오게함
       */
      return [newDiary, ...diaryList];
    });
  }, []);
  const onEdit = useCallback((targetID, newText) => {
    //props로 사용할 함수는 useCallback으로 최적화함
    setDiary((diaryList) => {
      return diaryList.map((ele) => {
        return ele.id === targetID ? { ...ele, text: newText } : ele;
      });
    });
  }, []);
  const onDelete = useCallback((targetId) => {
    setDiary((diaryList) => {
      /*DependencyArray 를 비우는 대신 함수형 업데이트로 최신 diaryList를 받아오게함
       */
      return diaryList.filter((ele) => {
        return ele.id !== targetId;
      });
    });
  }, []);

  return (
    <div className="App">
      <DiaryEditor onAttache={onAttache} />
      <DiaryList onEdit={onEdit} diaryList={diaryList} onDelete={onDelete} />
      {/*props를 보낼때 보내는쪽도 하나의 객체로 묶어서보내고 받는쪽도 하나의 객체로 받음,
      간단한 비구조화 할당임*/}
    </div>
  );
}

export default App;
