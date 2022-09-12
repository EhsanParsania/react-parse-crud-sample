import React from 'react'
import Parse from 'parse'
const ProjectDataTable = Parse.Object.extend('ProjectDataTable')
const ProjectDataRow = Parse.Object.extend('ProjectDataRow')

function SlProjectMock() {

  const createNewRepositoryTable = async () => {
    // await Parse.Cloud.run('start-playing', { preset_id: presetId, wallet: userWalletAddress, balance: userBalance })

    const result = await Parse.Cloud.run('create-new-project-data-table', {
      tableName: 'From Cloud function',
      fields: {
        productTitle: "text",
        rating: "rate",
        color: "color",
        price: "currency[$]"
      }
    })
    console.log(result)
    // const projectDataTable = new ProjectDataTable()
    // projectDataTable.set('tableName', 'test')
    // projectDataTable.set('user', Parse.User.current())
    // projectDataTable.set('fields', {
    //   productTitle: "text",
    //   rating: "rate",
    //   color: "color",
    //   price: "currency[$]"
    // })
    // await projectDataTable.save()
  }

  const getRepositoryTable = async () => {
    const query = new Parse.Query(ProjectDataTable)
    const result = await query.find()
    console.log(result)
  }

  const logout = async () => {
    await Parse.User.logOut()

  }

  const createNewProjectRow = async () => {
    const result = await Parse.Cloud.run('create-new-project-data-row', {
      tableId: 'wa5AVnS1A4',
      groupId:'IHCKvT8Rxb',
      data: {
        productTitle: "xbox 5",
        rating: 1,
        color: '#FFFFFF',
        price: '$10'
      }
    })
    console.log(result)
    // const projectDataRow = new ProjectDataRow()
    // projectDataRow.set({
    //   tableId: 'wa5AVnS1A4',
    //   groupOwner: true,
    //   data: {
    //     productTitle: "xbox 5",
    //     rating: 1,
    //     color: '#FFFFFF',
    //     price: '$10'
    //   }
    // })
    // await projectDataRow.save()
  }

  return (
    <div className="App">
      <header className="app-header">
        <img className="logo" alt="back4app's logo" src={'https://blog.back4app.com/wp-content/uploads/2019/05/back4app-white-logo-500px.png'} />
        <h2 className="spacing">parse hooks</h2>
        <span>SLC mock</span>
        <p>{Parse.User.current().get('username')}</p>
      </header>
      <div>
        <button onClick={createNewRepositoryTable}>Create new project table</button><br />
        <button onClick={getRepositoryTable}>Get repository table</button><br />


        <button onClick={createNewProjectRow}>create new project row</button><br />

        <button onClick={logout}>Logout</button><br />
        <a href="/login">Login</a>
      </div>
    </div>
  )
}

export default SlProjectMock