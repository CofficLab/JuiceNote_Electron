import { app } from 'electron'
import path from 'path'

export const ROOT_PATH = {
    dist: path.join(__dirname, '../..'),
    public: path.join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}
