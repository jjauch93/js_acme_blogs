function createElemWithText (elemType = "p", textCont = "", className)
{
  // Assigns myElem a newly created elemType element in the document
  const myElem = document.createElement(elemType);
  // Assigns myElem.textContext the textCont
  myElem.textContent = textCont;
  // Checks if parameter was passed
  if(className)
    // Creates a new class in myElem labeled className
    myElem.classList.add(className);
  return myElem;
}

function createSelectOptions(data)
{
  // Checks if parameter was passed
  if(!data)
    return;
  const optionArray = [];
  // Loops through data and performs the following on each user
  data.forEach(function(user)
    {
      // Assigns option a newly created option element in the document
      const option = document.createElement('option');
      // Assigns option.value the user.id
      option.value = user.id;
      // Assigns option.textContext the user.name
      option.textContent = user.name;
      // Pushes option on to the array optionArray
      optionArray.push(option);
  });
  return optionArray;
}

function toggleCommentSection(postId)
{
  // Checks if parameter was passed
  if(!postId)
    return;
  // Assigns toggleSection the section element with the postId equal to the postId parameter
  const toggleSection = document.querySelector(`section[data-post-id = '${postId}'`);
  // Checks if section element with the postId parameter was found
  if(toggleSection)
    //Toggles the hide class in toggleSection
    toggleSection.classList.toggle('hide');
  return toggleSection;
}

function toggleCommentButton(postId)
{
  // Checks if parameter was passed
  if(!postId)
    return;
  // Assigns buttonToggle the button element with the postId equal to the postId parameter
  const buttonToggle = document.querySelector(`button[data-post-id = '${postId}'`);;
  // Checks if button element with the postId parameter was found
  if(buttonToggle)
    // Assigns buttonToggle.textContent to Hide Comments if the text is Show Comments.
    // Otherwise assigns text to Show Comments
    buttonToggle.textContent = buttonToggle.textContent == "Show Comments" ? "Hide Comments" : "Show Comments";
  return buttonToggle;
}

function deleteChildElements(parentElement)
{
  // Checks if an html element was passed as the parameter
  if(!parentElement?.tagName)
    return;
  // Assigns child the last element child of parentElement
  let child = parentElement.lastElementChild;
  // While loop that continues until child equals null
  while (child != null)
    {
      // Removes the element child from parentElement
      parentElement.removeChild(child);
      // Assigns child the new last element child of parentElement
      child = parentElement.lastElementChild;
    }
  return parentElement;
}

function addButtonListeners()
{
  // Assigns buttons to a nodeList of all the buttons in the main element
  const buttons = document.querySelector('main').querySelectorAll("button");
  // Executes if a nodeList of all the buttons in the main element was created
  if(buttons)
    {
      // Loops through buttons nodeList and performs the following on each button
      buttons.forEach(function(button)
        {
          // Assigns postId to the button postId
          const postId = button.dataset.postId;
          // Adds click event listener to button and calls toggleComments with event and postId as parameters
          button.addEventListener("click", function (e) {toggleComments(e, postId)}, false);
        });
    }
  return buttons;
}

function removeButtonListeners()
{
  // Assigns buttons to a nodeList of all the buttons in the main element
  const buttons = document.querySelector('main').querySelectorAll("button");
  // Executes if a nodeList of all the buttons in the main element was created
  if(buttons)
    {
      // Loops through buttons nodeList and performs the following on each button
      buttons.forEach(function(button)
        {
          // Assigns postId to the button postId
          const postId = button.dataset.postId;
          // Removes click event listener to button and calls toggleComments with event and postId as parameters
          button.removeEventListener("click", function (e) {toggleComments(e, postId)}, false);
        });
    }
  return buttons;
}

