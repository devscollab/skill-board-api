# WELCOME TO SKILLBOARD-API-DOCS 😎

- Author **Aditya**
- Editor **Bhavansh**

# Index

*  ## Prerequisites

* ## Login process

* ## Registration process

* ## Fetching Data (access to student user and superuser)

* ## Update Data (access to student user and superuser)

* ## Delete Data (access to student user and superuser)

* ## Verifying Profiles(access restricted to superuser)

* ## Broadcast emails

* ##  Forgot Password process

* ##  Promotion to SuperUser

### Note: development server is deployed on Heroku at [https://skboard.herokuapp.com](https://skboard.herokuapp.com/)

    While making API calls, replace http://localhost:3000 with the Heroku URL. SMTP and JWT are disabled for the development server. So you can make API calls without any restrictions. A separate database is allotted for the development server so less chances of breaking the application during development.


    The development server goes to sleep mode in 30mins of inactivity. This may lead to 4-5 sec latency in the first api call, because this api call will act as an event that will revoke the development server. Once the server is up an running,



# Anatomy of an HTTP request


Usually an HTTP request looks like this,

### [https://skboard.herokuapp.com](https://skboard.herokuapp.com/)/api/student/all

    1. https is the HyperText Transfer Protocol and the &#39;s&#39; stands for Secure
    2. Skboard.herokuapp.com is the domain
    3. /api/student/all is the path. Sending a request to this path will return a response the contains some data

## Request parameters

    Request parameters is that part of the URL that specifies a dynamic endpoint. In our APIs request parameter concept is used to fetch data of a particular user which can be uniquely identified by its ID in the database.

### Eg: [http://localhost:3000/api/student/:id](http://localhost:3000/api/student/:id)

    Here 'id' is the placeholder for the actual id that needs to be passed in order to fetch a particular document.

    So for sending an actual GET request to our server, the request must look like this

### [http://localhost:3000/api/student/](http://localhost:3000/api/student/:id)5f4a79137b5efd16d4914542

Where ```5f4a79137b5efd16d4914542 ```can be acquired from the GET all students request

## Request Headers

    Another way to send data to the server is to send it via setting the request Header parameters. This data will not be visible on the address bar unlike the request parameters. This is like the meta data that must be sent , this will help the server understand how to handle a particular request. Request Headers can be set as a key value pair. Our API&#39;s make use of request headers to send the **TOKEN.** This token holds important information like how long should a user be able to access the resources and the role of the user. This is basically data that will help the server to authenticate the user and grant permissions. Detailed description of the exact use of the request headers for the api is mentioned in "How to handle JWT".

## Query String

    A query string is a way in which the server understands which and how much data to be sent to the user. Use case of query string is pagination, reloading for new cards on scroll, filters, user credentials, etc.

    Our Api uses this concept to send more cards onScroll event. The database will contain more than 200 unique users. Displaying all the profiles on the screen will affect the user experience. This might lead to infinite scrolling and never ending list. We will try to simulate the Instagram explore type feature where, when u reach a certain Y axis scroll amount an new api request will be sent to the server and the server responds with new data.

### Eg: [http://localhost:3000/api/student/](http://localhost:3000/api/student/:id)?page=3&amp;&amp;limit=10

    Every query string starts with a '?' delimiter. All the strings appearing after this delimiter is considered as the part of the query. Here we have 2 key-value pairs. The two keys are page and limit. The page key will hold the page number, but in our case it will give the Y axis scroll amount modulo the limit of the page. The limit key denotes the number of documents that must be sent by the server.

    In above example the **page=3** will denote that the user has scrolled the page to a certain limit 2 times and we need to display more data. In the backend the server will skip the first 2 sets of documents and will send the next batch. The **limit=10** denotes that we only need 10 documents at a time.

### To send multiple key-value pairs, they must be separated by the **&#39;&amp;&amp;&#39; delimiter.**

## Request Body

    Our API relies on this concept very much. A request body is the actual payload that is sent and received by the server. A request body can be a Text file, Javascript , Binary data, JSON, XML,etc. We are using JSON data for almost all the APIs in future jpg,jpeg files can also be sent to the server. JSON stands for JavaScript Object Notation. It is a simple object which has key and value, it may or may not contain nesting, array and other objects.

