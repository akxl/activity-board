Activity Board
--------------

This is a toy application. Used by me to play around with Spring and ReactJS.

Take it as a cheap knock off of other applications of the same genre.

Known limitations as of 03 Nov 2018:
1. You have to drag each tile to the column's title;
2. You can't order your tiles in each column;
3. No tests; and
4. You have to manually run 
```
npm run build
```
and copy-paste all the files from src/main/javascript/activityboardfrontend/build to
src/main/resources/static/ each time you make a change to the front end.

You can run the frontend and the backend separately, just make sure you change the baseUrl variable in App.js.

Also, this is currently set up to run with an out of the box H2 database, so there is no actual persistance. You can change this by adding the appropriate dependencies in the pom.xml file in the root of the project. (MySQL is commented out in it currently)

Also, make a file called
application.properties and place it in src/main/resources with the following attributes (again, using MySQL as an example)
```
spring.jpa.hibernate.ddl-auto=create
spring.datasource.url=jdbc:mysql://localhost:3306/db_example
spring.datasource.username=springuser
spring.datasource.password=password
```


To build and run this,
```
git clone <the url of this repository>
mvn package
java -jar target/activity-board-0.1.0.jar

```