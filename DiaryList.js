import React from "react";
import DiaryItem from "./DiaryItem.js";
const DiaryList = ({ diaryList, onDelete, onEdit }) => {
  // 받는쪽은 부모와 동일하게 객체 디스트럭팅

  return (
    <div className="DiaryList">
      <h2>DiaryList</h2>
      <div>무려 {diaryList.length}개의 일기를 엿볼 수 있습니다.</div>
      {diaryList.map((ele) => (
        <DiaryItem key={ele.id} {...ele} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};
// 문제가 생길 것 같을때를 대비해서 사용하는 기능
DiaryList.defaultProps = {
  user_list: [],
};
export default DiaryList; // ES 모듈 시스템 내보내기
