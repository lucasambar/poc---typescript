## PEOPLE MANEGEMENT
### Prove of concepts  - TypeScript
---
API to manage the employees of a tech business. You can register the departments, positions and workers here.

**POST: /employess**

Register a new employee at this business.

body:
```JSON
{
    "name": "how they want to be called by",
    "email": "must be a unique email per worker",
    "position_id": "reference of the position",
    "departament_id": "reference of the departament"
}
```
Departaments & positions references
 id | name                | id |   name    | salary    
----|---------------------|----|-----------|---------
  1 | Administration      |  1 | assistant | 2500000
  2 | Finance department  |  2 | junior    |  400000
  3 | Marketing           |  3 | middle    | 6500000
  4 | Human Resources     |  6 | senior    |  800000
  5 | UX/UI               |  7 | leader    | 1100000 
  6 | Sales               |
  7 | Back-end            |
  8 | Front-end           |

**GET: /employess**

List all employess that work at this business.

response:
```JSON
{
    "id",
    "name",
    "email",
    "position",
    "salary",
    "departament"
}
```
**PUT: /employess/:id**

Update an employees information using their id.

```JSON
{
    "name": "how they want to be called by",
    "email": "must be a unique email per worker",
    "position_id": "reference of the position",
    "departament_id": "reference of the departament"
}
```
**DELETE: /employess/:id**

DElete an employee from the business database using their id.