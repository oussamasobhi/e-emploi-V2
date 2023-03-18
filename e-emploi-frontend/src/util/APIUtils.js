import { API_BASE_URL } from "../constant";

const request = async (options) => {
  const headers = new Headers({
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credentials": "true",
  });
  if (localStorage.getItem("token") !== "") {
    headers.append("Authorization", "Bearer " + localStorage.getItem("token"));
  }
  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);
  const response = await fetch(options.url, options);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const res = await response.json();
  return res;
};

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}

export function isAvailableEmail(email) {
  return request({
    url: API_BASE_URL + "/api/user/checkEmailAvailability?email=" + email,
    method: "GET",
  });
}
export async function isAvailableUsername(username) {
  return await request({
    url:
      API_BASE_URL + "/api/user/checkUsernameAvailability?username=" + username,
    method: "GET",
  });
}
export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}
export function getCurrentUser() {
  return request({
    url: API_BASE_URL + "/api/user/me",
    method: "GET",
  });
}

export function getUserByUsername(username) {
  return request({
    url: API_BASE_URL + "/admin/users/" + username,
    method: "GET",
  });
}

export function getAllUsers() {
  return request({
    url: API_BASE_URL + "/admin/users",
    method: "GET",
  });
}

export function updateUser(username,user) {
  return request({
    url: API_BASE_URL + "/admin/edit/users" + username,
    method: "PUT",
    body: JSON.stringify(user)
  })
}

export function updateProfil(user) {
  return request({
    url: API_BASE_URL + "/api/users/edit",
    method: "PUT",
    body: JSON.stringify(user)
  })
}

export function deleteCurrentUser() {
  return request({
    url:  API_BASE_URL + "/api/users/delete",
    method: "DELETE"
  })
}
