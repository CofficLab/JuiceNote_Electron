import { defineStore } from 'pinia'
import storeLogger from '../log/storeLogger'

export const useOtherStore = defineStore('other', {
    state: () => {
        return { latestVersion: '' }
    },

    actions: {
        setLatestVersion(version: string) {
            storeLogger.info('更新版本', version)
            this.latestVersion = version
        },
    },
})