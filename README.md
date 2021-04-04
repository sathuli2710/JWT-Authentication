# JWT-Authentication

(Use Any IDE (VSCode recommended)

(install Rest Client Extension in VSCode)

Run server.js and authserver.js using npm run devStart and npm run devStartauth

open requests.rest

Click send Request on POST http://localhost/4000/login

Copy the accesstoken and paste it after GET http://localhost:3000/posts
Authorization: Bearer *accesstoken* with quotations

Copy the refreshtoken and paste it after POST http://localhost:4000/token
Content-Type: application/json

{
    "token" : *refrestoken*
 }
 and 
DELETE http://localhost:4000/logout
Content-Type: application/json

{
    "token" : *refrestoken*
}
with the quotations

Click send Request on GET http://localhost:3000/posts

after 2 minutes the token will expire

then click sen Request on POST http://localhost:4000/token

the you can copy the accesstoken genearated and paste it after GET http://localhost:3000/posts
Authorization: Bearer *accesstoken* with quotations to regain access which expires after 2m

for deleting the refresh token click send Request on DELETE http://localhost:4000/logout
