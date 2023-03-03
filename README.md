# commit 형식 기준

feat : 새로운 기능에 대한 커밋<br/>
fix : build 빌드 관련 파일 수정에 대한 커밋<br/>
build : 빌드 관련 파일 수정에 대한 커밋<br/>
chore : 그 외 자잘한 수정에 대한 커밋(rlxk qusrud)<br/>
ci : CI 관련 설정 수정에 대한 커밋<br/>
docs : 문서 수정에 대한 커밋<br/>
style : 코드 스타일 혹은 포맷 등에 관한 커밋<br/>
refactor : 코드 리팩토링에 대한 커밋<br/>
test : 테스트 코드 수정에 대한 커밋<br/>

# error 모음

## 다른 기기에서 npm install 에러 (2/28)

참고 : https://stackoverflow.com/questions/75195099/nextjs-13-1-4-breaks-when-adding-scss-support-cannot-find-module-next-dist-comp
npm install 시 sass 모듈을 못찾는다는 에러가 발생, 현 사용 노드와(14버전)과 맞지 않는다함. 16인 개인 노트북에서만 돌아감.
