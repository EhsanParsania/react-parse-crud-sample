import React, { useEffect } from 'react'
import Parse from 'parse'
const ProjectDataTable = Parse.Object.extend('ProjectDataTable')
const ProductGallery = Parse.Object.extend('ProductGallery')
const ProjectPage = Parse.Object.extend('ProjectPage')
const ProjectPageStrip = Parse.Object.extend('ProjectPageStrip')
const ProjectPageStripComponent = Parse.Object.extend('ProjectPageStripComponent')
const Project = Parse.Object.extend('Project')

function SlProjectMock() {


  const createNewRepositoryTable = async () => {
    const result = await Parse.Cloud.run('create-new-project-data-table', {
      name: 'table number 2',
      fields: [
        { productTitle: "text" },
        { rating: "rating" },
      ]
    })
    console.log(result)
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
      tableId: 'T724g7UVrLXhUQg',
      data: {
        productTitle: "xbox 10",
        rating: 1,
      },

    })
    console.log(result)
  }

  async function saveFile() {
    var reader = new FileReader();
    var file = document.querySelector('#inp').files[0];
    reader.readAsDataURL(file);
    reader.onload = async function () {
      console.log(reader.result);
      const plainBase64 = reader.result.split(',')[1]
      let imageObj = new Parse.File('image', file);
      let parseImage = await imageObj.save();
      const ProductGallery = Parse.Object.extend("ProductGallery");
      const productGallery = new ProductGallery()
      await productGallery.save({ image: parseImage, rowId: 'GKb8MrjjEf' })
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const saveImageToGalleryWithGalleryNumber = async () => {
    Parse.Cloud.run('add-image-to-row-gallery', {
      rowId: "XWvt0W4uzcq3d74",
      galleryNumber: 2,
      base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=',
      // 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    })
  }

  const saveFileToRow = async () => {
    const result = await Parse.Cloud.run('add-image-to-row', {
      rowId: 'XWvt0W4uzcq3d74',
      base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=',
      imageNumber: 2
    })
    console.log(result)
  }

  const isAdmin = async () => {
    const result = await Parse.Cloud.run('is-admin')
    console.log(result)
  }

  const removeImageFromRowGallery = async () => {
    const result = await Parse.Cloud.run('remove-image-from-gallery', {
      rowId: "XWvt0W4uzcq3d74",
      galleryNumber: 2,
      imageIndex: 1
    })
    console.log(result)
  }

  const removeImageFromRow = async () => {
    await Parse.Cloud.run('remove-image-from-row', {
      rowId: "XWvt0W4uzcq3d74",
      imageNumber: 1
    })
  }

  const getMyProductGallerys = async () => {
    const query = new Parse.Query(ProductGallery)
    const result = await query.find()
    console.log(result)
  }

  const updateGroupId = async () => {
    const result = await Parse.Cloud.run('update-row-group-id', {
      groupId: "22222222222",
      rowId: "BRW8pgQRJS"
    })
    console.log(result)
  }

  const updateGroupOwner = async () => {
    const result = await Parse.Cloud.run('update-row-group-owner', {
      groupId: "8rNSvntDu1",
      rowId: "Md83E1K2vAr3IYL"
    })
  }

  const newWayTosaveImageToGalleryWithGalleryNumber = async () => {
    var reader = new FileReader();
    var file = document.querySelector('#inp').files[0];

    let imageObj = new Parse.File('image', file);
    let parseImage = await imageObj.save();
    const ProductGallery = Parse.Object.extend("ProductGallery");
    const productGallery = new ProductGallery()
    await productGallery.save({ image: parseImage, rowId: 'GKb8MrjjEf' })
  }

  const deleteIconSet = async () => {
    const result = await Parse.Cloud.run('delete-icon-set', {
      iconSetId: 'VCphikfgDQ'
    })
    console.log(result)
  }

  const getTree = async () => {
    const result = await Parse.Cloud.run('get-project-page-tree', { pageId: '0rU7sPPdv25vP5V' })
    console.log(result)
  }

  const createNewPage = async () => {
    const projectPage = new ProjectPage()
    const project = Project.createWithoutData('IYeEVHkwhD9fm9P')
    await projectPage.save({
      project: project,
      name: 'page 1',
    })
  }

  const createNewPageStrip = async () => {
    const projectPageStrip = new ProjectPageStrip()
    const projectPage = ProjectPage.createWithoutData('0rU7sPPdv25vP5V')
    await projectPageStrip.save({
      projectPage: projectPage,
      name: 'strip 1',
    })
  }

  const createNewPageStripComponent = async () => {
    const projectPageStripComponent = new ProjectPageStripComponent()
    const projectPageStrip = ProjectPageStrip.createWithoutData('mvpNqB8uzZjfyn8')
    // const projectPageStripComponent2 = ProjectPageStripComponent.createWithoutData('IJeOASgGvJc0Pxt')

    await projectPageStripComponent.save({
      projectPageStrip: projectPageStrip,
      name: 'component 1',
      // projectPageStripComponent: projectPageStripComponent2
    })
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
        <button style={{ margin: '7px', padding: '5px' }} onClick={createNewRepositoryTable}>Create new project table</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={getRepositoryTable}>Get repository table</button><br />


        <button style={{ margin: '7px', padding: '5px' }} onClick={createNewProjectRow}>create new project row</button><br />

        <button style={{ margin: '7px', padding: '5px' }} onClick={logout}>Logout</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={() => { window.history.push("/auth"); }}>login</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={saveFile}>save file</button><br />


        <button style={{ margin: '7px', padding: '5px' }} onClick={isAdmin}>is admin</button><br />

        <button style={{ margin: '7px', padding: '5px' }} onClick={removeImageFromRowGallery}>remove image from row gallery</button><br />

        <button style={{ margin: '7px', padding: '5px' }} onClick={getMyProductGallerys}>get my product gallery</button><br />

        <button style={{ margin: '7px', padding: '5px' }} onClick={updateGroupId}>update group id</button><br />

        <button style={{ margin: '7px', padding: '5px' }} onClick={updateGroupOwner}>update Group Owner</button><br />

        <button style={{ margin: '7px', padding: '5px' }} onClick={newWayTosaveImageToGalleryWithGalleryNumber}>new file save way</button><br />



        <button style={{ margin: '7px', padding: '5px' }} onClick={deleteIconSet}>delete icon set</button><br />

        <button style={{ margin: '7px', padding: '5px' }} onClick={getTree}>get page tree</button><br />

        <button style={{ margin: '7px', padding: '5px' }} onClick={createNewPage}>create new page</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={createNewPageStrip}>create new pageStrip</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={createNewPageStripComponent}>create new pageStripComponent</button><br />

        <button style={{ margin: '7px', padding: '5px' }} onClick={saveImageToGalleryWithGalleryNumber}>save image</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={removeImageFromRow}>remove Image</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={saveFileToRow}>save file to row</button><br />



        <input id="inp" type="file" />
      </div>
    </div>
  )
}

export default SlProjectMock