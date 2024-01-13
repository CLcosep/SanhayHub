export const useUserObj = () => useState('userObj', () => {
    //const useUserObj()
    return {
        isLogin: false,
        username: ''
    }
})