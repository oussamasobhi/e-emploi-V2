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
export function logout() {
  return request({
    url: API_BASE_URL + "/auth/logout",
    method: "POST",
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

export function userGetUserByUsername(username) {
  return request({
    url: API_BASE_URL + "/api/users/" + username,
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

export function getSkillsByUsername(username) {
  return request({
    url: API_BASE_URL + "/users/competence/" + username,
    method: "GET",
  });
}

export function deleteSkill(id) {
  return request({
    url: API_BASE_URL + "/users/competence/delete/" + id,
    method: "DELETE",
  });
}

export function updateSkill(id, skill) {
  return request({
    url: API_BASE_URL + "/users/competence/edit/" + id,
    method: "PUT",
    body: JSON.stringify(skill),
  });
}

export function updateSocieteAdress(id, address) {
  return request({
    url: API_BASE_URL + "/societe/" + id + "/address/edit",
    method: "PUT",
    body: JSON.stringify(address),
  });
}

export function deleteSocieteAdress(id) {
  return request({
    url: API_BASE_URL + "/societe/" + id + "/address/delete",
    method: "DELETE",
  });
}

export function newASocieteAddress(id, address) {
  return request({
    url: API_BASE_URL + "/societe/" + id + "/address/create",
    method: "POST",
    body: JSON.stringify(address),
  });
}

export function getListAnnonces(id, page, size, search, min_tarif, max_tarif) {
  if(id===undefined||id===null) id="";
  if (page === undefined || page === null) page = 0;
  if (size === undefined || size === null) size = 30;
  if (max_tarif === undefined || max_tarif === null) max_tarif = 10000;
  if (min_tarif === undefined || min_tarif === null) min_tarif = 0;
  if (search === undefined || search === null) search = "";
  return request({
    url:
      API_BASE_URL +
      "/annonce/category/" +
      id +
      "?page=" +
      page +
      "&size=" +
      size +
      "&search=" +
      search +
      "&min_tarif_dep=" +
      min_tarif +
      "&max_tarif_dep=" +
      max_tarif,
    method: "GET",
  });
}

export function getCategories() {
  return request({
    url: API_BASE_URL + "/category/",
    method: "GET",
  });
}
export function getSousCategories(id) {
  return request({
    url: API_BASE_URL + "/categorie/" + id + "/all",
    method: "GET",
  });
}

export function createAnnonce(annonce) {
  return request({
    url: API_BASE_URL + "/annonce/add",
    method: "POST",
    body: JSON.stringify(annonce),
  });
}

export function getAnnonceById(id) {
  return request({
    url: API_BASE_URL+"/annonce/"+id,
    method: "GET"
  })
}

export function addAnnonceuser(annonceuser){
  return request({
    url: API_BASE_URL+"/annonceuser/add",
    method: "POST",
    body: JSON.stringify(annonceuser)
  })
}