## How to handle JWT?

    After successful login, the server will send a short-lived token that will act as your secret key to access the resources. if the token is not found in the request headers then the server will deny the service.

* step1. ```Get the token from the server```

* step2. ``` Store it in the browser's local storage by stringifying it and store it in a key-value pair.```

* step3. ```while making any request, set the request headers as follows.```

**``` headers:{"Authorization":"Bearer"+<token goes here>}```**

```note: the keyword "Bearer" is very important and must be appended before the token and the two words should be separated by " "<space>```

* step4. ```Getting auth checked success.when the authorization is successful, the server is grant access to the resource```

### Failing the auth check

There can be multiple reasons for the auth to fail

1. missing token: this error occurs when the token is not found

```
{
    message: "Auth failed",
    error: "token not found"
}
```

2. invalid token: this error occurs when the token is found but is invalid

```
{
    message: "Auth failed",
    error: "cannot grant access to the resource"
}
```

3. expired token: this error occurs when the token is expired

```
{
    message: "Auth failed",
    error: "token expired"
}
```

4. tampered token: this error occurs when some part of the token is missing

```
{
    message: "Auth failed",
        error: "token was tampered"
}
```

# 1. Login process


```step1. Send the request to the following path. On success, the server will send a token. redirect to the dashboard.```

```step2. save the token from the response in browser LocalStorage.```

```step3. Use it with every request to the server. The missing token will lead to authentication error 400 bad request from the server.```


```note: This is a common path for all three types of user for the application i.e unverified user, student user and superuser```

```
URL: http://localhost:3000/api/login/
TYPE: POST
HEADERS: NULL
BODY: {
	    "email":"geekdev127001@gmail.com",
	    "password":"123"
	  }
```

**RESPONSE:**
```
i. Success
	{
	    "message": "login successful",
	    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdlZWtkZXYxMjcwMDFAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE1OTg5NzExOTEsImV4cCI6MTU5OTAwNzE5MX0.KFIkNsrRENKPiWKz_ZLIcTBUjl0Th-XTgeNoytRJKGQ"
	}

ii. Email not found
	{
	    "message": "user not found"
	}

iii. Password doesn't match
	{
	    "message": "login failed",
	    "error": "password doesn't match"
	}

```


# 2. Registration 

```step1. Send the request to the following path.```

```step2. After successful registration, an acknowledgment auto generated email will be sent to the user.```

```Note 1: The server is able to handle SMTP error raised when a registered email doesn't exist. While testing the registration using a dummy email is possible but the acknowledgment email will not be sent because of this reason.```


```Note 2: The request body should follow the same schema strictly. Typo/Case(small/capital) cannot be excused. These fields are 1:1 mapped with data on the server. Missing fields, or mistyped field names will raise unwanted errors.```

```MetaData must be required from the Github API. This object can be empty for while testing.```

```Every Registration will be an unverified profile which after verification can be assigned the role of Student or Superuser by Superuser after promoting```

