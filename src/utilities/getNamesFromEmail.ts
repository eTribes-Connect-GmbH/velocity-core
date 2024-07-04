import capitalizeFirstLetter from './capitalizeFirstLetter';

const getNamesFromEmail = (email: string) => {
  const groups = /^(?<firstName>\p{L}+)\.(?<lastName>\p{L}+)@/u.exec(email)?.groups;
  if (!groups) {
    return undefined;
  } else {
    return { firstName: capitalizeFirstLetter(groups.firstName), lastName: capitalizeFirstLetter(groups.lastName) };
  }
};

export default getNamesFromEmail;
