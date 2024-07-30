import request from "./requset";

export async function login(loginId, password) {
  const result = await request().post("/api/admin/login", {
    loginId: loginId,
    password: password,
  });
  return result.data;
}
export function loginOut() {
  localStorage.removeItem("token");
}
export async function whoAmi() {
  const resp = await request().get("/api/admin/whoami");
  return resp.data;
}
