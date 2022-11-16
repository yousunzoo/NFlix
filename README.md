## useAnimation()

- 시작 및 중지 메서드가 있는 AnimationControls를 만들 수 있다.

## useScroll()

- viewport가 스크롤될 때 업데이트되는 motionValues를 반환한다.
- body 또는 html을 height:100% 로 설정하면 페이지 길이를 정확하게 측정하는 브라우저의 기능이 손상되므로 progress 값이 손상된다.
  `const {scrollYProgress} = useScroll()`

# 영화 API 사이트 주소 : themoviedb.org

- div에 background-image를 주기보다 img 태그 써서 배치

* background-size 및 position 조정하는 방법 : img 태그의 css 속성에
  지정할 width, height 작성, `object-fit: cover;` 작성. => img 비율에 맞지 않더라도 지정된 width와 height 값에 맞춰 img가 비율 깨짐 없이 확대 혹은 축소되고 자동으로 가로세로 중앙 정렬됨
