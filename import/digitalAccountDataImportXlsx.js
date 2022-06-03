/* eslint-disable no-console */
const jsonfile = require('jsonfile')
const XLSX = require('xlsx')

let serviceData = []
let categoryData = []
let providerData = []
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

const loadServiceData = (sheet) => {
  console.log('✅ Ready to import data')
  console.log(
    '---------------------------------------------------------------------------------'
  )

  const xlsxData = XLSX.readFile(sheet)

  const loadedData = XLSX.utils.sheet_to_json(xlsxData.Sheets.ServiceList)

  console.log('📄 Got sheet and converted to json')

  console.log(
    '---------------------------------------------------------------------------------'
  )

  const tempData = []

  loadedData.forEach((item) => {
    const service = {
      id: item.id,
      name: item.service,
      icon: item.serviceIcon,
      category: item.serviceCategory,
      categoryId: item.serviceCategoryId,
      description: item.serviceDescription,
      daysUntilDue: item.serviceDaysDue,
      actionDue: item.serviceActionDue,
      isPopular: item.servicePopular === true,
      isRelated: item.actionRelated === true,
      actions: [],
      serviceProvider: item.serviceProvider,
      serviceProviderId: item.serviceProviderId,
      identityStrength: item.serviceIdentityStrength,
      identityStrengthLevel: item.serviceIdentityStrengthLevel,
      messages: [],
    }

    if (item.serviceMessages) {
      service.messages = item.serviceMessages
        .replace(/(\r\n\t|\n|\r\t|\r)/gm, '')
        .split('|')
        .filter((item) => item !== '')
    }

    const action = {
      id: item.actionId,
      type: item.actionType,
      name: item.action,
      description: item.actionDescription,
      time: item.actionTime,
      requirements: [],
      whatToExpect: item.actionWhatToExpect,
      isRelated: item.actionRelated === true,
      relatedMessage: item.actionRelatedMessage,
    }

    if (item.actionRequirements) {
      action.requirements = item.actionRequirements
        .replace(/(\r\n\t|\n|\r\t|\r)/gm, '')
        .split('|')
        .filter((item) => item !== '')
    }

    if (item.serviceCategory !== 'none') {
      // Check if service exists, if not add it
      let serviceIndex = tempData.findIndex(({ id }) => id === service.id)

      if (serviceIndex < 0) {
        tempData.push(service)

        console.log('📩 Imported Service')

        // reset index now page exists
        serviceIndex = tempData.findIndex(({ id }) => id === service.id)
      }

      if (action.isRelated || tempData[serviceIndex].isRelated) {
        tempData[serviceIndex].isRelated = true
      }

      // push action to service
      if (action.name) {
        tempData[serviceIndex].actions.push(action)
      }

      console.log('📩 Imported Action')
    }
  })

  serviceData = tempData

  console.log(
    '---------------------------------------------------------------------------------'
  )
}

const loadCategoryData = (sheet) => {
  console.log('✅ Ready to import data')
  console.log(
    '---------------------------------------------------------------------------------'
  )

  const xlsxData = XLSX.readFile(sheet)

  const loadedData = XLSX.utils.sheet_to_json(xlsxData.Sheets.Categories)

  console.log('📄 Got sheet and converted to json')

  console.log(
    '---------------------------------------------------------------------------------'
  )

  const tempData = []

  loadedData.forEach((item) => {
    const category = {
      id: item.categoryId,
      name: item.category,
    }
    if (item.category !== 'none') {
      // push question to page
      tempData.push(category)

      console.log('📩 Imported Category')
    }
  })

  categoryData = tempData

  console.log(
    '---------------------------------------------------------------------------------'
  )
}

const loadProviderData = (sheet) => {
  console.log('✅ Ready to import data')
  console.log(
    '---------------------------------------------------------------------------------'
  )

  const xlsxData = XLSX.readFile(sheet)

  const loadedData = XLSX.utils.sheet_to_json(xlsxData.Sheets.ServiceProviders)

  console.log('📄 Got sheet and converted to json')

  console.log(
    '---------------------------------------------------------------------------------'
  )

  const tempData = []

  loadedData.forEach((item) => {
    const provider = {
      id: item.serviceProviderId,
      name: item.serviceProvider,
      dataUsage: item.dataUsage,
    }
    // push question to page
    tempData.push(provider)

    console.log('📩 Imported Provider')
  })

  providerData = tempData

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
    profile.identityStrength = item.identityStrength
    profile.identityStrengthLevel = item.identityStrengthLevel
    profile.residentialUnit = item.residentialUnit.toString(10)
    profile.residentialNumber = item.residentialNumber.toString(10)
    profile.residentialStreetName = item.residentialStreetName
    profile.residentialStreetType = item.residentialStreetType
    profile.residentialSuburb = item.residentialSuburb
    profile.residentialState = item.residentialState
    profile.residentialPostcode = item.residentialPostcode.toString(10)
    profile.residentialCountry = item.residentialCountry
    profile.postalUnit = item.postalUnit.toString(10)
    profile.postalNumber = item.postalNumber.toString(10)
    profile.postalStreetName = item.postalStreetName
    profile.postalStreetType = item.postalStreetType
    profile.postalSuburb = item.postalSuburb
    profile.postalState = item.postalState
    profile.postalPostcode = item.postalPostcode.toString(10)
    profile.postalCountry = item.postalCountry

    console.log(item)

    console.log('📩 Imported Profile')
  })

  profileData = profile

  console.log(
    '---------------------------------------------------------------------------------'
  )
}

const exportServiceData = async () => {
  await loadServiceData('digitalAccountData.xlsx')
  exportJson('service', '../data/services.json', serviceData)
}

exportServiceData()

const exportCategoryData = async () => {
  await loadCategoryData('digitalAccountData.xlsx')
  exportJson('category', '../data/categories.json', categoryData)
}

exportCategoryData()

const exportProviderData = async () => {
  await loadProviderData('digitalAccountData.xlsx')
  exportJson('provider', '../data/providers.json', providerData)
}

exportProviderData()

const exportProfileData = async () => {
  await loadProfileData('digitalAccountData.xlsx')
  exportJson('profile', '../data/profile.json', profileData)
}

exportProfileData()