function createComments(data)
{
  // Checks if parameter was passed
  if(!data)
    return;
  // Assigns fragmentElement a newly created fragment element in the document
  const fragmentElement = document.createDocumentFragment();
  // Loops through data and performs the following on each comment
  data.forEach(function(comment)
    {
      // Assigns article a newly created article element in the document
      const article = document.createElement('article');
      // Assigns h3 the function call createElemWithText
      // with h3 and comment.name as it's parameters
      const h3 = createElemWithText('h3', comment.name);
      // Assigns paragraph2 the function call createElemWithText
      // with p and comment.body as it's parameters
      const paragraph1 = createElemWithText('p', comment.body);
      // Assigns paragraph2 the function call createElemWithText
      // with p and From: comment.email as it's parameters
      const paragraph2 = createElemWithText('p', `From: ${comment.email}`);
      // Appends h3, paragraph1, and paragraph2 to article
      article.append(h3, paragraph1, paragraph2);
      // Appends article to fragmentElement
      fragmentElement.append(article);
  });
  return fragmentElement;
}

function populateSelectMenu(data)
{
  // Checks if parameter was passed
  if(!data)
    return;
  // Assigns selectMenu to the element with selectMenu id 
  const selectMenu = document.querySelector("#selectMenu");
  // Assigns optionArray the function call createSelectOptions with data as it's parameter
  const optionArray = createSelectOptions(data);
  // For loop that loops, starting at 0, the length of option array
  for(let i = 0; i < optionArray.length; i++)
    // Appends the element at index i in optionArray to selectMenu
    selectMenu.append(optionArray[i]);
  return selectMenu;
}

async function getUsers()
{
  try
    {
      // Assigns response the fetched data from url
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      // Assigns jsonUserData the response data response 
      const jsonUserData = await response.json();
      // Returns jsonUserData
      return jsonUserData;
    }
  catch(e)
    {
      // Logs error to console if there is one
      console.error(e.stack);
    }
}

async function getUserPosts(userId)
{
  // Checks if parameter was passed
  if(!userId)
    return;
  try
    {
      // Assigns response the fetched data from url
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      // Assigns jsonPostData the response data response
      const jsonPostData = await response.json();
      // Assigns userPostsArray to an empty array
      const userPostsArray = [];
      // Loops through jsonPostData and performs the following on each obj
      jsonPostData.forEach(function(obj){
      // Executes if obj.userId is equal to the userId parameter
      if (obj.userId == userId)
        // Pushes obj on to the array userPostsArray
        userPostsArray.push(obj);
      });
      return userPostsArray;
    }
  catch(e)
    {
      // Logs error to console if there is one
      console.error(e.stack);
    }
}

async function getUser(userId)
{
  // Checks if parameter was passed
  if(!userId)
    return;
  try
    {
      // Assigns response the fetched data from url
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      // Assigns jsonUserData the response data response
      const jsonUserData = await response.json();
      return jsonUserData;
    }
  catch(e)
    {
      // Logs error to console if there is one
      console.error(e.stack);
    }
}

async function getPostComments(postId)
{
  // Checks if parameter was passed
  if(!postId)
    return;
  try
    {
      // Assigns response the fetched data from url
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      // Assigns jsonCommentData the response data response
      const jsonCommentData = await response.json();
      return jsonCommentData;
    }
  catch(e)
    {
      // Logs error to console if there is one
      console.error(e.stack);
    }
}

async function displayComments(postId)
{
  // Checks if parameter was passed
  if(!postId)
    return;
  // Assigns section a newly created section element in the document
  const section = document.createElement('section');
  // Assigns section.dataset.postId the postId
  section.dataset.postId = postId;
  // Creates a class in section labeled comments and another class labeled hide
  section.classList.add("comments", "hide");
  // Assigns comments the function call getPostComments with postId as it's parameter
  const comments =  await getPostComments(postId);
  // Assigns fragment the function call createComments with comments as it's parameter
  const fragment = createComments(comments);
  // Appends fragment to section
  section.append(fragment);
  return section;
}