```
URL: http://localhost:3000/api/register
TYPE: POST
HEADERS: NULL
BODY:{
    "email": "testUser16@gmail.com",
    "password": "123",
    "personal": {
        "name": "Suyash",
        "college": "PCCOE",
        "department": "COMP",
        "year": "TE",
        "division": "A",
        "rollno": "TECOA312"
    },
    "social": {
        "phone": "9900776655",
        "linkedin": "https://www.linkedin.com/in/",
        "github": "https://github.com/tejas",
        "personalwebsite": "https://tejasmorkar.tech/",
        "resume": "https://tejasmorkar.tech/",
        "iswhatsapp": true
    },   
    "skills": {
      "skill": ["Js","Py","Node"],
      "projectsforskills": ["https://www.linkedin.com/in/","https://www.linkedin.com/in/","https://www.linkedin.com/in/"],
      "primaryskill": "Nodejs",
      "secondaryskill": "Angular",
      "cgpa": 9.82
    },
    "rating":4.5,
    "optionals": {
        "introduction": "Hello",
        "gender": "Male",
        "age": "20",
        "mother_tongue": "Marathi",
        "languages_known": [
            "Hindi",
            "English"
        ],
        "pronoun":"he/him"
    },
    "metaData": {
        "hasAdminAccess": false,
        "github_metadata_object": {
            "login": "aditya",
            "id": 45139041,
            "node_id": "MDQ6VXNlcjQ1MTM5MDQx",
            "avatar_url": "https://avatars3.githubusercontent.com/u/45139041?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/bhavansh",
            "html_url": "https://github.com/bhavansh",
            "followers_url": "https://api.github.com/users/bhavansh/followers",
            "following_url": "https://api.github.com/users/bhavansh/following{/other_user}",
            "gists_url": "https://api.github.com/users/bhavansh/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/bhavansh/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/bhavansh/subscriptions",
            "organizations_url": "https://api.github.com/users/bhavansh/orgs",
            "repos_url": "https://api.github.com/users/bhavansh/repos",
            "events_url": "https://api.github.com/users/bhavansh/events{/privacy}",
            "received_events_url": "https://api.github.com/users/bhavansh/received_events",
            "type": "User",
            "site_admin": false,
            "name": "Bhavansh Gupta",
            "company": null,
            "blog": "",
            "location": "Pune",
            "email": null,
            "hireable": null,
            "bio": "Student of Computer Engineering at Pimpri Chinchwad College of Engineering.\r\nJust Starting",
            "twitter_username": "bhavanshgupta",
            "public_repos": 20,
            "public_gists": 0,
            "followers": 28,
            "following": 65,
            "created_at": "2018-11-18T08:07:57Z",
            "updated_at": "2020-08-25T15:04:57Z"
        }
    }
}

```

```
Note:
1. The options that can be sent to the server for the optionals.pronoun key are "she/her", "he/him", "they/them". 
2. The options in the skill array will be names of the languages/framworks/software that the user is skilled in. 
3. The naming convention for the skills are as follows:
    a. The first letter should be capital English Alphabet.
    b. If the name consists of two words, then the words must be separated by a single space.
    c. There should be no leading or trailing spaces.
    d. There should be no special symbols.
    eg 1: "Nodejs"
        "Machine Learning"
        "HTML5"
    will be accepted.
    eg 2: "nodejs"
          "machineLearning"
          "HTML "
    will not be accepted  
```

**RESPONSE:**

```
i. Success
	
ii. Failure:
	{
	    "message": "some error occurred while storing credentials",
	    "error": {}
	}

```

# 3. Fetching Data

## a) Student Data

```i. Get all verified Students```

```
	URL: http://localhost:3000/api/student/all
	TYPE: GET
	HEADERS: 
		{
			Authorization: Bearer <student token goes here>
		}
	BODY: NULL
	RESPONSE: 
		i. Success
			{
			    "message": "success",
			    "size": x,//x:some length of docs
			    "docs": [{},{}] //array of objects
			}
		ii. Failure:
			a. Auth failure
			b. Server error
				{
					“message”: "internal server error",
		            		“error”: {}
				}
```

```ii. Get Student info by its ID```

```
URL: http://localhost:3000/api/student/:id
	TYPE: GET
	HEADERS: 
		{
			Authorization: Bearer <student token goes here>
		}
	BODY: NULL
	RESPONSE:
		i.Success:
	{
			    "message": "success",
			    "doc": {//student data here}
			}
		ii. Failure:
			a. Auth failure
			b. Server error
				{
					“message”: "internal server error",
		            		“error”: {}
				}

```

```iii. Get verified Students with query```

```
	URL: http://localhost:3000/api/student/?page=2&&limit=10
	TYPE: GET
	HEADERS: 
		{
			Authorization: Bearer <student token goes here>
		}
	BODY: NULL
	RESPONSE: 
		i. Success
			{
			    "message": "success",
			    "size": x,//x:some length of docs
			    "docs": [{},{}] //array of objects
			}
		ii. Failure:
			a. Auth failure
			b. Server error
				{
					“message”: "internal server error",
		            		“error”: {}
				}
```
```Note: Currently the limit is set to 10 by default. This issue will be resolved in upcoming versions```
## b) Unverified Profiles

```i. Get all unverified student profiles```

