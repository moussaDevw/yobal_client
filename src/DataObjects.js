const alreadyLogedIn = 
{
    "error":false,
    "isAuth":true,
    "user":{
        "active":true,
        "blocked":false,
        "createdAt":"2021-04-17T21:39:02.000Z",
        "deleted":false,
        "email":"yobaltest@gmail.com",
        "fullName":"abo3",
        "id":25,
        "image":null,
        "password":"$2a$10$iM3Vw9wvpRK36i2Ev9NKVOvGfcJSXAxR0hrUmX70DbFz1N0M5w5oW",
        "phone":"0678767656",
        "typeId":3,
        "updatedAt":"2021-04-17T21:39:02.000Z"
    }
}


const productObject = {
    "active": true,
    "createdAt": "2021-04-20T17:05:04.000Z",
    "deleted": false,
    "description": "Sauce au pâte d’arachide",
    "id": 27,
    "imageUri": "2021-04-20-17-05:04.webp",
    "menuShopId": 5,
    "name": "Mafé",
    "price": 150,
    "updatedAt": "2021-04-20T17:05:04.000Z"
}

const panier = [
    {
       "active":true,
       "createdAt":"2021-03-13T19:08:53.000Z",
       "deleted":false,
       "description":"Burger bnin walakin ghali",
       "id":13,
       "imageUri":"2021-03-13-19-08:52.png",
       "menuShopId":1,
       "name":"Burger",
       "price":32,
       "quantity":4,
       "updatedAt":"2021-03-14T15:29:12.000Z"
    }
 ]

 const getCommandes = {
     orders:{
        "adressId":14,
        "amountWay":"online",
        "createdAt":"2021-06-04T00:41:52.000Z",
        "deleted":false,
        "deliveryAmount":12,
        "deliveryManId":null,
        "id":11,
        "name":null,
        "order_products":[
           {
              "createdAt":"2021-06-04T00:41:52.000Z",
              "deleted":false,
              "id":3,
              "name":"Pizza",
              "orderId":11,
              "productId":11,
              "quantity":2,
              "updatedAt":"2021-06-04T00:41:52.000Z"
           }
        ],
        "payed":false,
        "shopId":1,
        "statusId":1,
        "totalAmount":42,
        "updatedAt":"2021-06-04T00:41:52.000Z",
        "userId":56
     }
 }