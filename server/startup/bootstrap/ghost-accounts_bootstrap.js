//ghost-accounts_bootstrap.js
//fills our collections with ghost accounts data when the server starts (and if our collections don't have any data)
//ghost accounts are accounts that allow the user to access the real register page.
seed_ghostAccounts=function(){
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Ghost accounts to access real register page
  Seed( 'Users', {
    data: [
      //Student ghost account
      {
        username: 'registerStudent',
        email: 'registerStudent@register.com',
        password: 'randomStudent', //register key
        isAuthorized: false,
        isAuthorizedFilter: "false",
        roles: ['unregistered']


      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //Tutor ghost account
      {
        username: 'registerTutor',
        email: 'registerTutor@register.com',
        password: 'randomTutor',//register key
        isAuthorized: false,
        isAuthorizedFilter: "false",
        roles: ['unregistered']
      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //Educator ghost account
      {
        username: 'registerEducator',
        email: 'registerEducator@register.com',
        password: 'randomEducator', //register key
        isAuthorized: false,
        isAuthorizedFilter: "false",
        roles: ['unregistered']

      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //Coordinator ghost account
      {
        username: 'registerCoordinator',
        email: 'registerCoordinator@register.com',
        password: 'randomCoordinator', //register key
        isAuthorized: false,
        isAuthorizedFilter: "false",
        roles: ['unregistered']
      }
    ]
  });
}