async function createPosts(posts)
{
  // Checks if parameter was passed
  if(!posts)
    return;
  // Assigns fragmentElement a newly created fragment element in the document
  const fragmentElement =  document.createDocumentFragment();
  // For loop that loops through each post in posts
  for (const post of posts)
    {
      // Assigns article a newly created article element in the document
      const article = document.createElement('article');
      // Assigns h2 the function call createElemWithText
      // with h2 and post.title as it's parameters
      const h2 = createElemWithText('h2', post.title);
      // Assigns paragraph1 the function call createElemWithText
      // with p and post.title as it's parameters
      const paragraph1 = createElemWithText('p', post.body);
      // Assigns paragraph2 the function call createElemWithText
      // with p and Post ID: post.id as it's parameters
      const paragraph2 = createElemWithText('p', `Post ID: ${post.id}`);
      const author = await getUser(post.userId);
      // Assigns paragraph3 the function call createElemWithText 
      // with p and Author: author.name with author.company.name as it's parameters
      const paragraph3 = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
      // Assigns paragraph4 the function call createElemWithText 
      // with p and author.company.catchPhrase as it's parameters
      const paragraph4 = createElemWithText('p', `${author.company.catchPhrase}`);
      // Assigns button the function call createElemWithText
      // with button and Show Comments as it's parameters
      const button = createElemWithText('button', "Show Comments");
      // Assigns button.dataset.postId the post.id
      button.dataset.postId = post.id;
      // Appends h2, paragraph1, paragraph2, paragraph3, paragraph4, and button to article
      article.append(h2, paragraph1, paragraph2, paragraph3, paragraph4, button);
      // Assigns section the function call displayComments with post.id as it's parameter
      const section = await displayComments(post.id);
      // Appends section to article
      article.append(section);
      // Appends article to fragmentElement
      fragmentElement.append(article);
    }
  return fragmentElement;
}

async function displayPosts(posts)
{
  // Assigns main the main element in the document
  const main = document.querySelector('main');
  // Assigns element the function call createPosts with posts as it's parameter if posts is defined.
  // Otherwise element is assigned the p element in the main element
  const element = posts?.length ? await createPosts(posts) : createElemWithText("p", "Select an Employee to display their posts.", "default-text");
  // Appends element to main
  main.append(element);
  return element;
}

function toggleComments(event, postId)
{
  // Checks if parameters were passed
  if(!event && !postId)
    return;
  event.target.listener = true;
  // Assigns section the function call toggleCommentSection with postId as it's parameter
  const section = toggleCommentSection(postId);
  // Assigns button the function call toggleCommentButton with postId as it's parameter
  const button = toggleCommentButton(postId);
  // Returns array with section and button as it's elements
  return [section, button];
}

async function refreshPosts(posts)
{
  // Checks if parameter was passed
  if(!posts)
    return;
  // Assigns removeButtons the function call removeButtonListeners
  const removeButtons = removeButtonListeners();
  // Assigns main the function call deleteChildElements
  // with main element in the document as it's parameter
  const main = deleteChildElements(document.querySelector('main'));
  // Assigns fragment the function call displayPosts with posts as it's parameter
  const fragment = await displayPosts(posts);
  // Assigns addButtons the function call addButtonListeners
  const addButtons = addButtonListeners();
  // Returns array with removeButtons, main, fragment, and addButtons as it's elements
  return [removeButtons, main, fragment, addButtons];
}

async function selectMenuChangeEventHandler(event)
{
  // Checks if parameter was passed
  if(!event)
    return;
  // Disables the element with selectMenu id in the document
  document.querySelector("#selectMenu").disabled = true;
  // Assigns userId the value of the event target or 1 if there is no value of the event target
  const userId = event?.target?.value || 1;
  // Assigns posts the function call getUserPosts with userId as it's parameter
  const posts = await getUserPosts(userId);
  // Assigns refreshPostsArray the function call refreshPosts with posts as it's parameter
  const refreshPostsArray = await refreshPosts(posts);
   // Enables the element with selectMenu id in the document
  document.querySelector("#selectMenu").disabled = false;
  // Returns array with userId, posts, and refreshPostsArray as it's elements
  return [userId, posts, refreshPostsArray];
}

async function initPage()
{
  // Assigns user the function call getUsers
  const users = await getUsers();
  // Assigns select the function call populateSelectMenu with users as it's parameter
  const select = populateSelectMenu(users);
  // Returns array with users and select as it's elements
  return [users, select];
}

function initApp()
{
  initPage();
  // Assigns selectMenu the element with selectMenu id 
  const selectMenu = document.querySelector("#selectMenu");
  // Adds change event listener to selectMenu and calls selectMenuChangeEventHandler with event as parameter
  selectMenu.addEventListener('change', selectMenuChangeEventHandler, false);
}

// Adds DOMContentLoaded event listener to document and calls initApp with event as parameter
document.addEventListener("DOMContentLoaded", initApp, false);
