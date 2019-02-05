class Auth {
  constructor() {
    this.authenticated = false;
  }

  //   login(cb) {
  //     if (localStorage.token || sessionStorage.token) {
  //       this.authenticated = true;
  //       console.log("Token exists");
  //       cb();
  //     }
  //   }

  //   logout(cb) {
  //     if (localStorage.token || sessionStorage.token) {
  //       localStorage.clear();
  //       sessionStorage.clear();
  //       this.authenticated = false;
  //       cb();
  //     }
  //   }

  //   isAuthenticated() {
  //     return this.authenticated;
  //   }
}

export default new Auth();
