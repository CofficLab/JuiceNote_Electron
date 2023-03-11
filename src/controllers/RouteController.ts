import { reactive } from 'vue'

const RouteController = reactive({
    isProd: location.protocol === 'file:',

    checkHomePage() {
        this.isHomePage = (new URL(location.href)).searchParams.get('id') == '/'
    },
})

export default RouteController