//Contian
const randomFolks = document.querySelector('.random-peeps');

//Object that contains custom user details
const profileDetails = {
  interests1: [
    'Cooking',
    'Gaming',
    'Basketball 🏀',
    'Swimming 🏊🏽',
    'Reading horror novels',
    'Birdwatching',
    'Freestyling',
    'World of Warcraft',
  ],
  interests2: [
    'Line Dancing',
    'Poker',
    'Coding',
    'Dog Training',
    'Knitting',
    'Hanging with friends',
    'Chess',
    'Apple picking',
  ],
  lookingFor: [
    'a relationship',
    'marriage',
    'friendship',
    'a workout partner',
    'Netflix and chill',
    'quick flings',
    'something serious',
    'eggplants and peaches',
    'a coding partner',
  ],
};

//Function Notes
//1. Add two intersts as parameters and they will be push to the end of the 'interest1' and 'interest2' profileDetails properties
const addInterests = function (interest1, interest2) {
  profileDetails.interest1.push(interest1);
  profileDetails.interest2.push(interest2);
};

//Function Notes
//1. fetch API data from randomuser.me
//2. create userResults variable to covert fetched data to JSON
//3. call displayUsers function using userResults as a parameter
const getData = async function () {
  const usersRequest = await fetch('https://randomuser.me/api?results=4');
  const data = await usersRequest.json();
  const userResults = data.results;
  console.log(userResults);
  displayUsers(userResults);
};

//Function Notes
//1. Clear out inner html of the random-peeps div to prevent doubles
//2. Create randomIndex variable to generate a number between 0 and the lenth of the interest1 array (located in profileDetails object)
//3. Declare variable to create new div element
//4. Write the innerHTML of newly created div using variables for user details
//5. Append new div to the .random-peeps div
//6. Call display users function inside getData function
const displayUsers = function (userResults) {
  randomFolks.innerHTML = '';
  userResults.forEach(function (user) {
    let randomIndex = Math.floor(
      Math.random() * profileDetails.interests1.length
    );

    let country = user.location.country;
    let name = `${user.name.first} ${user.name.last}`;
    let imageUrl = user.picture.large;
    let handle = `@${user.name.first}${user.name.last}`;
    let userInterest = `${profileDetails.interests1[randomIndex]} and ${profileDetails.interests2[randomIndex]}`;
    let userLookingFor = profileDetails.lookingFor[randomIndex];

    console.log(randomIndex);

    const userDiv = document.createElement('div');

    userDiv.innerHTML = `
    <img src=${imageUrl} alt="User avatar" />
    <h3>${name}</h3>
    <figure class="sub-heading">
      <span class="handle">${handle} | </span> 
      <span class="country">${country}</span>
      <p class="bio">${userInterest}. I am just looking for ${userLookingFor}.</p>
    </figure>
    `;
    randomFolks.append(userDiv);
  });
};

getData();
