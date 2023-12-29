// pages/api/user/check-username.js
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    // 데이터베이스에서 사용자 정보를 조회합니다.
    const user = await findUserBySession(session);
    if (user && !user.username) {
      // 유저네임이 없다면 클라이언트에 상태 코드를 전달합니다.
      res.status(200).json({ usernameRequired: true });
    } else {
      // 유저네임이 있다면, 사용자가 이미 설정되어 있음을 전달합니다.
      res.status(200).json({ usernameRequired: false, username: user.username });
    }
  } else {
    // 세션이 없다면, 인증되지 않음을 응답합니다.
    res.status(401).json({ message: "Unauthorized" });
  }
}
