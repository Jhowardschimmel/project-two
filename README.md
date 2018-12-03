# project-two
Community Art Curator

## Description
Mapping interface which allows users to view and upload the location, images, and details of art in their community.

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
  - registerNewUser (POST to Users/)
  - getAllArt (GET to Arts/)
  - getArtInfo (GET to Arts/:id)
  - addNewArt (POST to Arts/)
  - queryArt (GET to Arts/:category&:artist&:user&:keyword)
  - updateArtInfo (PUT to Arts/:id)
* Sequelize (index.js, art.js, and users.js in ./models)
  - User.findOrCreate
  - Art.findOrCreate
  - Art.findAll
  - Art.findById