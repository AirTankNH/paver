class AwsIntegration {
  constructor (AWS) {
    this.S3 = new AWS.S3()
    this.Org = new AWS.Organizations()
    this.Iam = new AWS.IAM()
  }

  // Cloudformation

  // createStack

  // updateStack

  // checkStackExists

  // getStackStatus

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

  checkIfAccountIsReady (requestId) {
    var params = {
      CreateAccountRequestId: requestId
    }
    return this.Org.describeCreateAccountStatus(params).promise()
      .then(response => {
        if (response.State === 'SUCCEEDED') {
          return true
        } else {
          return false
        }
      })
  }

  createNewAccount (email, firstName, lastName) {
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

  // IAM

  createAdminIamGroupAndUser (userName, accountID) {

    // createAdminGroup
    return this.Iam.createGroup({GroupName: 'Administrators'}).promise()
      .then(createGroupResponse => {
        var policyAttachParams = {
          GroupName: createGroupResponse.Group.GroupName,
          PolicyArn: 'arn:aws:iam::aws:policy/AdministratorAccess'
        }
        return this.Iam.attachGroupPolicy(policyAttachParams).promise()
          .then( () => {
            return this.Iam.createUser(userName) {
            }
          })
            .then( () => {
              var groupAttachParams = {
                GroupName: createGroupResponse.Group.GroupName,
                UserName: userName
              }
              return this.Iam.addUserToGroup(groupAttachParams).promise()
                .then( () => {
// access keys
                })
            })
      })

    

  }
}

module.exports = AwsIntegration
