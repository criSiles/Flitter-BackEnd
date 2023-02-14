# Flitter-BackEnd
This is a backend repository for a Twitter clone, [KeepCoding-Glovo Women in Tech](https://keepcoding.io/nuestros-bootcamps/mujeres-glovo/ "KC Bootcamp") final project
The aim of this project is to put everything we've learnt during the bootcamp into practice and simulate a sprint where we develop a project to a deadline. 

Please ensure you're setup on the [frontend](https://github.com/LuciaSaenz/front-final-project "frontend") of this project

## Requirements
** Please make sure to have installed node.js at the version 16.13.1.**

## Setup
Execute the following: 
```
git clone https://github.com/criSiles/Flitter-BackEnd.git
cd Flitter-Backend
npm i 
```
```
npm run dev
```

## Technologies 
- [MongoDB](https://www.mongodb.com/es/atlas/database)
- [Node JS](https://nodejs.org/en/)
- Express 
- JWT
- JEST

## Authors
- [Carmen Rocío Romero García](https://github.com/RocioRDev)
- [Laura Luz Perote](https://github.com/perotelazarolaura)
- [Cristina Siles Vega](https://github.com/criSiles)
- [Olivia Carroll](https://github.com/OliviaCarroll)
- [Grace Vivian](https://github.com/gracevivian04)
- [Lucía Saenz](https://github.com/LuciaSaenz)

### Fleets
**For list of all the fleets, you can access from this endpoint** ```/api/fleets```

#### Request:
``` [GET] http://localhost:3000/api/fleets```

#### Response:
``` 
[
    {
        "_id": "63e8f1ef6b728ad1f7d6faf8",
        "userName": "RoRo",
        "text": "This is a dummy text",
        "kudos": [],
        "img": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        "createdAt": 1675595886,
        "__v": 0
    },
  //...
 ] 
 ```
 
**To see fleets specific to a single user, use endpoint** ```/api/fleets?userName=:{userName}```

#### Request:
``` [GET] localhost:3000/api/fleets?userName=RoRo ```

#### Response: 
```
[
    {
        "_id": "63e8f1ef6b728ad1f7d6faf8",
        "userName": "RoRo",
        "text": "This is a dummy text",
        "kudos": [],
        "img": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        "createdAt": 1675595886,
        "__v": 0
    },
   //...
]
```

### Users
**For list of all users, you can access from this endpoint** ```/users/list```

#### Request:
``` [GET] http://localhost:3000/users/list```

#### Response:
```
{
    "users": [
        {
            "_id": "63e8f1ef6b728ad1f7d6fb02",
            "id": 1,
            "email": "mail1@mail.com",
            "password": "$2b$10$opWl3LqV.drTeSKYvxBcPu8FqSlCGCReaCDTVHwNOhDxgvHPWHW0.",
            "name": "name1",
            "avatar": "https://thispersondoesnotexist.com/",
            "__v": 0
        },
      //...  
    ]
}
```


        
