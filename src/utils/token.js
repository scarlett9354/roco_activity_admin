export default function() {
  const TOKEN_KEY = process.env.TOKEN_KEY
  const token = window.localStorage.getItem(TOKEN_KEY)
  return token || ''
}
