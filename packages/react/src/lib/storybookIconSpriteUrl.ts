import isChromatic from 'chromatic/isChromatic'

const storybookPublicIconUrl = '/basic-icons.svg'
const devWorkspaceIconUrl: string = require('@teamsui/basic-icons/basic-icons.svg')

export default isChromatic() ? storybookPublicIconUrl : devWorkspaceIconUrl