```
	URL: http://localhost:3000/api/unverified/all
	TYPE: GET
	HEADERS: 
		{
			Authorization: Bearer <superuser token goes here>
		}
	BODY: NULL
	RESPONSE: 
		i. Success:
			{
			    "message": "success",
			    "size": x,//x:some length of docs
			    "docs": [{},{}] //array of objects
			}

		ii. Failure:
			a. Auth failure
			b. Server error
				{
					“message”: "internal server error",
		            		“error”: {}
				}
```

```ii. Get unverified Student profiles info by its ID```

```
URL: http://localhost:3000/api/unverified/:id
	TYPE: GET
	HEADERS: 
		{
			Authorization: Bearer <SuperUser token goes here>
		}
	BODY: NULL
	RESPONSE:
		i.Success:
	{
			    "message": "success",
			    "doc": {//student data here}
			}
		ii. Failure:
			a. Auth failure
			b. Server error
				{
					“message”: "internal server error",
		            		“error”: {}
				}

```

## c) Superuser Data 

```i. Get all superusers```
```
	URL: http://localhost:3000/api/superuser/all
	TYPE: GET
	HEADERS: 
		{
			Authorization: Bearer <superuser token goes here>
		}
	BODY: NULL
	RESPONSE: 
		i. Success
			{
			    "message": "success",
			    "size": x,//x:some length of docs
			    "docs": [{},{}] //array of objects
			}
		ii. Failure:
			a. Auth failure
			b. Server error
				{
					“message”: "internal server error",
		            		“error”: {}
				}

```

```ii. Get Superuser info by its ID```
```
	URL: http://localhost:3000/api/superuser/:id
	TYPE: GET
	HEADERS: 
		{
			Authorization: Bearer <superuser token goes here>
		}
	BODY: NULL
	RESPONSE:
		i.Success:
			{
			    "message": "success",
			    "doc": {//superuser data here}
			}
		ii. Failure:
			a. Auth failure
			b. Server error
				{
					“message”: "internal server error",
		            		“error”: {}
				}

```
## d) Search bar, filter, sort helper API 

```i. Filter students by Primary Skill, Secondary Skill and student rating.```

```ii. Get students by Name```

```iii. Sort Students based on rating```

```Note: Currently we are working on these API and the docs will updated once they are working.```

# 4. Update Operations

```Note: Student data can be updated by student as well as superuser```
## a). Update student data

    Send a PATCH request to this api with the id of a particular student. The request body may include any field that is present in the database schema. (for reference check out the schema from the Registration api body).Update operation will override all the previous data, so creating a correct request body is the crucial part. Best practice is to copy the object as it is and only replace the required part and send entire object in the request body

```
URL: http://localhost:3000/api/student/update/:id
TYPE: PATCH
HEADERS: 
		{
			Authorization: Bearer <student token goes here>
		}
BODY: {
		"personal": {
			"name": "ddfbvdfgb",
			"college": "PCCOE",
			"department": "COMP",
			"year": "TE",
			"division": "A",
			"rollno": "TECOA312"
		}, 
		"skills": {
			"skill": ["Js","Py","Node"],
			"projectsforskills": ["https://www.linkedin.com/in/","https://www.linkedin.com/in/","https://www.linkedin.com/in/"],
			"primaryskill":"Node",
			"secondaryskill":"Py",
			"cgpa": 9.82
		}
	}
RESPONSE: 
i. Success
			
	ii. Failure:
		a. Auth failure
		b. Server error
			{
				message: "internal server error",
	            error: {}
			}

```

## b). Update superuser data

    Send a PATCH request to this api with the id of a particular student. The request body may include any field that is present in the database schema. (for reference check out the schema from the Registration api body).Update operation will override all the previous data, so creating a correct request body is the crucial part. Best practice is to copy the object as it is and only replace the required part and send entire object in the request body

```
URL: http://localhost:3000/api/superuser/update/:id
	TYPE: PATCH
	HEADERS: 
			{
				Authorization: Bearer <superuser token goes here>
			}
	BODY: {
			"social": {
			"phone": "8806698766",
			"linkedin": "https://www.linkedin.com/in/bhavansh-gupta-01bbb817a/",
			"github": "https://github.com/bhavansh"
			},
			"optionals": {
			"introduction": "Hello",
			"gender": "Male",
			"age": "20",
			"mother_tongue": "Hindi",
			"languages_known": ["Marathi","English"],
            "pronoun":"he/him"
			},
		}
	RESPONSE: 
		i. Success
			
		ii. Failure:
			a. Auth failure
			b. Server error
				{
					message: "internal server error",
		            		error: {}
				}

```

