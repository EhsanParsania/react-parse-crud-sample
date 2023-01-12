import React, { useEffect } from 'react'
import Parse from 'parse'
const ProjectDataTable = Parse.Object.extend('ProjectDataTable')
const ProductGallery = Parse.Object.extend('ProductGallery')
const ProjectPage = Parse.Object.extend('ProjectPage')
const ProjectPageStrip = Parse.Object.extend('ProjectPageStrip')
const ProjectPageStripComponent = Parse.Object.extend('ProjectPageStripComponent')
const Project = Parse.Object.extend('Project')

function SlProjectMock() {
  const inputRef = React.createRef()
  const inputRef2 = React.createRef()

  const createNewRepositoryTable = async () => {
    const result = await Parse.Cloud.run('create-new-project-data-table', {
      name: 'table number october 21-2',
      fields: [
        { id: 'productTitle', name: "product", type: 'text' },
        { id: 'rating', name: "ratingoo", type: 'rating' },
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
      tableId: 'd9rGmSzuNEMYHWK',
      data: {
        productTitle: "october 21-2",
        rating: 2,
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
    const result = await Parse.Cloud.run('get-project-page-tree', { pageId: 'k2Ie8NqxGA0a0sH' })
    console.log(result)
  }

  // ============================================= CREATE PROJECT PAGE =============================================

  const createNewPage = async () => {
    const projectPage = new ProjectPage()
    const project = Project.createWithoutData('oLTgduuvCbdiuEb')
    await projectPage.save({
      project: project,
      name: 'page 1',
    })
  }

  const createNewPageStrip = async () => {
    const projectPageStrip = new ProjectPageStrip()
    const projectPage = ProjectPage.createWithoutData('HUEzXOlAWp1h28P')
    await projectPageStrip.save({
      parents: [{ projectPage, order: 1 }],
      name: 'strip 6',
    })
  }

  const reUseProjectPageStrip = async () => {
    const result = await Parse.Cloud.run('re-use-project-page-strip', {
      stripId: 'Uhu4GirbYbjwDRB',
      newProjectPageParentId: 'TsT1XX29A1WC018',
      newOrder: 2
    })
    console.log(result)
  }

  const updateStrip = async () => {
    const projectPageStrip = ProjectPageStrip.createWithoutData('3JMe2CANjAUEhKB')
    await projectPageStrip.save({
      saved: false,
    })
  }
  const deleteProjectPageStripFromOneParent = async () => {
    const result = await Parse.Cloud.run('delete-project-page-strip', {
      stripId: '3JMe2CANjAUEhKB',
      projectPageParentId: 'DYJfkZwhdWPD6Gb',
      // order: 1,
    })
    console.log(result)
  }


  const createNewPageStripComponent = async () => {
    const projectPageStripComponent = new ProjectPageStripComponent()
    const projectPageStrip = ProjectPageStrip.createWithoutData('UOElPXOa7CsunFf')
    // const projectPageStripComponent2 = ProjectPageStripComponent.createWithoutData('Xn5j7xJNPrstB0I')

    await projectPageStripComponent.save({
      projectPageStrip: { parent1: projectPageStrip, order1: 1 },
      name: 'component with strip parent',
      // projectPageStripComponent: projectPageStripComponent2
    })
  }
  // { projectPage: parse pointer, order: 1 },

  const updateComponent = async () => {
    const projectPageStripComponent = ProjectPageStripComponent.createWithoutData('238mO7BROAh3G9r')
    // const parent = ProjectPageStripComponent.createWithoutData('Xn5j7xJNPrstB0I')
    const projectPageStrip = ProjectPageStrip.createWithoutData('UOElPXOa7CsunFf')
    await projectPageStripComponent.save({
      // projectPageStripComponent: parent,
      projectPageStrip: projectPageStrip,

    })
  }

  const createNewPageStripComponentWithChildren = async () => {
    const projectPage = new ProjectPage()
    const page = await projectPage.save({
      name: 'page 1',
      project: Project.createWithoutData('SuCIkqEkUXvZwGG'),
      order: 3,
    })


    const projectPageStrip = new ProjectPageStrip()
    const strip = await projectPageStrip.save({
      name: 'front 1',
      parents: [{ projectPage: page, order: 1 }],
      // newStripOrder: 1
    })

    const projectPageStripComponent = new ProjectPageStripComponent()

    // const projectPageStrip = ProjectPageStrip.createWithoutData('bLjsPaegQSjZ8ag')
    // const projectPageStripComponent2 = ProjectPageStripComponent.createWithoutData('Xn5j7xJNPrstB0I')

    const res1 = await projectPageStripComponent.save({
      projectPageStrip: strip,
      name: 'component with strip parent',
      // projectPageStripComponent: projectPageStripComponent2
    })
    // const projectPageStrip = ProjectPageStrip.createWithoutData('RvpSxDtn5ThCjBu')
    const projectPageStripComponent2 = new ProjectPageStripComponent()

    const res2 = await projectPageStripComponent2.save({
      name: 'component with component parent 2',
      projectPageStripComponent: res1
    })
    const projectPageStripComponent3 = new ProjectPageStripComponent()

    const res3 = await projectPageStripComponent3.save({
      name: 'component with component parent 3',
      projectPageStripComponent: res2
    })

  }

  const removeComponent = async () => {
    await Parse.Cloud.run('remove-page-strip-components-tree', { componentId: 'vmxkvKuw72y7Jga' })
  }

  const removeComponentManually = async () => {
    const projectPageStripComponent = ProjectPageStripComponent.createWithoutData('StyU14WsqAIMyyv')
    await projectPageStripComponent.destroy()
  }

  const removeStrip = async () => {
    await Parse.Cloud.run('remove-page-strips-tree', { stripId: 'CX730afLom5whRr' })
  }

  const removeStripManually = async () => {
    const projectPageStrip = ProjectPageStrip.createWithoutData('v0mMXEKlDd3KA08')
    await projectPageStrip.destroy()
  }

  const removePage = async () => {
    await Parse.Cloud.run('remove-project-page-tree', { pageId: '31E4pmgtWT4xv8Q' })
  }

  const removePageManually = async () => {
    const projectPage = ProjectPage.createWithoutData('xCojrmVjaxWjXRP')
    await projectPage.destroy()
  }

  // ============================================= VARIANT =============================================

  const createNewVariant = async () => {
    const result = await Parse.Cloud.run('new-project-strip-variant', { stripId: 'SVxR5so1pnSAlZT' })
    console.log(result)
  }

  const removeVariant = async () => {
    const result = await Parse.Cloud.run('remove-project-strip-variant', { stripId: 'pl3i4F3B4o0pA3p' })
    console.log(result)
  }

  // ============================================= DUPLICATE PAGE =============================================

  const duplicatePage = async () => {
    const result = await Parse.Cloud.run('clone-project-page-tree', {
      pageId: 'Uhu4GirbYbjwDRB',
      newPageOrder: 3,
    })
    console.log(result)
  }

  const duplicatePageStrip = async () => {
    const result = await Parse.Cloud.run('clone-page-strips-tree', {
      stripId: 'v0mMXEKlDd3KA08',
      pageId: 'MU3EZhdoKFnz13q',
      newStripOrder: 7,
    })
    console.log(result)
  }

  const duplicatePageStripComponent = async () => {
    const result = await Parse.Cloud.run('clone-page-strip-component-tree', {
      componentId: 'ZhZGl0JISH9xLKh',
      newComponentOrder: 3
    })
    console.log(result)
  }


  const batchChangeIconCategory = async () => {
    const result = await Parse.Cloud.run('batch-change-icon-category', {
      // oldCategory: 'test',
      newCategory: 'new category',
      iconIDs: ['Rcif5dDFHW', 'UOFUUnN5pC']
    })
    console.log(result)
  }

  const batchDeleteIcon = async () => {
    const result = await Parse.Cloud.run('batch-delete-icon', {
      iconIDs: ['Rcif5dDFHW', 'UOFUUnN5pC']
    })
    console.log(result)
  }

  const createIconSet = async () => {
    const result = await Parse.Cloud.run('create-icon-set', {
      name: 'fake front',
    })
    console.log(result)
  }

  const test = async () => {
    const result = await Parse.Cloud.run('test', { projectPageId: 'DYJfkZwhdWPD6Gb' })
    console.log(result)
  }

  const getStripById = async () => {
    const projectPageStrip = ProjectPageStrip.createWithoutData('3JMe2CANjAUEhKB')
    await projectPageStrip.fetch()
    console.log(projectPageStrip.get('parents')[0])
    const parent1 = projectPageStrip.get('parents')[0]
    const res = await parent1.projectPage.fetch()
    console.log(res)
  }

  const test2 = async () => {
    // const projectPage = ProjectPage.createWithoutData('DYJfkZwhdWPD6Gb')
    const projectPageStripQuery = new Parse.Query(ProjectPageStrip)
    projectPageStripQuery.equalTo('parents.projectPage.objectId', 'DYJfkZwhdWPD6Gb')
    const result = await projectPageStripQuery.find()
    console.log(result)
  }

  const updateIconColors = async () => {
    // read from inputRef
    const id = inputRef.current.value
    const iconColors = inputRef2.current.value
    const SVGColors = iconColors.match(/#[0-9a-fA-F]{3,8}/g);
    console.log(SVGColors)
    const result = await Parse.Cloud.run('update-icon-colors', {
      iconId: id,
      colors: SVGColors
    })
    console.log(result)
  }



  return (
    <div className="App" >
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

        =================================================    PROJECT PAGE      ========================================    <br />

        <button style={{ margin: '7px', padding: '5px' }} onClick={createNewPage}>create new page</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={createNewPageStrip}>create new pageStrip</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={createNewPageStripComponent}>create new pageStripComponent</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={createNewPageStripComponentWithChildren}>create new pageStripComponent with children</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={updateComponent}>update component</button><br />

        <button style={{ margin: '7px', padding: '5px', background: 'red' }} onClick={removeComponent}>remove component</button><br />
        <button style={{ margin: '7px', padding: '5px', background: 'red' }} onClick={removeComponentManually}>remove component manually</button><br />
        <button style={{ margin: '7px', padding: '5px', background: 'red' }} onClick={removeStrip}>remove strip</button><br />
        <button style={{ margin: '7px', padding: '5px', background: 'red' }} onClick={removeStripManually}>remove strip manually</button><br />
        <button style={{ margin: '7px', padding: '5px', background: 'red' }} onClick={removePage}>remove page</button><br />
        <button style={{ margin: '7px', padding: '5px', background: 'red' }} onClick={removePageManually}>remove page manually</button><br />

        <button style={{ margin: '7px', padding: '5px' }} onClick={getStripById}>get strip by id</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={updateStrip}>update Strip</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={reUseProjectPageStrip}>re-use project page strip</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={deleteProjectPageStripFromOneParent}>delete strip </button><br />

        <button style={{ margin: '7px', padding: '5px' }} onClick={test}>test</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={test2}>test2</button><br />

        ===================================================== VARIANT  =========================================   <br />

        <button style={{ margin: '7px', padding: '5px', background: 'greenYellow' }} onClick={createNewVariant}>create new variant</button><br />
        <button style={{ margin: '7px', padding: '5px', background: 'greenYellow' }} onClick={removeVariant}>remove Variant</button><br />


        =====================================================  ============================================   <br />


        <button style={{ margin: '7px', padding: '5px' }} onClick={saveImageToGalleryWithGalleryNumber}>save image</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={removeImageFromRow}>remove Image</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={saveFileToRow}>save file to row</button><br />

        =====================================================  DUPLICATE  =========================================   <br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={duplicatePage}>duplicate page</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={duplicatePageStrip}>duplicate page strip</button><br />
        <button style={{ margin: '7px', padding: '5px' }} onClick={duplicatePageStripComponent}>duplicate page strip component</button><br />

        <button style={{ margin: '7px', padding: '5px' }} onClick={batchChangeIconCategory}>batch change icon category</button><br />

        <button style={{ margin: '7px', padding: '5px' }} onClick={batchDeleteIcon}>batch delete icon</button><br />


        <button style={{ margin: '7px', padding: '5px' }} onClick={createIconSet}>create icon set</button><br />

        =====================================================  SVG  =========================================   <br />

        <input type={'text'} style={{margin:'10px'}} ref={inputRef} /><br />
        <textarea style={{margin:'10px', padding:'7px',minWidth:'500px'}} ref={inputRef2} /> <br />
        <button style={{ margin: '10px', padding: '5px', background: 'linear-gradient(to right, #ff9966 0%, #ff4e62 100%)' }} onClick={updateIconColors}>updateIconColors</button><br />

     
        <br /> <br /> <br />
        <br /> <br /> <br />
      </div>
    </div >
  )
}

export default SlProjectMock