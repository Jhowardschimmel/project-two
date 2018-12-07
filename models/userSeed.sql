USE art_db;

INSERT INTO Users (username,email,password,createdAt,updatedAt)
    VALUES 
    ("AdminCurator",
    "ewoodworth@atlantaregional.org",
    "12345678",
    NOW(),
    NOW());