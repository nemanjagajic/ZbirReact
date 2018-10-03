export default (users, { textUser }) => {
    return users.filter((user) => user.name.toLowerCase().includes(textUser.toLowerCase())
                    || user.lastName.toLowerCase().includes(textUser.toLowerCase())
                    || user.username.toLowerCase().includes(textUser.toLowerCase()))
}