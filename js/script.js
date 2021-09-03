const selectUserNumber = document.querySelector('#users');

//User Cards Container
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
//4. Functon uses numUsers as a param to determain how many user cards to display.
const getData = async function (numUsers) {
  const usersRequest = await fetch(
    `https://randomuser.me/api?results=${numUsers}`
  );
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
    //Function Notes
    //1. Return the arrry[i], where I is a random number between 0 and the (array.length - 1)
    const randomIndex = function (array) {
      return array[Math.floor(Math.random() * array.length)];
    };

    let country = user.location.country;
    let name = `${user.name.first} ${user.name.last}`;
    let imageUrl = user.picture.large;
    let handle = `@${user.name.first}${user.name.last}`;
    let userInterest = `${randomIndex(
      profileDetails.interests1
    )} and ${randomIndex(profileDetails.interests2)}`;
    let userLookingFor = randomIndex(profileDetails.lookingFor);

    let classes = [
      'tropical',
      'living-space',
      'mirror',
      'hotel',
      'computer',
      'jimmy-dean',
      'church',
      'mountain',
      'dog',
      'truck',
      'bug',
      'car',
      'starfish',
    ];

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
    userDiv.classList.add(`${randomIndex(classes)}`);
    randomFolks.append(userDiv);
  });
};

//Function Notes
//1. Add change event for the select element (#users)
//2. Reassign the numUsers value to the value of the select element's target.
//3. Call the getData function with a param of numUsers
selectUserNumber.addEventListener('change', function (e) {
  numUsers = e.target.value;
  getData(numUsers);
});

//1 is the default falue for number of user cards to display
getData(1);
