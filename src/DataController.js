import AsyncStorage from '@react-native-async-storage/async-storage';


const getAdress = async(setUserAdress, setChosenAdress) => {
    
    AsyncStorage.getItem('userToken').then(async(token_result) => {
      const parsedToken = JSON.parse(token_result);                          
      try{              
        const response = await fetch(`https://api.yobalapp.com/adress/user`, {
          method: 'GET',                    
          headers: {
              Accept:  'application/json',               
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + parsedToken
          },
        })
        const responseJson = await response.json();                
        setUserAdress(responseJson)
        setChosenAdress({
          formattedAdress : responseJson.adresses[0],
          index: 0
        })
    }         
      catch{
        err => console.log(err)
      }  
    })        
  }

  const getCategories = async(setCategoryOne,  setCategoryTwo) => {

    const formatCategories = (category) => {
      var categories = category.categories;
      console.log('this is categories aziudb', categories)
      var categoriesOne = []
      var categoriesTwo = []

      for(var i = 0; i < categories.length ; i++){        

        if(i <= 2){
          categoriesOne.push(categories[i])
          // alert('ef')
        }
        else{
          categoriesTwo.push(categories[i])
          // alert('ef')
        }
        
      }
      setCategoryOne(categoriesOne)
      setCategoryTwo(categoriesTwo)

    }
    
    AsyncStorage.getItem('userToken').then(async(token_result) => {   
      const parsedToken = JSON.parse(token_result);                          
      try{
        const response = await fetch(`https://api.yobalapp.com/category`, {
          method: 'GET',                    
          headers: {
              Accept:  'application/json',               
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + parsedToken
          },
        })
        const responseJson = await response.json();                        
        formatCategories(responseJson)
    }         
      catch{
        err => console.log(err)
      }  
    })        
  }

  const getMarkets = async(setBrandsList, categoryItem, userAdress, setEmptyList) => {

    // console.log('this is category id :', userAdress.id)
    
    AsyncStorage.getItem('userToken').then(async(token_result) => {   
      const parsedToken = JSON.parse(token_result);                          
      try{              
        const response = await fetch(`https://api.yobalapp.com/shop/categorie/${categoryItem.id}/${userAdress.id}}`, {
          method: 'GET',                 
          headers: {
              Accept:  'application/json',               
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + parsedToken
          },
        })
        const responseJson = await response.json(); 
        let shopsList = responseJson.shops
        if(shopsList.length === 0){
          setEmptyList(true)
        }
        else{
          setBrandsList(responseJson.shops)
        }       
        console.log('this is markets', responseJson)
    }         
      catch{
        err => console.log(err)
      }  
    })        
  }

  const getProducts = async(setProducts, marketId) => {    
    
    AsyncStorage.getItem('userToken').then(async(token_result) => {   
      const parsedToken = JSON.parse(token_result);                          
      try{              
        const response = await fetch(`https://api.yobalapp.com/menu-shop/shop/${marketId}}`, {
          method: 'GET',                 
          headers: {
              Accept:  'application/json',               
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + parsedToken
          },
        })
        const responseJson = await response.json();    
        setProducts(responseJson.menuShop[0].products)        
        
    }         
      catch{
        err => console.log(err)
      }  
    })        
  }


  const alreadyLogedIn = async(setSpinner, setUser) => {    

    setSpinner(true)
    AsyncStorage.getItem('userToken').then(async(token_result) => {   
      const parsedToken = JSON.parse(token_result);                          
      try{              
        const response = await fetch(`https://api.yobalapp.com/custmer/verif`, {
          method: 'GET',                 
          headers: {
              Accept:  'application/json',               
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + parsedToken
          },
        })
        const responseJson = await response.json();    
        console.log('already loged in ',responseJson)
        if(responseJson.user){
          setUser(responseJson)
        }
        setSpinner(false)
        
        
    }         
      catch{
        err => console.log(err)
      }  
    })        
  }

  const validatePanier = (panierData, setSpinner) => {
    console.log('this is panier object ', panierData)
    setSpinner(true)
    AsyncStorage.getItem('userToken').then(async(token_result) => {   
      const parsedToken = JSON.parse(token_result);                          
      try{              
        const response = await fetch(`https://api.yobalapp.com/order`, {
          method: 'POST',                 
          headers: {
              Accept:  'application/json',               
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + parsedToken
          },
          body: JSON.stringify(panierData)
        })
        const responseJson = await response.json();    
        console.log('Panier validation',responseJson)

        setSpinner(false)
        
        
    }         
      catch{
        err => console.log(err)
      }  
    })    
  }

  const getCommandes = async(setSpinner, setCommandes) => {    

    setSpinner(true)
    AsyncStorage.getItem('userToken').then(async(token_result) => {   
      const parsedToken = JSON.parse(token_result);                          
      try{              
        const response = await fetch(`https://api.yobalapp.com/order/custmer`, {
          method: 'GET',                 
          headers: {
              Accept:  'application/json',               
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + parsedToken
          },
        })
        const responseJson = await response.json();    
        console.log('thats commandes listaaa',responseJson.orders[responseJson.orders.length-1])
        setCommandes(responseJson)
        setSpinner(false)
        
        
    }         
      catch{
        err => console.log(err)
      }  
    })        
  }
  

  export {getAdress, getCategories, getMarkets, getProducts, alreadyLogedIn, validatePanier, getCommandes}