const data = {
   phone: "",
   name: ""
};

const localManager = {
   setPhone(phone) {
      data.phone = phone;
   },
   setName(name) {
      data.name = name;
   },
   getPhone() {
      return data.phone;
   },
   getName() {
      return data.name;
   }
};
export {localManager}