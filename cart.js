 function getCartItems (){
     db.collection("cart-items").onSnapshot((Snapshot)=>{
        let cartItems=[];
        Snapshot.forEach((doc)=>{
            cartItems.push({
                id:doc.id,
              //USE THE SPREAD OPERATOR//
                 ...doc.data()
                // id:doc.id,
                // name:doc.data().name,
                // image:doc.data().image,
                // make:doc.data().make,
                // price:doc.data().price,
                // rating:doc.data().rating   

            })
        }) 
        // console.log(cartItems, 'this is what the carrt items are')
        generateCartItems(cartItems)

     })
 }
 function generateCartItems (cartItems) {
     let itemsHTML ="";
      cartItems.forEach((item)=>{
         itemsHTML += `
        <div class="cart-item flex items-center pb-4 border-b border-gray-300">
                        <div class="cart-item-image w-40 h-24 bg-white-300 p-4 rounded-lg">
                            <img class="w-full h-full object-contain" src="${item.image}" alt=""/>
                        </div>
                        <div class="cart-item-details flex-grow">
                            <div class="cart-item-tittle font-bold text-sm text-gray-600">
                            ${item.name}
                            </div>
                            <div class="cart-item-brand text-sm font-bold text-gray-400">
                                ${item.make}
                            </div>
                        </div>
                        <div class="cart-item-counter w-48 flex items-center">
                            <div class="chevron-left cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex items-center justify-center hover:bg-gray-200 mr-2">
                                <i class="fas fa-chevron-left"></i>
                            </div>
                            <h4 class="text-gray-400"> x ${item.quantity} </h4>
                            <div class="chevron-right cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex items-center justify-center hover:bg-gray-200 ml-2">
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            
                        </div>
                        <div class="cart-item-total-cost w-48 font-bold text-gray-400 ">
                            ${item.price}
                        </div>
                        <div class="cart-item-delete w-10 font-bold text-gray-440 cursor-pointer hover:text-gray-400">
                            <i class="fas fa-times"></i>
                        </div>  
                    </div>
        `
     })
     //crazy . in class had me here all night//
     document.querySelector(".cart-items").innerHTML = itemsHTML;
 }


 getCartItems()