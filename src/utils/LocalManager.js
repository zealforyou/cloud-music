const data = {
   phone: "",
   name: "",
   avatar:''
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
   setAvatar(avatar) {
      data.avatar = avatar;
      window.localStorage.setItem("avatar",avatar);
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
   },
   getAvatar() {
      if (!data.avatar){
         data.avatar=  window.localStorage.getItem("avatar");
      }
      return data.avatar;
   }
};
export {localManager}