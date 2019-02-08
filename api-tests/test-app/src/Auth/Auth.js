// class Auth {
//   constructor() {
//     this.authenticated = false;
//   }

//     login(callback) {
//       if (localStorage.token || sessionStorage.token) {
//         this.authenticated = true;
//         console.log("Token exists");
//         callback();
//       }
//     }

//     logout(callback) {
//       if (localStorage.token || sessionStorage.token) {
//         localStorage.clear();
//         sessionStorage.clear();
//         this.authenticated = false;
//         callback();
//       }
//     }

//     isAuthenticated() {
//       return this.authenticated;
//     }
// }

// export default new Auth();
