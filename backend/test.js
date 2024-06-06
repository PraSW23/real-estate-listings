const jwt = require('jsonwebtoken');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MWMwYzg3YmYyYjA2M2U0ZjJlOTM1In0sImlhdCI6MTcxNzY4MzUwMSwiZXhwIjoxNzE3Njg3MTAxfQ.QocTOuMeo3NzPV0IRRxwGYGahjcVqOl5eRysqGJNW-o';

const decoded = jwt.decode(token, { complete: true });
console.log(decoded);

