# Emotional_Diary

> 이름과 일기를 작성 후 감정을 선택하고 저장하면 일기장이 저장이 됩니다.<br>
> 누락된 정보가 있는 상황에서 저장을 시도한다면 해당 입력으로 제어가 옮겨가고 저장은 수행되지 않습니다.<br>
> 일기장 밑에는 다른 사람들의 일기를 엿볼 수 있는 일기 목록들이 있습니다!<br><br>
<img width="1249" alt="Diary" src="https://user-images.githubusercontent.com/124281401/221821736-f3f05ec7-15c8-42ed-9c83-9b82b1a0c17d.png">
<img width="1250" alt="List" src="https://user-images.githubusercontent.com/124281401/221821791-843b846a-950f-4332-b14a-a47c49cc1362.png">
<br><br>

## Environment

> 크롬 브라우저를 사용을 권장합니다.<br>

## Files

> React를 사용했기에, HTML 문서가 없고 JS문서들과 하나의 CSS 파일밖에 없습니다.<br>
> 폰트인 '안성탕면체'의 .ttf 파일과 일기장의 배경인 hanok-5830098.jpg 파일은 프리라이선스 임을 확인했습니다.<br>
> 주석이 과도하다 싶을 정도로 많은 원인은 프로젝트 자체의 목적이 React Hooks 사용 숙달이기 때문입니다.<br>

<br>

> #### App.js
>
> index.js 밑에 있는 사실상 최상위 컴포넌트입니다. 사용자들의 diaryList가 배열형식, State로 구현되어 있고,<br> 최초에는 "https://jsonplaceholder.typicode.com/comments" 에서 더미 데이터를 받아옵니다.<br>
> 이 배열은 배열의 원소를 수정하거나 삭제 할수 있는 메서드와 함께, App.js의 자식 컴포넌트인 DiaryList 에게 props로 전달 됩니다.<br>

<br>

> #### DiaryList.js
>
> Js 배열 내부 메서드인 map 활용해서 각 각체들을 자식 Component인 DiaryItem에게 prop으로 넘겨줍니다.<br>
> 부모인 App.js에게 받은 두 메서드도 넘겨줍니다.<br>

<br>

> #### DiaryItem.js
>
> isEdit , editContent 라는 두가지 State를 이용하고, 각 State는 사용자가 편집중인지, 편집하는 텍스트는 무엇인지를 나타냅니다.<br>
> 수정과 삭제를 위한 헨들러기능을 하는 메서드들이 다수 구현되어 있습니다. App.js에서부터 내려온 onDelete,onEdit 함수가 이 핸들러 메서드 내부에서 사용됩니다.<br>

<br>

> #### DiaryEditor.js
>
> App.js의 자식으로 사용자에게 일기 작성을 받아내는 주요 Component입니다.<br>
> 또한 App.js에게 받은 onAttache라는 메서드로 diaryList 배열에 새로운 일기를 배열의 가장 앞에 추가하는 기능을 합니다.<br>
