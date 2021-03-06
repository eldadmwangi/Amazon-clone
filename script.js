function getItems(){
    db.collection("Items").get().then((querySnapshot) => { 
        let Items=[];
        querySnapshot.forEach((doc) => {
            Items.push({
                id:doc.id,
                name:doc.data().name,
                image:doc.data().image,
                make:doc.data().make,
                price:doc.data().price,
                rating:doc.data().rating
            })   
            // console.log(Items)
        });

        generateItems(Items)

        function addToCart (item){
             let cartItem= db.collection("cart-items").doc(item.id); 
            cartItem.get()
            .then(function(doc){
                if(doc.exists){
                    cartItem.update({
                        quantity:doc.data().quantity +1
                    })
                } else{
                    cartItem.set({
                        image:item.image,
                        name:item.name,
                        make:item.make,
                        rating:item.rating,
                        price:item.price,
                        quantity:1
                    })
                }
                // console.log(doc.data().price)
            })
            
        }
        function generateItems (Items){
            // let ItemsHTML =""; 
            // console.log(Items)
            Items.forEach((item)=>{
                let doc= document.createElement("div")
                doc.classList.add("main-product", "mr-5") 
                doc.innerHTML = `
               <div class="product-image h-52 w-48 bg-white rounded-lg p-4">
                                <img class="w-full h-full object-contain" src='${item.image}'/>
                            </div> 
                            <div class="product-name text-gray-700 font-bold mt-2">
                                ${item.name}
                            </div> 
                            <div class="product-make text-green-700 font-bold mt-2">
                                ${item.make} 
                            </div>
                            <div class="product-rating text-yellow-300 font-bold my-1">
                                ??????????????? ${item.rating}
                            </div>
                            <div class="product-price font-bold text-gray-700 text-lg">
                                ${item.price}
                            </div>
        
                `                
                let addToCartEl= document.createElement("div")
                addToCartEl.classList.add("add-to-cart", "h-8", "w-28", "bg-yellow-500", "flex", "items-center", "justify-center", "text-white", "rounded", "text-md", "cursor-pointer", "hover:bg-yellow-600");
                addToCartEl.innerText ="add to cart";
                addToCartEl.addEventListener("click", function(){
                    addToCart(item)
                } )
                doc.appendChild(addToCartEl);
                document.querySelector(".main-section-products").appendChild(doc)

            })
            // document.querySelector(".main-section-products").innerHTML =ItemsHTML

        }
    });
}

getItems();