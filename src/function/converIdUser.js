export function convertId(idUser) {
  parseInt(idUser);
  if (idUser < 10) {
    return "user00" + idUser;
  } else if (idUser >= 10) {
    return "user0" + idUser;
  }
}
