const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'register-image': "url('https://img.freepik.com/free-vector/online-groceries-concept-illustration_114360-2272.jpg?t=st=1651152552~exp=1651153152~hmac=5d0a91e2b92dfaebf3d9d27dbfa23114c440f5b40742578055f9a249de0e4d9f&w=740')",
        
      })
    },
    screens: {
      xs: '475px',
      ...defaultTheme.screens
    }
  },
  plugins: []
}
