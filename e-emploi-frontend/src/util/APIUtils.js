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
export function proSignup(signupRequest){
  return request({
    url: API_BASE_URL + "/auth/signup/pro",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}
export function getProUsers(){
  return request({
    url: API_BASE_URL+"/api/pro",
    method: "GET"
  })
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
export function userGetUserById(id){
  return request({
    url: API_BASE_URL+"/api/users?id="+id,
    method: "GET"
  })
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
    url: API_BASE_URL + "/category",
    method: "GET",
  });
}
export function getSousCategories(id) {
  return request({
    url: API_BASE_URL + "/category/souscategory/" + id,
    method: "GET",
  });
}
export function getSousCategory(id){
  return request({
    url: API_BASE_URL+"/category/souscategory/this/"+id,
    method: "GET"
  })
}
export function getSousCategories2(id) {
  return request({
    url: API_BASE_URL + "/category/soussouscategory/" + id,
    method: "GET",
  });
}
export function getAllSousCatagorie(){
  return request({
    url: API_BASE_URL + "/category/souscategory",
    method: "GET"
  });
}
export function getAllPostulations(){
  return request({
    url: API_BASE_URL+"/annonceuser"
  })
}


export function createAnnonce(annonce) {
  return request({
    url: API_BASE_URL + "/annonce/add",
    method: "POST",
    body: JSON.stringify(annonce),
  });
}
export function deleteAnnonce(id){
  return request({
    url: API_BASE_URL+"/annonce/delete/"+id,
    method: "DELETE"
  });
}

export function terminerAnnonce(id){
  return request({
    url: API_BASE_URL+"/annonce/terminer/"+id,
    method: "PUT"
  })
}

export function getAnnonceById(id) {
  return request({
    url: API_BASE_URL+"/annonce/"+id,
    method: "GET"
  })
}
export function getAllAnnonces(){
  return request({
    url: API_BASE_URL+"/annonce",
    method:"GET"
  })
}
export function getAnnoncesByUserId(id){
  return request({
    url: API_BASE_URL+"/annonce/mesdemandes/"+id,
    method: "GET"
  })
}

export function saveMessage(message){
  return request({
    url: API_BASE_URL+"/message/add",
    method: "POST",
    body: JSON.stringify(message)
  });
}

export function getMessages(username, idannonce, username2){
  return request({
    url: API_BASE_URL+"/message/"+username+"/chat/"+idannonce+"/"+username2,
    method: "GET",
  })
}

export function getChatUsers(username){
  return request({
    url: API_BASE_URL+"/chat-users/"+username,
    method: "GET"
  })
}

export function getChatUsersByAnnonce(idAnnonce){
  return request({
    url: API_BASE_URL+"/chat-users/"+idAnnonce,
    method: "GET"
  })
}

//files
const fileRequest = async (options) => {
  const headers = new Headers({
    //"Content-type": "multipart/form-data;boundary=<calculated when request is sent>",
    
  });
  if (localStorage.getItem("token") !== "") {
    headers.append("Authorization", "Bearer " + localStorage.getItem("token"));
  }
  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);
  const response = await fetch(options.url, options);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const res = await response.json();
  return res;
};


export function uploadFile(file){
  return fileRequest({
    url: API_BASE_URL+"/upload",
    method: "POST",
    body: file
  })
}
export function downloadFile(filename){
  return request({
    url: API_BASE_URL+"/download/"+filename,
    method: "GET"
  })
}

export function uploadPdp(photo){
  return fileRequest({
    url: API_BASE_URL+"/api/photoprofile/add",
    method : "POST",
    body : photo
  })
}

export function addAnnonceUser(postuleAnnonce){
  return request({
    url: API_BASE_URL+"/annonceuser/add",
    method: "POST",
    body: JSON.stringify(postuleAnnonce)
  });
}

export function getPostulationsByUserId(iduser){
  return request({
    url: API_BASE_URL+"/annonce/postulations/"+iduser,
    method: "GET"
  })
}

export function addFileAnnonce(idannonce, file){
  return fileRequest({
    url: API_BASE_URL+"/annonce/upload/"+idannonce,
    method: "POST",
    body: file
  });
}
export function getAnnonceFiles(idannonce){
  return request({
    url: API_BASE_URL+"/annonce/download/"+idannonce,
    method:"GET",
  })
}

export function addPostuleFile(idannonce, iduser, file){
  return fileRequest({
    url: API_BASE_URL+"/annonceuser/upload/"+idannonce+"/"+iduser,
    method: "POST",
    body: file
  })
}

export function getAnnonceUser(idannonce, iduser){
  return request({
    url: API_BASE_URL+"/annonceuser/"+idannonce+"/"+iduser,
    method: "GET"
  })
}

export function accepterOffre(idannonce, iduser){
  return request({
    url: API_BASE_URL+"/annonceuser/accepterreserve/"+idannonce+"/"+iduser,
    method: "PUT"
  })
}
export function upadateAnnonce(idannonce, annonce){
  return request({
    url: API_BASE_URL+"/annonce/edit/"+idannonce,
    method:"PUT",
    body: JSON.stringify(annonce)
  })
}


export function getAnnonceUserByIdUser(iduser){
  return request({
    url: API_BASE_URL+"/annonceuser/"+iduser,
    method: "GET"
  })
}

export function goToDiscussionEngagee(idannonce, iduser){
  return request({
    url: API_BASE_URL+"/annonceuser/updateStatus/discussionEngage/"+idannonce+"/"+iduser,
    method: "PUT"
  })
}

export function goToAccordEtabli(idannonce, iduser){
  return request({
    url: API_BASE_URL+"/annonceuser/updateStatus/accordetablie/"+idannonce+"/"+iduser,
    method: "PUT"
  })
}

export function goToTermine(idannonce, iduser){
  return request({
    url: API_BASE_URL+"/annonceuser/updateStatus/termine/"+idannonce+"/"+iduser,
    method: "PUT"
  })
}

export function getPostuleFiles(idannonce, iduser){
  return request({
    url: API_BASE_URL+"/annonceuser/download/"+idannonce+"/"+iduser,
    method:"GET",
  })
}

export function uploadCompetenceFile(idcomp, file){
  return fileRequest({
    url: API_BASE_URL+"/users/competence/upload/"+idcomp,
    method: "POST",
    body: file,
  })
}

export function getCompetenceFiles(idcomp){
  return request({
    url: API_BASE_URL+"/users/competence/download/"+idcomp,
    method: "GET",
  })
}

export function addReviews (review){
  return request({
    url: API_BASE_URL+"/reviews/add",
    method: "POST",
    body: JSON.stringify(review)
  })
}

export function getReviews (iduser){
  return request({
    url: API_BASE_URL+"/reviews/"+iduser,
    method: "GET"
  })
}