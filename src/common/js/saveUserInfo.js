import storage from "good-storage";

export function saveToken(user) {
  const { token } = user;
  storage.set("token", token);
  const item = storage.get("token");
  return item;
}
export function saveUserInfo(user) {
  const { username, uid, avatar, status } = user;
  storage.set("userInfo", { username, uid, avatar, status });
  const items = storage.get("userInfo");
  return items;
}
