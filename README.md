# ToDo App
# How to use?
* docker-compose up --build -d
* app will show on http://localhost:3000


# This project includes:

*Todos*

GET {{url}}/api?page=1 # paginatio support (default page is 0, if not specify the page query)

POST {{url}}/api
body: {
    "description": "some description",
    "deadline"?: Date
}

PUT {{url}}/api/<todo_id>
body: {
    "description": "some other description",
    "status": "true" | "false"
}

DELETE {{url}}/api/<todo_id>

GET {{url}}/api/status