## c). Update unverified student data

	Send a PATCH request to this api with the id of a particular student. The request body may include any field that is present in the database schema. (for reference check out the schema from the Registration api body).Update operation will override all the previous data, so creating a correct request body is the crucial part. Best practice is to copy the object as it is and only replace the required part and send entire object in the request body

```
URL: http://localhost:3000/api/unverified/update/:id
TYPE: PATCH
HEADERS: 
		{
			Authorization: Bearer <student token goes here>
		}
BODY: {
	    "Personal": {
	        "name": "geekgod",
	        "college": "PCCOE",
	        "department": "COMP",
	        "year": "TE",
	        "division": "A",
	        "rollno": "TECOA112"
	    },   
	    "Skills": {
	      "skill": ["Js","Py","Node"],
		      "projectsforskills": ["https://www.linkedin.com/in/","https://www.linkedin.com/in/","https://www.linkedin.com/in/"],
		      "primaryskill": "Py",
              "secondaryskill": "Js",
		      "cgpa": 9.82
		    }
	}
RESPONSE: 
i. Success
			
	ii. Failure:
		a. Auth failure
		b. Server error
			{
				message: "internal server error",
	            error: {}
			}

```

# 5. Delete Operations

```Note: Student data can be deleted by the student as well as superuser```

## a). Delete student data

```
	URL: http://localhost:3000/api/student/delete/:id
	TYPE: DELETE
	HEADERS: 
			{
				Authorization: Bearer <student token goes here>
			}
	BODY: NULL
	RESPONSE: 
	i. Success
		
	ii. Failure:
		a. Auth failure
		b. Server error
			{
				message: "internal server error",
	            		error: {}
			}
```

## b). Delete superuser data

```
	URL: http://localhost:3000/api/superuser/delete/:id
	TYPE: DELETE
	HEADERS: 
			{
				Authorization: Bearer <superuser token goes here>
			}
	BODY: NULL
	RESPONSE: 
		i. Success
			
		ii. Failure:
			a. Auth failure
			b. Server error
				{
					message: "internal server error",
		            		error: {}	}
```

## b). Delete unverified student data

```		
	URL: http://localhost:3000/api/unverified/delete/:id
	TYPE: DELETE
	HEADERS: 
			{
				Authorization: Bearer <student token goes here>
			}
	BODY: NULL
	RESPONSE: 
	i. Success
		
	ii. Failure:
		a. Auth failure
		b. Server error
			{
				message: "internal server error",
	            		error: {}
			}
```

# 6. Verify profiles

## a). Approve profile

```
	URL: http://localhost:3000/api/unverified/approve/:id
	TYPE: POST
	HEADERS: 
			{
				Authorization: Bearer <superuser token goes here>
			}
	BODY: NULL
	Response: 
	i. Success
		
	ii. Failure:
		a. Auth failure
		b. Server error
			{
				message: "internal server error",
	            		error: {}
			}
```
## b). Reject profile

```
	URL: http://localhost:3000/api/unverified/approve/:id
	TYPE: POST
	HEADERS: 
			{
				Authorization: Bearer <superuser token goes here>
			}
	BODY: NULL
	RESPONSE: {
				 "message":"some message"
			  }

	i. Success
			
	ii. Failure:
		a. Auth failure
		b. Server error
			{
				message: "internal server error", error: {}	}
```
## b). Promote profile to superuser

```
	URL: http://localhost:3000/api/superuser/promote/:id
	TYPE: POST
	HEADERS: 
			{
				Authorization: Bearer <superuser token goes here>
			}
	BODY: NULL
	RESPONSE: {
				 "message":"some message"
			  }

	i. Success
			
	ii. Failure:
		a. Auth failure
		b. Server error
			{
				message: "internal server error", error: {}	
			}
```

# 7. Broadcast emails

## a). Broadcast email to all users

```
URL: http://localhost:3000/api/broadcast/all
	TYPE: POST
	HEADERS: 
			{
				Authorization: Bearer <superuser token goes here>
			}
	BODY: {
				 "message":"some message"
			  }
	RESPONSE:
	i. Success
		
	ii. Failure:
		a. Auth failure
		b. Server error
			{
				message: "internal server error",
			            error: {}
			}

```

