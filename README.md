# Routes

The API has the following routes:

- `/coach`: handles coach-related operations
- `/footballer`: handles footballer-related operations
- `/stadium`: handles stadium-related operations
- `/team`: handles team-related operations

Each route has its own set of supported HTTP methods and corresponding endpoints, which are described in detail below.

## Coach Route

The `/coach` route handles operations related to coaches.

### Endpoints

- `GET /coach/coaches`: gets a list of all coaches
- `GET /coach/coaches/:id`: gets a coach by ID
- `POST /coach/coaches`: adds a new coach
- `PUT /coach/coaches/:id`: updates a coach by ID
- `DELETE /coach/coaches:id`: deletes a coach by ID

## Footballer Route

The `/footballer` route handles operations related to footballers.

### Endpoints

- `GET /footballer/footballers`: gets a list of all footballers
- `GET /footballer/footballers/:id`: gets a footballer by ID
- `POST /footballer/footballers`: adds a new footballer
- `PUT /footballer/footballers/:id`: updates a footballer by ID
- `DELETE /footballer/footballers/:id`: deletes a footballer by ID

## Stadium Route

The `/stadium` route handles operations related to stadiums.

### Endpoints

- `GET /stadium/stadiums`: gets a list of all stadiums
- `GET /stadium/stadiums/:id`: gets a stadium by ID
- `POST /stadium/stadiums`: adds a new stadium
- `PUT /stadium/stadiums/:id`: updates a stadium by ID
- `DELETE /stadium/stadiums/:id`: deletes a stadium by ID

## Team Route

The `/team` route handles operations related to teams.

### Endpoints

- `GET /team/teams`: gets a list of all teams
- `GET /team/teams/:id`: gets a team by ID
- `POST /team/teams`: adds a new team
- `PUT /team/teams/:id`: updates a team by ID
- `DELETE /team/teams/:id`: deletes a team by ID
