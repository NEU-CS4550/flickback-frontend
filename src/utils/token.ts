export function setToken(token: string) {
  document.cookie = `token=${token};Secure;SameSite=None;Path=/`;
}

export function getToken() {
  let segs = document.cookie.split(";");
  for (const seg of segs) {
    if (seg.startsWith("token=")) {
      return seg.substring(6);
    }
  }
  return "";
}

export function clearToken() {
  if (getToken() !== "") {
    document.cookie = "token=;Path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
