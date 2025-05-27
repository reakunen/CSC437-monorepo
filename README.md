# CSC 437 Monorepo# CSC437-monorepo

[Miro board link](https://miro.com/app/board/uXjVIDh1RNE=/)

cd into packages/proto and npm run build, (it should create the dist file) 

then do npm run start npm start


Finished lab 9, the 
food item and food list 
https://bmai01.csse.dev/food.html

cd /home/bmai01/CSC437-monorepo/packages/proto

ssh bmai01@bmai01-host.csse.dev
nohup npm --workspace=proto start > nohup.out 2>&1 &

curl -X POST \
  'http://localhost:3000/api/foods' \
  -H 'Content-Type: application/json' \
  -d '{
    "id": 3
    "title": "Shoyu Ramen",
    "imageUrl": "https://example.com/images/shoyu.jpg",
    "price": "$14.99",
    "restaurant": "Tokyo Noodles",
    "description": "Classic soy sauce-based ramen with bamboo shoots and green onions.",
    "rating": 2
}'

curl -X POST \
  'http://localhost:3000/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "john_doe",
    "password": "secret123"
  }'


brianm17055
Password123!