# Social Network API
  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  

## Description
  

An API for a social network that uses a NoSQL database so that a website can handle large amounts of unstructured data.
  

## Table of Contents
  

- [Installation](#installation)
  
- [Usage](#usage)
  
- [License](#license)
  
- [Contributing](#contributing)
  
- [Tests](#tests)
  
- [Questions](#questions)
  

## Installation
  

This is a back-end code that requires local installation to operate.  This can be accomplished by cloning the repository found at https://github.com/orian42/socnetapi.  Furthermore, this app was built utilizing a MondoDB-based database; therefore, MondoDB must be installed on your computer in order to operate the app.
  
## Usage
  
After installing the app, open a terminal such as GitBash and navigate to the cloned repository.  Type <code>npm start</code> to start the server.  Because this is a back-end application, you will need to utilize Insomnia to view data.  

A full demonstration of the functionality of this app can be viewed by watching the video linked here: https://drive.google.com/file/d/1rxgm-vj7RxmQzaPf0qcsVq38_a1PQKSk/view?usp=drive_link.

The following routes can be used to create, read, update or view the data in the app.  Some of the routes have parameters that should be utilized as follows:

*   <code>/:userId</code> - Should be replaced with the "user" document ID prior to utilizing the route
*   <code>/:friendId</code> - Should be replaced with the "user" document ID of the "friend" being added to a user prior to utilizing the route
*   <code>/:thoughtId</code> - Should be replaced with the "thought" document ID prior to utilizing the route
*   <code>/:reactionId</code> - Should be replaced with the "reaction" document ID prior to utilizing the route

### Users Routes

* <code>GET : http://localhost:3001/api/users</code> - This route displays all the users in the database.
* <code>GET : http://localhost:3001/api/users/:userId</code> - This displays the user by a specific document ID.
* <code>POST : http://localhost:3001/api/users</code> - This route create a new user based on a JSON request that should be formatted as follows:
    ```json
    {
	    "username": "Bill",
        "email": "bill@macromay.org"
    }
    ```
* <code>PUT : http://localhost:3001/api/users/:userId</code> - This updates a single user by a specific ID based on a similarly-formatted JSON request as above.  The JSON request should contain the updated data.
* <code>DELETE : http://localhost:3001/api/users/:userId</code> - This deletes a single user by a specific ID.

### Friends Routes

* <code>POST : http://localhost:3001/api/users/:userId/friends/:friendId</code> - This adds a single user based on the specific ID of that user (:friendId) as a friend to another user based on the specific ID of this second user (:userId).
* <code>DELETE : http://localhost:3001/api/users/:userId/friends/:friendId</code> - This removes a single user based on the specific ID of that user (:friendId) as being a friend to another user based on the specific ID of this second user (:userId).

### Thoughts Routes

* <code>GET : http://localhost:3001/api/thoughts</code> - This route displays all the thoughts in the database.
* <code>GET : http://localhost:3001/api/thoughts/:thoughtId</code> - This displays the thought by a specific document ID.
* <code>POST : http://localhost:3001/api/thought</code> - This route create a new thought based on a JSON request that should be formatted as follows:
    ```json
    {
        "thoughtText": "I like social media.",
        "username": "MarkZ",
        "userId": "66bfb801d40e8f1c6b20ff06"
    }
    ```
    The <code>username</code> and <code>userId</code> properties should match those of an actual user from the database.
* <code>PUT : http://localhost:3001/api/thought/:thoughtId</code> - This updates a single thought by a specific ID.  The JSON request (as formatted below) should contain the updated data.
    ```json
    {
        "thoughtText": "I REALLY like social media!",
    }
    ```
* <code>DELETE : http://localhost:3001/api/thought/:thoughtId</code> - This deletes a single thought by a specific ID.

### Reactions Routes

* <code>POST : http://localhost:3001/api/thoughts/:thoughtId/reactions</code> - This route creates a new reaction that will be attached to a thought specified by the thought's document ID.  The created data will be a JSON request that should be formatted as follows:
    ```json
    {
	    "reactionBody": "I'm better with it Mark.",
	    "username": "EMSK"
    }
    ```
* <code>POST : http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId</code> - This removes a single reaction based on the specific ID of that reaction (:reactionId) from a specific thought based on the specific ID of this thought (:thoughtId).

## License
  

This application is operating under the following license: **MIT License**.  
  

Further information regarding this license, to include the required notice, can be read by navigating to the following link: https://opensource.org/licenses/MIT.
  

## Contributing
  

Anyone wishing to contribute to this project can do so by contacting me via the information located in the "Questions" section below.
  

## Tests
  

There are no testing examples provided for this project.
  

## Questions
  

Any questions regarding this project can be answered by contacting me through my GitHub profile or by email:
  
GitHub Profile: https://github.com/orian42
  
email: orian42@gmail.com
