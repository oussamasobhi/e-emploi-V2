import { API_BASE_URL } from "../constant";

const request = async (options) => {
  const headers = new Headers({
    "Content-type": "application/json",
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

export function updateUser(username, user) {
  return request({
    url: API_BASE_URL + "/admin/users/edit/" + username,
    method: "PUT",
    body: JSON.stringify(user),
  });
}

export function updateProfil(user) {
  return request({
    url: API_BASE_URL + "/api/users/edit",
    method: "PUT",
    body: JSON.stringify(user),
  });
}

export function deleteCurrentUser() {
  return request({
    url: API_BASE_URL + "/api/users/delete",
    method: "DELETE",
  });
}

export function deleteUserByUsername(username) {
  return request({
    url: API_BASE_URL + "/admin/users/delete/" + username,
    method: "DELETE",
  });
}

export function addAddress(address) {
  return request({
    url: API_BASE_URL + "/users/address/add",
    method: "POST",
    body: JSON.stringify(address),
  });
}

export function editAddress(address, id) {
  return request({
    url: API_BASE_URL + "/users/address/edit/" + id,
    method: "PUT",
    body: JSON.stringify(address),
  });
}

export function deleteAddress(id) {
  return request({
    url: API_BASE_URL + "/users/address/delete/" + id,
    method: "DELETE",
  });
}

export function addSociete(societe) {
  return request({
    url: API_BASE_URL + "/societe/create",
    method: "POST",
    body: JSON.stringify(societe),
  });
}

export function deleteSociete(id) {
  return request({
    url: API_BASE_URL + "/societe/" + id + "/delete",
    method: "DELETE",
  });
}

export function updateSociete(id, societe) {
  return request({
    url: API_BASE_URL + "/societe/" + id + "/edit",
    method: "PUT",
    body: JSON.stringify(societe),
  });
}

export function addSkill(skill) {
  return request({
    url: API_BASE_URL + "/users/competence/add",
    method: "POST",
    body: JSON.stringify(skill),
  });
}

export function getSkills() {
  return request({
    url: API_BASE_URL + "/users/competence/",
    method: "GET",
  });
}

export function deleteSkill(id){
  return request({
    url: API_BASE_URL+ "/users/competence/delete/"+id,
    method: "DELETE"
  })
}