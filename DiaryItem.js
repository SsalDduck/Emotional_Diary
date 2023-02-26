import React, { useState } from "react";

const DiaryItem = ({ user, text, date, emotion, id, onDelete, onEdit }) => {
  //List의 객체를 각 속성 이름 그대로 받아야함

  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(text); //수정될 내용을 담고 있는 state

  /**isEdit의 토글러 */
  const editHandler = () => {
    setIsEdit(!isEdit);
  };

  const quitEditHandler = () => {
    setIsEdit(false);
    setEditContent(text); //부모인 List에게 물려받은 객체의 text 속성으로 되돌림.
  };

  const completeEditHandler = () => {
    onEdit(id, editContent);
    setIsEdit(false);
    //editHandler();
  };

  const DeleteHandler = () => {
    if (window.confirm(`${id + 1}번째 일기를 삭제하시겠습니까?`)) onDelete(id);
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
export default React.memo(DiaryItem); // 본인의 props가 그대로면 별도의 랜더링을 하지 아니하는 기능
//두번째 인자로 함수를 받는데 , 첫 인자로 이전 props 두번째 인자로 현재 props 를 넣어준다.
//객체의 깊은 복사를 구현하고 same -> return 1;(=Not render)
