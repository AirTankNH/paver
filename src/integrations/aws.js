class AwsIntegration {
  constructor (AWS) {
    this.S3 = new AWS.S3()
    this.Org = new AWS.Organizations()
    this.Iam = new AWS.IAM()
  }
  // Organizations
  checkIfAccountExists (accountName) {
    return this.Org.listAccounts().promise()
      .then(accountList => {
        for (var index = 0; index < accountList.Accounts.length; ++index) {
          var account = accountList.Accounts[index]
          if (account.Name === accountName) {
            return true
          }
        }
        return false
      })
  }

  createDevEnv (email, firstName, lastName) {
    var params = {
      AccountName: `${firstName}_${lastName}_development`,
      Email: email
    }

    return this.checkIfAccountExists(params.AccountName)
      .then(doesExist => {
        if (doesExist) {
          console.log('Account Exists!')
        } else {
          return this.Org.createAccount(params).promise()
            .then(response => {
              console.log('Account Creating!, Resp:', response)
            })
            .catch(err => {
              console.log(err, 'Shit went bad. Fix your shit.')
            })
        }
      })
  }
  // IAM Stuff

  addAdminIamUser () {

  }
}

module.exports = AwsIntegration
