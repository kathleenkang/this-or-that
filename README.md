## This or That

### About

[This or That [디오댓]](https://www.thisorthat.lol/)

- ‘결정장애 놀이터’라는 슬로건으로 출시된 소셜 투표 플랫폼 “디오댓”
- “이게 나아, 저게 나아?” 고민되는 두 가지 선택지를 익명으로 투표에 부치는 형식.
- 결정장애를 가진 사람들도 본인이 아닌 다른 사람들의 문제에는 쉽게 결정을 내리는 경향에 착안하여 서로의 선택을 돕는 유저 커뮤니티를 형성했습니다.
- 베타 테스터들로부터 좋은 반응을 얻어 보다 적극적인 홍보를 앞두고 있습니다.

### Engineering Highlight

- AWS S3, AWS CloudFront, MongoDB Atlas 등 다양한 클라우드 서비스를 활용했습니다.
- React Router와 Context를 통해 페이지 간 상태를 관리했습니다.
- SNS로 바이럴하게 퍼질 수 있도록 기획·디자인·개발했습니다. - 회원가입이 전환율을 떨어뜨릴 거라 판단하여, 브라우저 기반 uid 생성 및 local storage에 보관하기로 결정 - 결과 페이지에 공유 기능 추가 - 모바일 기준으로 디자인 및 개발 - 대부분 카톡, 인스타그램 등의 In-App 브라우저로 진입한다는 점을 고려하여 테스트
