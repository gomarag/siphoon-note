const userService = require('../../src/services/userService');
const userModel = require('../../src/entities/essay');

test('find all users', () => {
  userModel.users.push(
    { id: 1, email: 'user1@test.com' },
    { id: 2, email: 'user2@test.com' },
    { id: 3, email: 'user3@test.com' }
  );

  const users = userService.findAll();

  expect(users).toHaveLength(3);
  expect(users).toContainEqual({ id: 1, email: 'user1@test.com' });
  expect(users).toContainEqual({ id: 2, email: 'user2@test.com' });
  expect(users).toContainEqual({ id: 3, email: 'user3@test.com' });
});

test('create a user', () => {
  const user = { id: '4', email: 'user4@test.com' };

  userService.create(user);

  expect(userModel.users).toHaveLength(1);
  expect(userModel.users).toContainEqual(user);
});

// 1. 나의 습관 기록 조회
// getMyRecords
//   given: 유저 아이디 필요, 조회할 기간은 가입일 이후 ~ 조회 일자부터
//   when: 로그인 후 글 목록 옆의 넘어가기 버튼 클릭 시
//   then: 현재일자까지 작성한 모든 글의 개수, 연속 작성일, 가입일 이후 최대 작성일 3가지 기록을 출력함

// 2. 캘린더 조회 (Q. 한번에 해당월 데이터만 보낼지, 이전 이력 전부를 보낼지, *일부를 보낼지)
// getMyCalendar
// 일자별 작성 유무가 표시된 캘린더: 조회 월 기준으로 지난 6개월 캘린더까지 서버에서 한번에 전송
//   given: 유저 아이디, 조회일
//   when: 글 목록 화면 전환 버튼 클릭 시(습관 조회 요청이 오면),
//   then: 해당월 -6개월의 습관 OX 리스트

// 3. 나의 계정 정보 조회
// getUserinfos
//   given: 유저 아이디
//   when: 유저가 본인의 회원 정보 조회를 요청하면
//   then: 프로필 이미지, 가입한 이메일, *서비스 닉네임, *블럭 처리된 패스워드, 가입일자, 마지막 정보 수정일자를 출력함

// 4. 나의 계정 정보 수정
// updateUserInfos
//   given: 유저 아이디로 '회원 정보 조회' 상태에서
//   when: (서비스 닉네임, 블럭처리된 패스워드는 입력이 가능한 상태) 닉네임, 패스워드 변경 입력 후 '저장'하기 요청이 들어오면
//   then: 해당 유저의 정보를 변경 처리(Q.변경된 내용을 그대로 반영한 페이지를 보여줄지, 목록 조회화면으로 돌아갈지)

// 5. 매주 위클리 유저 목록 갱신
// updateWeeklyUserList
// 작성한 글의 총 개수가 가장 많은 사용자 4명을 주차별로 선정하고
// 해당 사용자의 닉네임, 작성글 수, 프로필 이미지를 보여준다
//   given: 서비스 가입된 유저의 총 작성글 개수
//   when: 매주 특정 요일, 특정 시간이 되면
//   then: 작성글 수를 내림차순으로 정렬해서 상위 4명의 유저 닉네임, 작성글 수를 갱신해서 출력
