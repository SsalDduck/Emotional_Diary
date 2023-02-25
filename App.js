import { useRef, useState, useEffect } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [diaryList, setDiary] = useState([]); // diaryList를 DiaryList Component 로 setState() 는 에디터 컴포넌트로 -> state 끌어올리기
  const diaryId = useRef(0); // 어떤 DOM을 가르키고 있는지?

  const getList = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    const initList = res.map((ele) => {
      return {
        // Dummy Data
        user: ele.email,
        text: ele.body,
        date: new Date(
          Math.floor(Math.random() * 10000000000000) + 1
        ).getTime(), //
        emotion: "평범",
        id: diaryId.current++,
      };
    });
    setDiary(initList);
  };
  useEffect(() => {
    getList();
  }, []);
  const onAttache = (diary_info) => {
    const currentTime = new Date().getTime();
    const newDiary = {
      ...diary_info,
      date: currentTime,
      id: diaryId.current++,
    };

    setDiary([newDiary, ...diaryList]);
  };
  const onEdit = (targetID, newText) => {
    setDiary(
      diaryList.map((ele) => {
        return ele.id === targetID ? { ...ele, text: newText } : ele;
      })
    );
  };
  const onDelete = (targetId) => {
    console.log(diaryList);
    const newDiaryList = diaryList.filter((ele) => {
      return ele.id !== targetId;
    });
    setDiary(newDiaryList);
  };

  return (
    <div className="App">
      <DiaryEditor onAttache={onAttache} />
      <DiaryList onEdit={onEdit} diaryList={diaryList} onDelete={onDelete} />
    </div>
  );
}

export default App;
