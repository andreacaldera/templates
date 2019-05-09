require('asset-require-hook')({
  extensions: ['png']
})

const { configure } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

configure({ adapter: new Adapter() })
