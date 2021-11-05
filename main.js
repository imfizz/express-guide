const express = require('express')
const app = express()
const path = require('path')

app.use(express.urlencoded({extended: false})) // this will enable req.body.somethingYouWannaCall

app.use(getWeather) // ito na sya ngayon, same lang yun, nakafocus lang to sa main directory

app.use(express.static(path.join(__dirname, 'public')))

// para di na tayo magcreate ng HTML tags inside routes gagamit tayo ng EJS
app.set('view engine', 'ejs') 
app.set('views', path.join(__dirname, 'views')) // need to require the built in package named PATH


// next ibig sabihin tapos na tong function na to lipat kana sa pangalawang function
// which is (req, res) na function
function getWeather(req, res, next){
    req.visitorWeather = false

    if(req.visitorWeather){
        res.send('Please come back to our app when it is not raining.')
    } else {
        next()
    }
}

// or imbis na tawagin mo rito sa pagitan yung getWeather na function ihiwalay natin ng tawag
// app.get('/', getWeather, (req, res) => {
app.get('/', (req, res) => {
    // run a template inside views folder named home.ejs, we want to pass an object
    res.render('home', {
        isRaining: req.visitorWeather,
        pets: [
            { name: 'Meowsalot', species: 'cat' }, 
            { name: 'Barksalot', species: 'dog' }
        ]
    }) 
})


app.get('/about', (req, res) => {
    res.send('Thanks for learning more about us.')
})


// post kasi post yung nasa form
app.post('/result', (req, res) => {
    if(req.body.color.trim().toUpperCase() == 'BLUE'){
        res.send('Congrats, that is correct!')
    } else {
        res.send('Incorrect, please try again.')
    }
})

// pag inaccess yung link manually
app.get('/result', (req, res) => {
    res.send('Why are you visiting this URL?')
})

// output json text
app.get('/api/pets', (req, res) => {
    res.json([
        { name: 'Meowsalot', species: 'cat' }, 
        { name: 'Barksalot', species: 'dog' }
    ])
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})