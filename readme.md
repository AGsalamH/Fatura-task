<center> <h2> Node.js + MongoDB: JWT Authentication & Authorization </h2> </center>

### Endpoints:
- _**/api/auth/signup**_
    - Creatin new user in the DB
    - Required Fields: `username:string`, `password:string`
    - Optionaal Fields: `phone:string`, `roles:[string]`
    - Returns: `{user}`

- _**/api/auth/login**_
    - Login a user by creating a new JWT Access Token
    - Required Fields: `username:string`, `password:string`
    - Returns: `{accessToken, refreshToken}`

- _**/api/auth/refresh-token**_
    - Requests a new access token when the previous one is expired.
    - Required Fields: `refreshToken`
    - returns: `{ accessToken }`

- _**/api/auth/logout**_
    - Make the access token no longer works in order to logout the user.
    - Deletes the refresh token either.
    - Required Fields: `refreshToken`, `accessToken`
    - returns: `402 No response`


- Libraries
    - **express** => Handling requests and responses
    - **mongoose** => MongodDB ODM makes it easy working with mongodb collections & documents
    - **cors** => provides Express middleware to enable CORS
    - **dotenv** => reading & loading enviroment variables into `process.env`
    - **express-validator** => validating incoming data
    - **jsonwebtoken** => For managing Authorization using JWT tokens
    - **bcryptjs** => Hashing passwords


- [Postman docs](https://documenter.getpostman.com/view/11114123/U16kqk6x)

- **Challenges i faced**:
    - **refresh tokens**
        - It was the first time for me to implement `refresh token`
        - So, i kept trying until i finally managed to do it.
        - Here are some resources i found useful:
            - (https://www.bezkoder.com/jwt-refresh-token-node-js-mongodb/)
            - (https://www.bezkoder.com/node-js-mongodb-auth-jwt/)

    - **Documenting APIs**
        - I always knew that i could document APIs using something like `swagger`...
        - Fortunately, i found that `Postman` does this too. and much simpler

    - **Testing**
        - I always ignored testing, because i thought it's NOT that important
        - But it turns out that it's really important
        - It was the first time to us `Mocha` and `Chai` to test code
        - Here are some resources helped me:
            - (https://scotch.io/tutorials/how-to-test-nodejs-apps-using-mocha-chai-and-sinonjs)
            - https://techbrij.com/node-rest-api-testing-mocha-sinon-chai

---

- **To run**
    - Make sure you assign your enviroment variables correctly
    - The attached `.env` file includes some samples
    1. `npm install`
    1. `npm run dev`