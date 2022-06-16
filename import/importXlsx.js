/* eslint-disable no-console */
const jsonfile = require('jsonfile')
const XLSX = require('xlsx')

let checklistData = []
let listData = []
let profileData = {}

const exportJson = (name, targetFilePath, exportData) => {
  jsonfile.writeFile(
    targetFilePath,
    exportData,
    { spaces: 2, EOL: '\r\n' },
    (err) => {
      if (!err) {
        console.log('📥 exported ' + name + ' data')
        console.log(
          '---------------------------------------------------------------------------------'
        )
      } else {
        // console.error(err)
        console.error('error')
      }
    }
  )
}

const loadChecklistData = (sheet) => {
  console.log('✅ Ready to import data')
  console.log(
    '---------------------------------------------------------------------------------'
  )

  const xlsxData = XLSX.readFile(sheet)

  const loadedData = XLSX.utils.sheet_to_json(
    xlsxData.Sheets.SNSWNewStarterChecklist
  )

  console.log('📄 Got sheet and converted to json')

  console.log(
    '---------------------------------------------------------------------------------'
  )

  const tempData = []

  loadedData.forEach((item) => {
    const task = {
      id: item.id,
      name: item.name,
      time: item.time,
      description: item.description,
      outcome: item.outcome,
      role: item.role,
      list: item.list.slice(4),
      category: item.category,
    }

    if (item.list !== 'none') {
      // Check if task exists, if not add it
      const taskIndex = tempData.findIndex(({ id }) => id === task.id)

      if (taskIndex < 0) {
        tempData.push(task)

        console.log('📩 Imported Task')
      }
    }
  })

  checklistData = tempData

  console.log(
    '---------------------------------------------------------------------------------'
  )
}

const loadListData = (sheet) => {
  console.log('✅ Ready to import data')
  console.log(
    '---------------------------------------------------------------------------------'
  )

  const xlsxData = XLSX.readFile(sheet)

  const loadedData = XLSX.utils.sheet_to_json(xlsxData.Sheets.ReferenceSheet)

  console.log('📄 Got sheet and converted to json')

  console.log(
    '---------------------------------------------------------------------------------'
  )

  const tempData = []

  loadedData.forEach((item) => {
    if (item.lists) {
      tempData.push(item.lists.slice(4))
    }

    console.log('📩 Imported List')
  })

  listData = tempData

  console.log(
    '---------------------------------------------------------------------------------'
  )
}

const loadProfileData = (sheet) => {
  console.log('✅ Ready to import data')
  console.log(
    '---------------------------------------------------------------------------------'
  )

  const xlsxData = XLSX.readFile(sheet)

  const loadedData = XLSX.utils.sheet_to_json(xlsxData.Sheets.Profile)

  console.log('📄 Got sheet and converted to json')

  console.log(
    '---------------------------------------------------------------------------------'
  )

  const profile = {}

  loadedData.forEach((item) => {
    profile.firstName = item.firstName
    profile.middleName = item.middleName
    profile.lastName = item.lastName
    profile.email = item.email
    profile.mobile = item.mobile
    profile.dateOfBirth = item.dateOfBirth
    profile.role = item.role

    console.log(item)

    console.log('📩 Imported Profile')
  })

  profileData = profile

  console.log(
    '---------------------------------------------------------------------------------'
  )
}

const exportChecklistData = async () => {
  await loadChecklistData('DCSPrototypeData.xlsx')
  exportJson('checklist', '../data/checklist.json', checklistData)
}

exportChecklistData()

const exportListData = async () => {
  await loadListData('DCSPrototypeData.xlsx')
  exportJson('list', '../data/lists.json', listData)
}

exportListData()

const exportProfileData = async () => {
  await loadProfileData('DCSPrototypeData.xlsx')
  exportJson('profile', '../data/profile.json', profileData)
}

exportProfileData()
