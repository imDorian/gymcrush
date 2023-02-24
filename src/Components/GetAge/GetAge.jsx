export const GetAge = (e) => {
        let birthdate = new Date(e.birthdate)
        let nowDate = new Date()

        let diffInMilliseconds = nowDate - birthdate
        let age = (diffInMilliseconds / (1000 * 60 * 60 * 24 * 365)).toFixed(0)
        
        return age
}