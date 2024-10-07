const imageMapping: { [key: string]: string } = {
  Active_Developer: 'https://github.com/cnrad/lanyard-profile-readme/blob/main/public/assets/badges/Active_Developer.png?raw=true',
  Bug_Hunter_Level_1: 'https://github.com/cnrad/lanyard-profile-readme/blob/main/public/assets/badges/Bug_Hunter_Level_1.png?raw=true',
  Bug_Hunter_Level_2: 'https://github.com/cnrad/lanyard-profile-readme/blob/main/public/assets/badges/Bug_Hunter_Level_2.png?raw=true',
  Discord_Certified_Moderator: 'https://github.com/cnrad/lanyard-profile-readme/blob/main/public/assets/badges/Discord_Certified_Moderator.png?raw=true',
  Discord_Employee: 'https://github.com/cnrad/lanyard-profile-readme/blob/main/public/assets/badges/Discord_Employee.png?raw=true',
  Early_Supporter: 'https://github.com/cnrad/lanyard-profile-readme/blob/main/public/assets/badges/Early_Supporter.png?raw=true',
  Early_Verified_Bot_Developer: 'https://github.com/cnrad/lanyard-profile-readme/blob/main/public/assets/badges/Early_Verified_Bot_Developer.png?raw=true',
  House_Balance: 'https://github.com/cnrad/lanyard-profile-readme/blob/main/public/assets/badges/House_Balance.png?raw=true',
  House_Bravery: 'https://github.com/cnrad/lanyard-profile-readme/blob/main/public/assets/badges/House_Bravery.png?raw=true',
  House_Brilliance: 'https://github.com/cnrad/lanyard-profile-readme/blob/main/public/assets/badges/House_Brilliance.png?raw=true',
  HypeSquad_Events: 'https://github.com/cnrad/lanyard-profile-readme/blob/main/public/assets/badges/HypeSquad_Events.png?raw=true',
  Nitro: 'https://github.com/cnrad/lanyard-profile-readme/blob/main/public/assets/badges/Nitro.png?raw=true',
  Partnered_Server_Owner: 'https://github.com/cnrad/lanyard-profile-readme/blob/main/public/assets/badges/Partnered_Server_Owner.png?raw=true',
};

export const getImageForName = (name: string) => {
  return imageMapping[name] || '/path/to/default_image.png'; // Default image if not found
};
