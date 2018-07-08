const data = {
   phone: "",
   name: ""
};

const localManager = {
   setPhone(phone) {
      data.phone = phone;
      window.localStorage.setItem("phone",phone);
   },
   setName(name) {
      data.name = name;
      window.localStorage.setItem("name",name);
   },
   getPhone() {
      if (!data.phone){
         data.phone=  window.localStorage.getItem("phone");
      }
      return data.phone;
   },
   getName() {
      if (!data.name){
         data.name=  window.localStorage.getItem("name");
      }
      return data.name;
   }
};
export {localManager}