## b). Broadcast email to verified students

```
URL: http://localhost:3000/api/broadcast/students
	TYPE: POST
	HEADERS: 
			{
				Authorization: Bearer <superuser token goes here>
			}
	BODY: {
				 "message":"some message"
		  }
	RESPONSE:
		i. Success
			
		ii. Failure:
			a. Auth failure
			b. Server error
				{
					message: "internal server error",
	            error: {}
				}

```

## c). Broadcast email to unverified profiles

```
    URL: http://localhost:3000/api/broadcast/unverified
	TYPE: POST
	HEADERS: 
			{
				Authorization: Bearer <superuser token goes here>
			}
	BODY:{	
			 "message":"some message"
		  }
	RESPONSE:
		i. Success
			
		ii. Failure:
			a. Auth failure
			b. Server error
				{
					message: "internal server error",
		            		error: {}
				}

```

## d). Broadcast email to Superusers

```
	URL: http://localhost:3000/api/broadcast/superuser
	TYPE: POST
	HEADERS: 
			{
				Authorization: Bearer <superuser token goes here>
			}
		BODY"	{
				"message":"some message"
			}
	RESPONSE:
		i. Success
			
		ii. Failure:
			a. Auth failure
			b. Server error
				{
					message: "internal server error",
		            		error: {}
				}

```

# 8. Forgot password mechanism

```step1. send a GET request to the http://localhost:3000/api/forgotpassword/student/:id. An OTP will be sent to you on your registered email.```

```step2. send a POST request containing OTP in its body to the http://localhost:3000/api/forgotpassword/verify. If the OTP is valid and not expired, then a JSON web token will be generated. This must be sent in request headers for the next request.```

```step3. Send a POST request to http://localhost:3000/api/forgotpassword/update/student/:id for student users and http://localhost:3000/api/forgotpassword/update/superuser/:id with the updated password in its body.```

## a). Get OTP

```
	URL: http://localhost:3000/api/forgotpassword/student/:id
	TYPE: GET
HEADERS: NULL
	BODY: NULL
	RESPONSE: 
		i. Success, OTP on registered email
		ii. Failure:
			{
				message: "internal server error",
	            		error: {}
			}
```

**Note : Routes to Get Otp for SuperUser and Unverified Profiles are as follows: **
```
URL: http://localhost:3000/api/forgotpassword/unverified/:id
URL: http://localhost:3000/api/forgotpassword/superuser/:id
```


## b). verify OTP

```
URL: http://localhost:3000/api/forgotpassword/verify
	TYPE: POST
	HEADERS: NULL
	BODY: {
		  	"OTP":481160
		  }
	RESPONSE: 
		i. Success, JSON web token for password reset
		ii. Failure:
			a. incorrect OTP
			b. OTP expired
			c. Auth failure


```

## c). Update student password

```
URL: http://localhost:3000/api/forgotpassword/update/student/:id
	TYPE: POST
	HEADERS: 
		{
			Authorization: Bearer <forgot password token goes here>
		} 
	BODY: {
		  	"password":"12345"
		  }
	RESPONSE: 
		i. Success
		ii. Failure:
			a. Auth failure
			b. 	{
					message: "internal server error",
			           		error: {}
				}
```

## d). Update superuser password

```
URL: http://localhost:3000/api/forgotpassword/update/superuser/:id
	TYPE: POST
	HEADERS: 
			{
				Authorization: Bearer <forgot password token goes here>
			}
	BODY: {
		  	"password":"12345"
		  }
	RESPONSE: 
		i. Success
		ii. Failure:
			a. Auth failure
			b. {
					message: "internal server error",
		            		error: {}
				}

```

## e). Update Unverified Profile password

```
URL: http://localhost:3000/api/forgotpassword/update/unverified/:id
	TYPE: POST
	HEADERS: 
			{
				Authorization: Bearer <forgot password token goes here>
			}
	BODY: {
		  	"password":"12345"
		  }
	RESPONSE: 
		i. Success
		ii. Failure:
			a. Auth failure
			b. {
					message: "internal server error",
		            		error: {}
				}

```