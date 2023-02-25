import { useState } from "react";

const DiaryItem = ({ user, text, date, emotion, id, onDelete, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(text);
  const editHandler = () => {
    setIsEdit(!isEdit);
  };
  const quitEditHandler = () => {
    setIsEdit(false);
    setEditContent(text);
  };
  const completeEditHandler = () => {
    onEdit(id, editContent);
    setIsEdit(false);
    //editHandler();
  };
  const DeleteHandler = () => {
    if (window.confirm(`${id + 1}번째 일기를 삭제하시겠습니까?`)) onDelete(id);
    console.log(id);
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>작성자 : {user}</span>
        <span> 기분 : {emotion}</span>
        <br />
        <span className="date">날짜 : {new Date(date).toLocaleString()}</span>
      </div>

      <div className="text">
        내용:
        {isEdit ? (
          <textarea
            value={editContent}
            onChange={(ele) => {
              setEditContent(ele.target.value);
            }}
          ></textarea>
        ) : (
          <div>{text}</div>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={quitEditHandler}>수정 취소</button>
          <button onClick={completeEditHandler}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={DeleteHandler}>삭제하기</button>
          <button onClick={editHandler}>수정하기</button>
        </>
      )}
    </div>
  );
};
export default DiaryItem;
