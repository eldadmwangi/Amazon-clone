 function getCartItems (){
     db.collection("cart-items").onSnapshot((Snapshot)=>{
        let cartItems=[];
        Snapshot.docs.forEach((doc)=>{
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
        //  console.log(cartItems)
        generateCartItems(cartItems)
        getTotalCost(cartItems)
     })
 }

 function getTotalCost (items) {
     let totalCost =0;  
     items.forEach((item)=>{
         totalCost += (item.price * item.quantity);
         //either use template literals or numeral link above from numeral.js//
        //  document.querySelector(".total-cost-number").innerText = `
        //  $${totalCost}
        //  `
        document.querySelector(".total-cost-number").innerText = numeral(totalCost).format('$0,0.00')
     })

 }

 function decreaseCount(itemid) {
     let cartItem = db.collection ("cart-items").doc(itemid);
     cartItem.get().then(function(doc){
         if (doc.exists) {
           if (doc.data().quantity >1 ){
               cartItem.update({
                   quantity:doc.data().quantity -1
               })
           }  
         }
     })

 }

 function increaseCout(itemid) {
     let cartItem = db.collection("cart-items").doc(itemid);
     cartItem.get().then(function(doc){
         if (doc.exists) {
             if (doc.data().quantity > 0){
                 cartItem.update({
                     quantity:doc.data().quantity +1
                 })
             }
         }
     })
 }

 function deleteItem (itemid){
     db.collection("cart-items").doc(itemid).delete()
 }

 function generateCartItems (cartItems) {
     let itemsHTML ="";
      cartItems.forEach((item)=>{
        //   console.log(item.price)
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
                            <div data-id=${item.id} class="cart-item-decrease cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex items-center justify-center hover:bg-gray-200 mr-2">
                                <i class="fas fa-chevron-left"></i>
                            </div>
                            <h4 class="text-gray-400"> x ${item.quantity} </h4>
                            <div data-id=${item.id} class="cart-item-increase cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex items-center justify-center hover:bg-gray-200 ml-2">
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            
                        </div>
                        <div class="cart-item-total-cost w-48 font-bold text-gray-400 ">
                             $${item.price * item.quantity} 
                        </div>
                        <div data-id=${item.id} class="cart-item-delete w-10 font-bold text-gray-440 cursor-pointer hover:text-gray-400">
                            <i class="fas fa-times"></i>
                        </div>  
                        
                    </div>

        `
     })
     //crazy . in class had me here all night//
     document.querySelector(".cart-items").innerHTML = itemsHTML;

        createEventListeners()
 }
 function createEventListeners (){
     let decreaseButtons = document.querySelectorAll(".cart-item-decrease"); 
     let increaseButtons =document.querySelectorAll(".cart-item-increase");
     let deleteButtons = document.querySelectorAll(".cart-item-delete");

     decreaseButtons.forEach((button)=>{
       button.addEventListener("click", function(){
           decreaseCount(button.dataset.id);
       })  
     })
     increaseButtons.forEach((button)=>{
         button.addEventListener("click",function(){
             increaseCout(button.dataset.id)
         })
     })
     deleteButtons.forEach((button)=>{
         button.addEventListener("click", function(){
             deleteItem(button.dataset.id)
         })
     })
 }


 getCartItems()