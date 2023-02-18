class Log {
    static info(role: string, message: string): void {
        console.log(role.padEnd(30, ' '), '->' + message)
    }
}

export default Log