import organizationDevelopment from './organizationDevelopment'
import tokenServices from './tokenServices'
import productDesign from './productDesign'

const services = {
  ...organizationDevelopment,
  ...tokenServices,
  ...productDesign
}

export default services

/*
  services: {
    CircleName: [
      name: string,
      benefit: string,
      outputs: array,
      methods: array,
      availability: bool,
      members: array,
      hours: number,
      links: array
    ]
  }
*/
