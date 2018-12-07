# Community Art Curator

# Team Members
* Austin Hickox / Frontend Handlebar and AJAX calls
* Jesse Schimmel / SQL Database Management
* Erik Woodworth / Backend Express + Sequelize Server

## Description
This single-page web application will include a mapping interface which allows users to view and upload the location, images, and details of art in their community.

## User narratives
* Viewer
  - login
  - See all art locations on map
  - Filter the map category, keyword, etc.
  - See images and details for a selected location
* Poster
  - Login
  - Enter add mode
  - Drop pin on map
  - Add description, image, and other media to location
* Updater
  - Same as viewer
  - Enter update mode
  - Append description
  - Add artist if known
  
## Full Stack Functions w/ APIs
* AJAX (index.js in ./public/js) and Express (sever.js using ./routes)
  - registerNewUser (POST to Api/Users/)
  - getAllArt (GET to Api/Arts/)
  - getArtInfo (GET to Api/Arts/:id)
  - addNewArt (POST to Api/Arts/)
  - queryArt (GET to Api/Arts/:category&:artist&:user&:keyword)
    * if input is autofill then will have to write a GET findAll on the input field
  - updateArtInfo (PUT to Api/Arts/:id)
* Sequelize (index.js, art.js, and users.js in ./models)
  - User.findOrCreate
  - Art.findOrCreate
  - Art.findAll
  - Art.findById
  - need to associate User and Art and Comments
