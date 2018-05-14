class Cart{
  constructor(){
      this.bucket = []
  };
  addItem(item_id,price,quantity){
      this.bucket.push({item_id,price,quantity});
      return this;
  };
  removeItem(item_id){
      let removeindex = this.bucket.map(function(item){return item.id;}).indexOf(item_id);
      this.bucket.splice(removeindex, 1);
      return this;
  };
  addDisc(disc){
      let after = this.bucket.map(item => (item.price * disc)/100 )
      console.log(after);
      
      after.push(this.bucket)
      return this;
  };
  print(){
      console.log(this.bucket)
  };

  
}; // end of class

let cart = new Cart()
cart.addItem(1,5000,2).addItem(2,4000,1).addItem(3,4000,1).addDisc(50).print()

